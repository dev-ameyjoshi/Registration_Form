module.exports = (sequelize, DataTypes) => {
        const Comment = sequelize.define("comment", {
          // name: {
          //   type: DataTypes.STRING
          // },
          userName:{
            type:DataTypes.STRING
           },
          selfDescription: {
            type: DataTypes.TEXT
          }
        });
      
        Comment.associate = (models) =>{
          Comment.belongsTo(models.User,{
            foreignKey:"userId",
            as:"user"
          });
        };
        return Comment;
      };