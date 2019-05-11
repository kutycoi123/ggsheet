'use strict';

var GoogleSheet = require("../sheetapis/index");
var Spreadsheet = require("../models/spreadsheet.model");
var Sheet = require("../models/sheet.model");
const axios = require("axios");
module.exports = {
    get: async (req, res, next) => {
        let { spreadsheetId, sheetId } = req.params;
        Sheet.find({ spreadsheetId, sid: sheetId }, function (err, response) {
            if (err) {
                res.json({ errors: [{ message: "No sheet found in database. Please sync with your google sheet" }] });
                return;
            }
            res.json(response);
        })
        res.json({})
    },
    del: (req, res, next) => {
        let { spreadsheetId, sheetId } = req.params;
        Sheet.findOneAndRemove({ spreadsheetId, sid: sheetId }, function (err, response) {
            if (err) {
                res.json({ errors: [{ message: "Cannot delete sheet" }] })
                return;
            }
            res.json({ response });
        })

    },

}