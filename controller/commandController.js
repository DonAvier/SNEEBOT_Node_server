const { DBJsonConnect, DBJsonUpdate } = require("../Helper/JsonHelper");
const Rotte = require("../rotte");

//MONGODB
const Command = require("../models/MongoModel/Command");

const getFlowchart = (req, res) => {
    const botid = req.botid;

    Command.FetchAll(botid)
        .then((commands) => {
            const data = commands;
            if (data) {
                data.sort((a, b) => {
                    return b.Action.executionOrder - a.Action.executionOrder;
                });
                return res.end(JSON.stringify(data));
            }
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

const postCreateFlowCommand = (req, res) => {
    const bot_command = req.body;
    const botid = req.botid;

    for (var i = 0; i < bot_command.length; i++) {
        const b = bot_command[i];
        const cmd = new Command(
            botid,
            b.locatorType,
            b.role,
            b.query,
            b.nth,
            b.xcoord,
            b.ycoord,
            b.options,
            b.action,
            b.consecutiveCommand
        );

        cmd.save();
    }
};

module.exports = {
    getFlowchart,
    postCreateFlowCommand,
};
