const express = require("express");
const eventsController = require("../controllers/eventsController")
const upload = require("../middleware/upload");
const eventsRouter = express.Router();

eventsRouter.put(
    "/events/:eventsID/pdf",
    upload.single("pdf"),
    eventsController.updatePdf
);

module.exports = eventsRouter;