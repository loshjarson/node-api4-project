const dotenv = require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 9000
const path = require("path")
const mw = require("./api/middleware/middleware")
const Users = require("./api/users/users-model")

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,"client/build")))




app.get('/api/users', (req, res) => {
  Users.find()
    .then(users =>{
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving users',
      });
    })
});

app.post('/api/register',mw.validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error creating user',
      });
    })

});

app.post('/api/login', mw.validate, (req, res) => {
  Users.findByName(req.body.name)
    .then(user => {
      res.status(201).json({message: `Welcome ${user.name}`})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error logging in',
      });
    })
})

app.use("/api/*", (_,res)=> {
    res.json({data: "This is the API data"})
})

app.use("*",(_,res)=>{
    res.sendFile(path.join(__dirname,"client/build","index.html"))
})

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})

console.log(__dirname)
console.log(__filename)
console.log(process.env.USERNAME)
console.log(process.env.PORT)
console.log(process.env.DB_PASS)