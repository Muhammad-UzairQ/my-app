module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users", // Ensure it uses lowercase 'users' (PostgreSQL is case-sensitive)
      timestamps: true, // If you want createdAt and updatedAt fields
    }
  );
  // You can add any associations here if needed.
  return User;
};
