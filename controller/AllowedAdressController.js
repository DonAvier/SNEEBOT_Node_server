const AllowedAdress = require("../models/AllowedAdress");

const GetAllowedAdress = (req, res) => {
    AllowedAdress.findAll()
        .then((results) => {
            res.status(200).json(results); // Ritorna i risultati come JSON
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Errore nel recupero dei dati." }); // Gestisci l'errore
        });
};

const GetAllowedAdresByID = (req, res) => {
    AllowedAdress.findByPk(parseInt(req.params.ID))
        .then((results) => {
            res.status(200).json(results); // Ritorna i risultati come JSON
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Errore nel recupero dei dati." }); // Gestisci l'errore
        });
};

const AddAllowedAdress = (req, res) => {
    const newObj = {
        Address1: req.body.Address1,
        ZipCode: req.body.ZipCode,
        CountryID: req.body.CountryID,
        City: req.body.City,
        Province: req.body.Province,
        Address2: req.body.Address2,
    };

    AllowedAdress.create(newObj)
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

const EditAllowedAdress = (req, res) => {
    AllowedAdress.findByPk(req.body.ID)
        .then((result) => {
            result.Address1 = req.body.Address1;
            result.ZipCode = req.body.ZipCode;
            result.CountryID = req.body.CountryID;
            result.City = req.body.City;
            result.Province = req.body.Province;
            result.Address2 = req.body.Address2;

            return result.save();
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

const DeleteAllowedAdress = (req, res) => {
    AllowedAdress.findByPk(req.params.ID)
        .then((address) => {
            address.destroy();
        })
        .then((result) => {
            console.log(result);
            res.status(204).json(result);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                error: "Errore nella rimozione dei dati.",
            });
        });
};

module.exports = {
    GetAllowedAdress,
    AddAllowedAdress,
    EditAllowedAdress,
    DeleteAllowedAdress,
    GetAllowedAdresByID,
};
