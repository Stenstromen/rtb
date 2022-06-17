const express = require("express");

const rtbController = require("../controllers/rtb.controllers");
const rtbRouter = express.Router();

rtbRouter.get("/", rtbController.sendIndex);
rtbRouter.post("/", rtbController.sendMessage);
rtbRouter.get("/store", rtbController.sendMessageLanding);
rtbRouter.get("/store/:id", rtbController.getMessage);
rtbRouter.get("/readme", rtbController.sendReadme);

module.exports = rtbRouter;