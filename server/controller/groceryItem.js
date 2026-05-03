const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/groceryItem/createAbl");
const ListAbl = require("../abl/groceryItem/listAbl");
const GetAbl = require("../abl/groceryItem/getAbl");
const UpdateAbl = require("../abl/groceryItem/updateAbl");
const DeleteAbl = require("../abl/groceryItem/deleteAbl");

router.post("/create", CreateAbl);
router.get("/list", ListAbl);
router.get("/get", GetAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;