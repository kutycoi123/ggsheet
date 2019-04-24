'use strict';
var express = require("express");
var router = express.Router();
var GoogleSheet = require("../sheetapis/index");
router.get("/:id/sync", (req, res, next) => {
    let accessToken = res.locals.accessToken;
    let helper = new GoogleSheet(accessToken); 
    helper.getSheets(req.params.id, function(err, response){
        if(err){
            console.log(err);
            res.json(err);
            return;
        }
        console.log(response);
        res.json(response);
    });
})
module.exports = router;