const Sequelize = require('sequelize')

const connection = new Sequelize('bancoanimes', 'root', 'admin',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection