//NO RELATIONAL DB

//RELATIONAL DB
const People = require("../models/People");
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

const PostCountry = (req, res) => {
    Country.max("id")
        .then((id) => {
            Country.create({
                ID: id + 1,
                NomeNazione: req.body.NomeNazione,
                SiglaNazione: req.body.SiglaNazione,
                createdAt: new Date(),
                updatedAt: new Date(),
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
            updatedAt: new Date(),
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
            res.status(200).json(result);
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
};
