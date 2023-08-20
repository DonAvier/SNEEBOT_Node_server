const { Sequelize } = require("sequelize");

const BotDatabase = new Sequelize("BotDatabase", "sa", "123456sa", {
    host: "localhost",
    dialect: "mssql",
    dialectOptions: {
        instanceName: "IT01PC0073", // Specifica il nome dell'istanza
        options: {
            encrypt: true, // Se si utilizza una connessione crittografata
        },
    },
});

module.exports = BotDatabase;
