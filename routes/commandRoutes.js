const express = require("express");
const router = express.Router();
const commandController = require("../controller/commandController");

//GET
//FLOWCHART
router.get("/flowchart", commandController.getFlowchart);

//POST

router.post("/create", commandController.postCreateFlowCommand);
module.exports = router;
