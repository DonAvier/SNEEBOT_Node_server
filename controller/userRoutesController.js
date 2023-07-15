const fs = require("fs");
const { DBJsonConnect, DBJsonUpdate } = require("../Helper/JsonHelper");
const Rotte = require("../rotte");

const getUserConfig = (req, res) => {
    const botid = req.botid;

    DBJsonConnect(Rotte.JSONConfigFile(botid), (result) => {
        if (result) {
            return res.end(JSON.stringify(result.data, "", 2));
        } else {
            return res.end(null);
        }
    });
};

const postUserConfig = (req, res) => {
    const botid = req.botid;
    DBJsonConnect(Rotte.JSONCmdPath(botid), (result) => {
        if (result) {
            const CmdList = result.data;
            const cmd = CmdList.filter(
                (c) => c.id == req.body.SelectorAssociatoID
            );

            if (cmd.length > 0) {
                const value = cmd[0].Selector;

                DBJsonUpdate(
                    Rotte.JSONConfigFile(botid),
                    {
                        id: 0, //Settato in automatico al id più recente
                        NomeCampoUtente: req.body.NomeCampoUtente,
                        SelectorId: req.body.SelectorAssociatoID,
                        SelectorAssociato: value,
                    },
                    true,
                    (updateResult) => {
                        if (updateResult) {
                            return res.end(JSON.stringify(updateResult));
                        } else {
                            const error = {
                                message:
                                    "Errore durante l'aggiornamento della configurazione utente",
                            };
                            res.writeHead(500, {
                                "Content-Type": "application/json",
                            });
                            return res.end(JSON.stringify(error));
                        }
                    }
                );
            } else {
                const error = { message: "Comando non trovato" };
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify(error));
            }
        } else {
            const error = { message: "Errore durante il recupero dei comandi" };
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(error));
        }
    });
};

module.exports = { getUserConfig, postUserConfig };
