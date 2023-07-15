const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
//GET
//Visualizza l'elenco degli utenti usando il file di config
router.get("/", userController.getUsersList);

//Azione di aggiunta al DB Json di un utente
router.post("/", userController.postAddUser);
module.exports = router;
