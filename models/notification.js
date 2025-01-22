module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          isIn: [["pending", "approved", "rejected"]], // Sequelize validation to enforce specific values
        },
      },
    },
    {
      tableName: "notifications",
      timestamps: true, // If you want createdAt and updatedAt fields
    }
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: "adminId",
      as: "admin",
      onDelete: "CASCADE", // If an admin is deleted, their follow records are also deleted
    });
    Notification.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE", // If a user is deleted, their follow records are also deleted
    });
  };
  // You can add any associations here if needed.
  return Notification;
};
