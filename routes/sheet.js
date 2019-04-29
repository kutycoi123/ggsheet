'use strict';
var express = require("express");
var router = express.Router();

const {sync, getSpreadsheet, query} = require("../controllers").spreadsheet;
router.post("/sync", sync);

router.get("/", getSpreadsheet);

router.post("/query", query);

module.exports = router;