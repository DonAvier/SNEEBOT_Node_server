const express = require("express");
const router = express.Router();
const userRoutesController = require("../controller/userRoutesController");

//GET
//Visualizza la configurazione degli utenti
router.get("/", userRoutesController.getUserConfig);

//POST
//Azione di aggiunta al DB Json di una proprietà del utente relativo al bot
router.post("/", userRoutesController.postUserConfig);
module.exports = router;
