const express = require("express");
const router = express.Router();
const botController = require("../controller/BotsController");

//POST
//lancia il bot
router.post("/:id/launch", botController.launchBot);

//crea il bot
router.post("/", botController.postCreateBot);

//GET

//Restituisce il dettaglio dei bot
router.get("/list/:id", botController.getBot);

//Restituisce tutti i bot
router.get("/list", botController.getAllBots);

//EXPORT
module.exports = router;