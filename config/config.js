module.exports = {
  development: {
    username: 'root',
    password: process.env.CLOTH_DEV,
    database: 'cloth',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: { // production으로 고쳐야하나..?
    username: 'root',
    password: process.env.CLOTH_DEP,
    database: null,
    host: null,
    port: null,
    dialect: 'mysql'
  }
}
