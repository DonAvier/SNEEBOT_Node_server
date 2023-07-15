const express = require("express");
const router = express.Router();
const addressController = require("../controller/AllowedAdressController");
//GET
//Restituisce l'elenco degli indirizzi utilizzabili per la creazione di nuove persone finte
router.get("/AllowedAdress", addressController.GetAllowedAdress);

//PUT
//Azione di modifica di un indirizzo autorizzato
router.put("/edit/AllowedAdress", addressController.EditAllowedAdress);

//POST
//Azione di aggiunta al db di un indirizzo autorizzato
router.post("/AllowedAdress", addressController.AddAllowedAdress);

//DELETE
router.delete("/AllowedAdress/:ID", addressController.DeleteAllowedAdress);

module.exports = router;
