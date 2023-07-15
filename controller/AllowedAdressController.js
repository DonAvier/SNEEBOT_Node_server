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

const AddAllowedAdress = (req, res) => {
    // AllowedAdress.max("id")
    //     .then((id) => {

    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    const newObj = {
        //ID: id + 1,
        Address1: req.body.Address1,
        ZipCode: req.body.ZipCode,
        CountryID: req.body.CountryID,
        City: req.body.City,
        Province: req.body.Province,
        Address2: req.body.Address2,
        //createdAt: new Date(),
        //updatedAt: new Date(),
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
    AllowedAdress.findByPk(req.body.ID).then(result => {
        result.Address1 = req.body.Address1;
        result.ZipCode = req.body.ZipCode;
        result.CountryID = req.body.CountryID;
        result.City = req.body.City;
        result.Province = req.body.Province;
        result.Address2 = req.body.Address2;
            
        return result.save();     
    }).then(result => {
        console.log(result);
        res.status(200).json(result);
    } )
    .catch(error => {
        console.error(error);
        res.status(500).json({
            error: "Errore nel aggiunta dei dati.",
        });
    })    
};

const DeleteAllowedAdress = (req, res) => {

    AllowedAdress.findByPk(req.params.id)
    .then(address => {
        address.destroy();
    }).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({
            error: "Errore nel aggiunta dei dati.",
        });
    });
};

module.exports = {
    GetAllowedAdress,
    AddAllowedAdress,
    EditAllowedAdress,
    DeleteAllowedAdress,
};
