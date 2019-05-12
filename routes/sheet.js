'use strict';
var express = require("express");
var router = express.Router();

const {sync, getAllSpreadsheets, getOneSpreadsheet, query} = require("../controllers").spreadsheet;
const {get, del} = require("../controllers").sheet;
const validate = require("../middlewares/validateSpreadsheetAndSheet");

router.use(validate.checkUserEmail)

router.post("/sync", sync);

router.post("/", getAllSpreadsheets);

router.post("/:spreadsheetId/get", getOneSpreadsheet)

router.post("/query",  query);

router.post("/:spreadsheetId/sheet/:sheetId", validate.checkSpreadsheet, get);

router.delete("/:spreadsheetId/sheet/:sheetId/delete", validate.checkSpreadsheet,del);

module.exports = router;