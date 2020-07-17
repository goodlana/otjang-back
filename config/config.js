module.exports={
  development: {
    username: "root",
    password: process.env.CLOTH_DEV,
    database: null,
    host: 'localhost',
    port: null,
    dialect: "mysql"
  },
  deployment: {
    username: "root",
    password: process.env.CLOTH_DEP,
    database: null,
    host: null,
    port: null,
    dialect: "mysql"
  },

}
