module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Referencing the 'Users' table
          key: "id",
        },
      },
    },
    {
      tableName: "profile",
      timestamps: true, // If you want createdAt and updatedAt fields
    }
  );

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE", // If a user is deleted, their profile is also deleted
    });
  };
  // You can add any associations here if needed.
  return Profile;
};
