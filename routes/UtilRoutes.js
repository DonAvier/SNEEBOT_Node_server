const express = require("express");
const router = express.Router();
const addressController = require("../controller/AllowedAdressController");
//GET
//Restituisce l'elenco degli indirizzi utilizzabili per la creazione di nuove persone finte
router.get("/AllowedAddress", addressController.GetAllowedAdress);

//Restituisce l'indirizzo desiderato
router.get("/AllowedAddress/:ID", addressController.GetAllowedAdresByID);

//PUT
//Azione di modifica di un indirizzo autorizzato
router.put("/edit/AllowedAddress", addressController.EditAllowedAdress);

//POST
//Azione di aggiunta al db di un indirizzo autorizzato
router.post("/AllowedAddress", addressController.AddAllowedAdress);

//DELETE
router.delete("/AllowedAddress/:ID", addressController.DeleteAllowedAdress);

module.exports = router;
