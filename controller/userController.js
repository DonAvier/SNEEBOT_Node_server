//NO RELATIONAL DB
const { DBJsonConnect, DBJsonUpdate } = require("../Helper/JsonHelper");
const Rotte = require("../rotte");

//RELATIONAL DB
const People = require("../models/People");

const getUsersList = (req, res) => {
    People.findAll()
        .then((result) => {
            console.info(result);
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json(error); // Gestisci l'errore
        });
};

const getUserById = (req, res) => {
    People.findByPk(req.params.ID)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const updateUser = (req, res) => {
    People.findByPk(req.body.ID)
        .then((result) => {
            result.Nome = req.body.Nome;
            result.Cognome = req.body.Cognome;
            result.Telefono = req.body.Telefono;
            result.Cellulare = req.body.Cellulare;
            result.Email1 = req.body.Email1;
            result.Email2 = req.body.Email2;
            result.IsMaschio = req.body.IsMaschio;
            result.DataNascita = req.body.DataNascita;
            result.LuogoNascita = parseInt(req.body.LuogoNascita);
            result.NumeroDocumento = req.body.NumeroDocumento;
            result.CodiceFiscale = req.body.CodiceFiscale;
            result.Indirizzo = parseInt(req.body.Indirizzo);
            result.StatoCivile = req.body.StatoCivile;
            result.Nazionalita = parseInt(req.body.Nazionalita);
            result.Professione = req.body.Professione;
            result.Religione = req.body.Religione;
            result.GruppoSangiugno = req.body.GruppoSangiugno;

            return result.save();
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const postAddUser = (req, res) => {
    const botid = req.botid;
    //req.body
    const newObject = {
        Nome: req.body.Nome,
        Cognome: req.body.Cognome,
        Telefono: req.body.Telefono,
        Cellulare: req.body.Cellulare,
        Email1: req.body.Email1,
        Email2: req.body.Email2,
        IsMaschio: req.body.IsMaschio,
        DataNascita: req.body.DataNascita,
        LuogoNascita: parseInt(req.body.LuogoNascita),
        NumeroDocumento: req.body.NumeroDocumento,
        CodiceFiscale: req.body.CodiceFiscale,
        Indirizzo: parseInt(req.body.Indirizzo),
        StatoCivile: req.body.StatoCivile,
        Nazionalita: parseInt(req.body.Nazionalita),
        Professione: req.body.Professione,
        Religione: req.body.Religione,
        GruppoSangiugno: req.body.GruppoSangiugno,
    };

    People.create(newObject)
        .then((result) => {
            console.info(result);
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json(error); // Gestisci l'errore
        });
};

const deleteUser = (req, res) => {
    console.log(parseInt(req.params.ID));
    People.findByPk(parseInt(req.params.ID))
        .then((result) => {
            result.destroy();
        })
        .then((destoyed) => {
            console.log(destoyed);
            res.status(204).json(destoyed);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: "Errore nella rimozione dei dati.",
            });
        });
};

module.exports = {
    getUsersList,
    postAddUser,
    updateUser,
    getUserById,
    deleteUser,
};
