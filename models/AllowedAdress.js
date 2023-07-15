const {Sequelize} = require("sequelize");
const BotDatabase = require("../utility/database");
const AllowedAdress = BotDatabase.define("AllowedAdress", {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Address1: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ZipCode: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    CountryID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    City: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Province: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Address2: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

module.exports = AllowedAdress;




