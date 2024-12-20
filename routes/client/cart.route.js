const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/cart.controller");

router.get("/", controller.index);

router.patch("/update", controller.updatePatch);

router.get("/delete/:id", controller.delete);

router.post("/add/:id", controller.addPost);

module.exports = router;
