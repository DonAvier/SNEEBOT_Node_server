//BOTS
const { runQuery } = require("../baseBot");
const PWBot = require("../playwrightBotDynamic");

let LaunchedScheduledBot;

const LaunchBot = async (bot) => {
    console.log("BOT IN AVVIO");
    if (bot.TypeOfBot == 1) {
        await runQuery(bot);
    } else if (bot.TypeOfBot == 2) {
        console.log("BOT SCHEDULATO");
        if (LaunchedScheduledBot == undefined) {
            LaunchedScheduledBot = [];
        }
        LaunchedScheduledBot.push(bot);
    }
};

const LaunchPWBot = async (bot) => {
    console.log("BOT IN AVVIO");
    await PWBot.playwritghtBot(bot);
    // if (bot.TypeOfBot == 1) {
    //     await PWBot.playwritghtBot();
    // } else if (bot.TypeOfBot == 2) {
    //     console.log("BOT SCHEDULATO");
    //     if (LaunchedScheduledBot == undefined) {
    //         LaunchedScheduledBot = [];
    //     }
    //     LaunchedScheduledBot.push(bot);
    // }
};

const GetLaunchedBot = () => {
    if (LaunchedScheduledBot != undefined) return LaunchedScheduledBot.slice(0);
    else return undefined;
};

module.exports = { LaunchBot, GetLaunchedBot, LaunchPWBot };
