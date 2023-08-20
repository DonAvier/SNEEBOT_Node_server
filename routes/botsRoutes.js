const express = require("express");
const router = express.Router();
const botController = require("../controller/BotsController");

//POST
//lancia il bot
router.post("/:ID/launch", botController.launchBot);

//crea il bot
router.post("/", botController.createBot);

//PUT
router.put("/", botController.updateBot);

//DELETE
router.delete("/:ID", botController.deleteBot);

//GET

//Restituisce il dettaglio dei bot
router.get("/list/:ID", botController.getBot);

//Restituisce tutti i bot
router.get("/list", botController.getAllBots);

//EXPORT
module.exports = router;
