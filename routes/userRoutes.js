const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
//GET
//Visualizza l'elenco degli utenti usando il file di config
router.get("/", userController.getUsersList);

router.get("/:ID", userController.getUserById);

//EDIT
router.put("/", userController.updateUser);

// //DELETE
router.delete("/:ID", userController.deleteUser); //LOGICA NON FISICA

//ADD
router.post("/", userController.postAddUser);

module.exports = router;
