const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/category/createAbl");
const ListAbl = require("../abl/category/listAbl");
const GetAbl = require("../abl/category/getAbl");
const UpdateAbl = require("../abl/category/updateAbl");
const DeleteAbl = require("../abl/category/deleteAbl");

router.post("/create", CreateAbl);
router.get("/list", ListAbl);
router.get("/get", GetAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;