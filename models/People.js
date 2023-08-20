const { Sequelize } = require("sequelize");

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
        allowNull: true,
    },
    Email1: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Email2: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    IsMaschio: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    DataNascita: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    //ADDRESS TABLE
    LuogoNascita: {
        type: Sequelize.INTEGER,
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
    //ADDRESS TABLE
    Indirizzo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    StatoCivile: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    //COUNTRY TABLE
    Nazionalita: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Professione: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Religione: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    GruppoSangiugno: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

module.exports = People;
