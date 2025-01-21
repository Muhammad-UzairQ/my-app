module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    "Video",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUrl: true, // Validates that the value is a proper URL
        },
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["facebook", "instagram"]], // Sequelize validation to enforce specific values
        },
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Referencing the 'Users' table
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "videos",
      timestamps: true, // If you want createdAt and updatedAt fields
    }
  );

  Video.associate = (models) => {
    Video.belongsTo(models.User, {
      foreignKey: "adminId",
      as: "admin",
      onDelete: "CASCADE", // If a user is deleted, their profile is also deleted
    });
  };
  // You can add any associations here if needed.
  return Video;
};
