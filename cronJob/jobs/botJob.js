const { GetFormattedDate } = require("../../helper/dateHelper");
const { GetLaunchedBot } = require("../../bots/botsManager/manager");
const { runQuery } = require("../../bots/baseBot");

const searchScheduledBot = () => {
    const d = GetFormattedDate();
    const Bots = GetLaunchedBot();
    if (d != undefined) {
        if (Bots != undefined) {
            console.log("Cerco bot schedulato");
            const bot = Bots.find((b) => b.ExitDate == d);
            if (bot != undefined) {
                console.log("bot trovato, in lancio.... \n" + bot);
                runQuery(bot);
            } else {
                console.log("nessun bot schedulato per la data attuale");
            }
        } else {
            console.log("Nessun bot schedulato");
        }
    } else {
        console.log("Errore sulla generazione della data");
    }
};

module.exports = { searchScheduledBot };
