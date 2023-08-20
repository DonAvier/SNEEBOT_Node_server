const botManager = require("../bots/botsManager/manager");

const Bot = require("../models/Bot");

const getAllBots = (req, res) => {
    Bot.findAll()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const getBot = (req, res) => {
    Bot.findByPk(parseInt(req.params.ID))
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const createBot = (req, res) => {
    Bot.create({
        Nome: req.body.Nome,
        Descrizione: req.body.Descrizione,
        Url: req.body.Url,
        TypeOfBot: parseInt(req.body.TypeOfBot),
        Date: req.body.Date,
        isConfigured: 0,
    })
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: "Errore nel aggiunta dei dati.",
            });
        });
};

const updateBot = (req, res) => {
    Bot.findByPk(parseInt(req.body.ID))
        .then((result) => {
            result.Nome = req.body.Nome;
            result.Descrizione = req.body.Descrizione;
            result.Url = req.body.Url;
            result.TypeOfBot = parseInt(req.body.TypeOfBot);
            result.Date = req.body.Date;
            result.isConfigured = 0;

            return result.save();
        })
        .then((editResult) => {
            res.status(200).json(editResult);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const deleteBot = (req, res) => {
    Bot.findByPk(parseInt(req.params.ID))
        .then((result) => {
            return result.destroy();
        })
        .then((deleteResult) => {
            res.status(200).json(deleteResult);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

//================ BOT LAUNCHER ====================
// const launchBot = (req, res) => {
//     console.log("Lancio il bot");
//     botManager.LaunchPWBot();
//     //TODO EVENTI IN TEMPO REALE
//     //PAZZESCO
//     res.redirect("/");
// };

//TODO
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
    createBot,
    updateBot,
    deleteBot,
};
