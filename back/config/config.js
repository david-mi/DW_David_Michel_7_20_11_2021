module.exports = {
  development: {
    username: "root",
    password: "adminMAMP",
    database: "groupomania_development",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+01:00"
  },
  test: {
    username: "root",
    password: "adminMAMP",
    database: "groupomania_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: "adminMAMP",
    database: "groupomania_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}