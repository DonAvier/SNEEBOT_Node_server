const express = require("express");
const router = express.Router();
const GeoController = require("../controller/geoController");
const { route } = require("./UtilRoutes");

//Get all country
router.get("/country", GeoController.GetCountry);

//Post
router.post("/country", GeoController.PostCountry);

//PUT
//Azione di modifica di un indirizzo autorizzato
router.put("/edit/country", GeoController.EditCountry);

//DELETE
router.delete("/country/:ID", GeoController.DeleteCountry);

module.exports = router;
