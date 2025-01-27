const parseCSVFile = async ({
  filePath,
  adminId,
  headersConfig,
  validateRow,
}) => {
  const results = [];
  const errors = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("headers", (headers) => {
        // Validate that the CSV contains the required headers
        const missingHeaders = Object.keys(headersConfig).filter(
          (key) => headersConfig[key].required && !headers.includes(key)
        );

        if (missingHeaders.length > 0) {
          reject(
            new Error(`Missing required headers: ${missingHeaders.join(", ")}`)
          );
        }
      })
      .on("data", (row) => {
        const validationErrors = [];

        // Validate each header based on the configuration
        const parsedRow = {};
        for (const [key, config] of Object.entries(headersConfig)) {
          const value = row[key];

          if (config.required && !value) {
            validationErrors.push(`${key} is required`);
          }

          if (config.validate && !config.validate(value)) {
            validationErrors.push(`${key} is invalid`);
          }

          parsedRow[key] = value || config.default || null;
        }

        // Apply custom row-level validation logic if provided
        if (validateRow) {
          const customValidationErrors = validateRow(parsedRow);
          if (customValidationErrors) {
            validationErrors.push(...customValidationErrors);
          }
        }

        // Add the row to results or errors based on validation
        if (validationErrors.length > 0) {
          errors.push({ row, errors: validationErrors });
        } else {
          results.push({ ...parsedRow, adminId });
        }
      })
      .on("end", resolve)
      .on("error", reject);
  });

  // Delete the file after processing
  fs.unlinkSync(filePath);

  return { results, errors };
};
