'use strict';

var GoogleSheet = require("../sheetapis/index");
var Spreadsheet = require("../models/spreadsheet.model");
var Sheet = require("../models/sheet.model");

module.exports = {
    getSpreadsheet: async (req, res, next) => {
        let { accessToken, gmail } = res.locals;
        let result = await Spreadsheet.find({ user_gmail: gmail });
        res.json(result);
    },
    sync: async (req, res, next) => {
        let { accessToken, gmail } = res.locals;
        let helper = new GoogleSheet(accessToken);
        let spreadsheetId = req.body.spreadsheetId;

        helper.getSheetsMetadata(spreadsheetId, function (err, response) {
            if (err) {
                console.log(err);
                res.json({errors: [err]});
                return;
            }
            console.log(response);
            let sheetsInfo = response.data.sheets;
            let spreadsheetTitle = response.data.properties.title;
            let sheetTitles = sheetsInfo.map(sheet => sheet.properties.title);
            helper.getAllSheetData(spreadsheetId, sheetTitles, async (err, response) => {

                let returnedResponse = {};
                let sheets = response.data.valueRanges
                let spreadsheet = await Spreadsheet.findOneAndUpdate({ spreadsheetId },
                    { spreadsheetId, user_gmail: gmail, title: spreadsheetTitle}, { new: true, upsert: true });
                returnedResponse.spreadsheet = spreadsheet;
                returnedResponse.sheets = [];
                for (let i = 0; i < sheets.length; ++i) {
                    let title = sheets[i].range.split("!")[0];
                    let sid = "";
                    //Need to get sheetid in sheetsInfo
                    for (let j = 0; j < sheetsInfo.length; ++j) {
                        let info = sheetsInfo[j].properties;
                        if (info.title == title) {
                            sid = info.sheetId;
                            break;
                        }
                    }
                    //Make rows for sheet
                    let rows = [];
                    for (let j = 0; j < sheets[i].values.length; ++j) {
                        rows.push({ cells: sheets[i].values[j] });
                    }
                    let newSheet = { title, sid, spreadsheetId, rows };
                    let updatedSheet = await Sheet.findOneAndUpdate({ sid, spreadsheetId }, newSheet, { upsert: true, new: true });
                    returnedResponse.sheets.push({ title: updatedSheet.title, sid: updatedSheet.sid, spreadsheetId: updatedSheet.spreadsheetId });
                }
                res.json({ data: returnedResponse });
                return;

            })
        })
    },
    query: async (req, res, next) => {
        let { queryString, spreadsheetId, tittle } = req.body;
        let {gmail} = res.locals;
        let regexString = new RegExp(queryString);
        let foundSpreadsheet = await Spreadsheet.find({user_gmail: gmail});
        if(foundSpreadsheet){
            Sheet.aggregate([{ $match: { spreadsheetId, tittle } }, { $unwind: "$rows" }, { $match: { "rows.cells": { $in: [regexString] } } }], function (err, response) {
                if (err) {
                    console.log(err);
                    res.json({ errors: [err] });
                    return;
                }
                res.json(response);
            })
        }else{
            res.json({});
        }
    }
}