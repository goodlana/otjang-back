require('dotenv').config(); //환경변수 불러옴.

module.exports = {
  development: {
    username: 'root',
    password: process.env.CLOTH_DEV,
    database: 'cloth',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: { // production으로 고쳐야하나..?
    username: 'admin',
    password: process.env.CLOTH_DEP,
    database: 'cloth',
    host: 'otjang-server.czmmexcnherm.ap-northeast-2.rds.amazonaws.com',
    port: 13306,
    dialect: 'mysql'
  }
}