'use strict';
var express = require("express");
var router = express.Router();
var GoogleSheet = require("../sheetapis/index");
router.post("/sync", (req, res, next) => {
    let accessToken = res.locals.accessToken;
    let helper = new GoogleSheet(accessToken); 
    //console.log(req.body);
    helper.getSheetsMeta(req.body.spreadsheetId, function(err, response){
        if(err){
            console.log(err);
            res.json({});
            return;
        }
        let sheetTitles = response.data.sheets.map(sheet => sheet.properties.title);
        helper.getAllSheetsData(req.body.spreadsheetId, sheetTitles, (err, data) => {
            res.json(data);   
        })
    });
})
module.exports = router;