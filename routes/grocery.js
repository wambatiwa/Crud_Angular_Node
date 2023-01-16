const express = require("express");

const groceryController  = require("../controllers/grecory");

const router = express.Router();

router.get("/",groceryController.getAllGroceries);

router.post("/",groceryController.postGrocery);

router.put("/",groceryController.updateGrocery);

router.delete("/:id",groceryController.deleteGrocery);
module.exports = router;