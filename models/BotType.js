const { Sequelize } = require("sequelize");

const BotDatabase = require("../utility/database");

const BotType = BotDatabase.define("BotType", {
    TypeID: {
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
});

module.exports = BotType;
