const db = require("../models");
const User = db.users;
const Comment = db.comments;

const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate Request
  // if(!req.body.userName){
  //   res.status(400).send({
  //     message:"userName Cannot be empty!"
  //   });
  //   return;
  //   }
    const user = {
      userName:req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      highestEducation: req.body.highestEducation,
      country: req.body.country,
      selfDescription:req.body.selfDescription
      
    };

    User.create(user)
    .then(data =>{
       res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occured while creating the user."
      });
    });
  
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  let condition = {};

  if (req.query.firstName) {
    condition.firstName = { [Op.like]: `%${firstName}%` };
  }
  if (req.query.userName) {
    condition.userName = { [Op.like]: `%${userName}%` };
  }
  if (req.query.lastName) {
    condition.lastName = { [Op.like]: `%${lastName}%` };
  }

  if (req.query.email) {
    condition.email = { [Op.like]: `%${email}%` };
  }

  User.findAll({where : condition})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occured while retrieving users."
    });
  });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving credentials."
      });
    });
};

exports.createUser = (user) => {
        return User.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          highestEducation: user.highestEducation,
          userName:user.userName,
          country: user.country,
          dateOfBirth: user.dateOfBirth,
          selfDescription:user.selfDescription
        })
          .then((user) => {
            // console.log(">> Created user: " + JSON.stringify(user, null, 4));
            return user;
          })
          .catch((err) => {
            console.log(">> Error while creating user: ", err);
          });
      };
//For Self Description Component 
      exports.createComment = (userId, comment) => {
        return Comment.create({
          name: comment.name,
          text: comment.text,
          selfDescription:comment.selfDescription,
          userId: userId,
        })
          .then((comment) => {
            console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
            return comment;
          })
          .catch((err) => {
            console.log(">> Error while creating comment: ", err);
          });
      };

      exports.findUserById = (userId) => {
        return User.findByPk(userId, { include: ["comments"] })
          .then((user) => {
            return user;
          })
          .catch((err) => {
            console.log(">> Error while finding user: ", err);
          });
      };

      exports.findCommentById = (id) => {
        return Comment.findByPk(id, { include: ["user"] })
          .then((comment) => {
            return comment;
          })
          .catch((err) => {
            console.log(">> Error while finding comment: ", err);
          });
      };

      exports.findAll = () => {
        return User.findAll({
          include: ["comments"],
        }).then((users) => {
          return users;
        });
      };