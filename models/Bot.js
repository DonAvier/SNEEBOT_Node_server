const { Sequelize } = require("sequelize");

const BotDatabase = require("../utility/database");

const Bot = BotDatabase.define("Bot", {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Descrizione: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    Url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    TypeOfBot: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    isConfigured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Bot;
