const sequelize = require('sequelize')
const connection = require('./database.js')

const animes = connection.define('animes',{
    id:{
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: sequelize.TEXT,
        allowNull: false
        //primaryKey: true;
        //autoIncrement: true
    },
    cpf:{
        type: sequelize.TEXT,
        allowNull: false
    }
    ,
    senha:{
        type: sequelize.STRING,
        allowNull: false
    },
    email:{
        type: sequelize.STRING,
        allowNull: false
    }
})

animes.sync({force: false}).then(()=>{
    console.log("Tabela de animes criadas.")
})

module.exports = animes