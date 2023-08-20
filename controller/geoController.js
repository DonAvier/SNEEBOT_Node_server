//RELATIONAL DB
const Country = require("../models/Country");

const GetCountry = (req, res) => {
    Country.findAll()
        .then((results) => {
            res.status(200).json(results); // Ritorna i risultati come JSON
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Errore nel recupero dei dati." }); // Gestisci l'errore
        });
};

const GetCountryById = (req, res) => {
    Country.findByPk(req.params.ID)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const PostCountry = (req, res) => {
    Country.create({
        NomeNazione: req.body.NomeNazione,
        SiglaNazione: req.body.SiglaNazione,
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

const EditCountry = (req, res) => {
    Country.update(
        {
            NomeNazione: req.body.NomeNazione,
            SiglaNazione: req.body.SiglaNazione,
        },
        {
            where: {
                ID: req.body.ID,
            },
        }
    )
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

const DeleteCountry = (req, res) => {
    Country.destroy({
        where: {
            ID: req.params.ID,
        },
    })
        .then((result) => {
            console.log(result);
            res.status(204).json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: "Errore nel aggiunta dei dati.",
            });
        });
};

module.exports = {
    GetCountry,
    PostCountry,
    EditCountry,
    DeleteCountry,
    GetCountryById,
};
