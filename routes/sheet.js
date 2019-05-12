'use strict';
var express = require("express");
var router = express.Router();

const {sync, getSpreadsheet, query} = require("../controllers").spreadsheet;
const {get, del} = require("../controllers").sheet;
const validate = require("../middlewares/validateSpreadsheetAndSheet");
router.post("/sync", validate.checkUserEmail, sync);

router.get("/", validate.checkUserEmail, getSpreadsheet);

router.post("/query",  validate.checkUserEmail, query);

router.post("/:spreadsheetId/sheet/:sheetId", validate.checkUserEmail, validate.checkSpreadsheet, get);

router.delete("/:spreadsheetId/sheet/:sheetId/delete", validate.checkUserEmail, validate.checkSpreadsheet,del);

module.exports = router;