module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Referencing the 'Users' table
          key: "id",
        },
        onDelete: "CASCADE",
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
      tableName: "follows",
      timestamps: true, // If you want createdAt and updatedAt fields
    }
  );

  Follow.associate = (models) => {
    Follow.belongsTo(models.User, {
      foreignKey: "adminId",
      as: "admin",
      onDelete: "CASCADE", // If an admin is deleted, their follow records are also deleted
    });
    Follow.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE", // If a user is deleted, their follow records are also deleted
    });
  };
  // You can add any associations here if needed.
  return Follow;
};
