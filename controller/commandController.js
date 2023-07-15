const { DBJsonConnect, DBJsonUpdate } = require("../Helper/JsonHelper");
const Rotte = require("../rotte");

const getFlowchart = (req, res) => {
    const botid = req.botid;

    DBJsonConnect(Rotte.JSONCmdPath(botid), (result) => {
        if (result) {
            const data = result.data;
            if (data) {
                data.sort((a, b) => {
                    return b.ExecOrder - a.ExecOrder;
                });

                return res.end(JSON.stringify(data));
            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                const error = { message: "Flusso dati non trovato" };
                return res.end(JSON.stringify(error));
            }
        } else {
            res.writeHead(500, { "Content-Type": "application/json" });
            const error = {
                message: "Errore durante il recupero del flusso dati",
            };
            return res.end(JSON.stringify(error));
        }
    });
};

const postCreateFlowCommand = (req, res) => {
    const bot_command = req.body;
    const botid = req.botid;

    DBJsonUpdate(Rotte.JSONCmdPath(botid), bot_command, true, (result) => {
        if (result) {
            console.log(result);
            return res.end(JSON.stringify(result));
        } else {
            const error = {
                message: "Errore durante il salvataggio dei comandi del bot",
            };
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(error));
        }
    });
};

module.exports = {
    getFlowchart,
    postCreateFlowCommand,
};
