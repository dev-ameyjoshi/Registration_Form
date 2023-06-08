module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userName:{
     type:Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    dateOfBirth: {
      type: Sequelize.DATE
    },
    email: {
      type: Sequelize.STRING
    },
    highestEducation: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    

  });

  User.associate = (models) =>{
    User.hasMany(models.comment,{
      foreginKey:"userId",
      as:"comments"
    });
  };
  return User;
};
