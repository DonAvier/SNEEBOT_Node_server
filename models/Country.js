const {Sequelize} = require("sequelize");
const botDatabse = require("../utility/database");

const Country = botDatabse.define("Country",{
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NomeNazione: {
        type: Sequelize.STRING,
        allowNull: false
    },
    SiglaNazione: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Country;