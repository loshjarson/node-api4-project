const Users = require('../users/users-model');


function validateUserName(req, res, next) {
  const {name} = req.body;
  Users.findByName(name)
    .then(user => {
      if (!user) {
        res.status(404).json({message: "user not found"})
      } else {
        req.user = user
        next()
      }
    })
}

function validateUser(req, res, next) {
  const newUser = req.body;
  if (!newUser.name || !newUser.password) {
    res.status(400).json({message: "missing name or password"})
  } else {
    next()
  }
 
}

function validate(req, res, next) {
  const {name, password} = req.body
  
  Users.findByName(name)
    .then(user => {
      if (!user) {
        res.status(404).json({message: "username is incorrect"})
      } else {
        Users.findByName(name)
          .then(t => {
            if (t.password !== password) {
              res.status(400).json({ message: "password is incorrect" })
            } else {
              next()
            }
          })
      }
    })

}



module.exports = {
  validateUserName,
  validateUser,
  validate
}