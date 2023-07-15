//NO RELATIONAL DB
const { DBJsonConnect, DBJsonUpdate } = require("../Helper/JsonHelper");
const Rotte = require("../rotte");

//RELATIONAL DB
const People = require("../models/People");
const AllowedAdress = require("../models/AllowedAdress");

const getUsersList = (req, res) => {
    const botid = req.botid;

    DBJsonConnect(Rotte.JSONUsersPath(botid), (result) => {
        if (result) {
            return res.end(JSON.stringify(result.data, "", 2));
        } else {
            res.writeHead(500, { "Content-Type": "application/json" });
            const error = {
                message: "Errore durante il recupero della lista utenti",
            };
            return res.end(JSON.stringify(error));
        }
    });
};

const postAddUser = (req, res) => {
    const botid = req.botid;
    //req.body
    People.create(req.body)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = {
    getUsersList,
    postAddUser,
};
