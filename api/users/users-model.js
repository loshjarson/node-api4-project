const { nanoid } = require('nanoid')

function getId() {
  return nanoid().slice(0, 5)
}

const initializeUsers = () => ([
  { id: getId(), name: "Jesus", password: 'Wh0leL0ttaFi$hAndBread' },
  { id: getId(), name: 'Ghandi', password: 'PeaceL0veAndPr0$perity' },
])


let users = initializeUsers()


const find = () => {
  return Promise.resolve(users)
}

const findByName = name => {
  const user = users.find(user => user.name === name)
  return Promise.resolve(user)
}



const insert = ({ name, password }) => {
  const newUser = { id: getId(), name, password}
  users.push(newUser)
  return Promise.resolve(newUser)
}


const resetDB = () => { 
  users = initializeUsers()
}

module.exports = {
  find,
  findByName,
  insert,
  resetDB, 
}