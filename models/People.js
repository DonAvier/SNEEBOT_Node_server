const {Sequelize} = require("sequelize");

const BotDatabase = require("../utility/database");

const People = BotDatabase.define("People", {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Cognome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Telefono: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Cellulare: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Email1: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Email2: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    IsMaschio: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    DataNascita: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    LuogoNascita: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    NumeroDocumento: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    CodiceFiscale: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Indirizzo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    StatoCivile: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Nazionalita: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Professione: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Religione: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    GruppoSangiugno: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = People;
