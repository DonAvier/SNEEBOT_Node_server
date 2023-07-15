const fs = require("fs");
const botManager = require("../bots/botsManager/manager");
const { DBJsonUpdate } = require("../helper/jsonHelper");
const Rotte = require("../rotte");

const getAllBots = (req, res) => {
    fs.readFile("./Public/Json/BotList.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(data);
    });
};

const getBot = (req, res) => {
    const botid = req.params.id;
    fs.readFile("./Public/Json/BotList.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        if (data) {
            const jsonData = JSON.parse(data);
            const bot = jsonData.find((x) => x.id == botid);
            return res.end(JSON.stringify(bot));
        } else {
            return res.end([]);
        }
    });
};

const postCreateBot = (req, res) => {
    DBJsonUpdate(
        Rotte.BotListPath(),
        {
            id: 0, //Auto compiled
            nome: req.body.nome,
            url: req.body.url,
            TypeOfBot: parseInt(req.body.TypeOfBot),
            ExitDate: req.body.ExitDate,
            BotCreationDate: Date(),
            isConfigured: 0,
            ShoesInfo: {
                Price: req.body.ShoesPrice,
                BrandName: req.body.BrandName,
                AmountGained: 0,
                Name: req.body.ShoesName,
            },
        },
        false,
        (result) => {
            if (result) {
                return res.end(JSON.stringify(result));
            } else {
                const error = {
                    message: "Errore durante la creazione del bot",
                };
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify(error));
            }
        }
    );
};

//================ BOT LAUNCHER ====================
// const launchBot = (req, res) => {
//     console.log("Lancio il bot");
//     botManager.LaunchPWBot();
//     //TODO EVENTI IN TEMPO REALE
//     //PAZZESCO
//     res.redirect("/");
// };

const launchBot = (req, res) => {
    const id = req.params.id;
    const botListPath = "./Public/Json/BotList.json";
    fs.readFile(botListPath, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return res.redirect("/");
        }
        const botList = JSON.parse(data);
        const bot = botList.find((B) => B.id == id);
        if (!bot) {
            return res.redirect("/");
        }
        botManager.LaunchPWBot(bot);
        return res.redirect("/");
    });
};

//================ FINE BOT LAUNCHER ====================

module.exports = {
    getBot,
    getAllBots,
    launchBot,
    postCreateBot,
};
