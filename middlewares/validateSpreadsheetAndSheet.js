var GoogleSheet = require("../sheetapis/index");
var Spreadsheet = require("../models/spreadsheet.model");
var Sheet = require("../models/sheet.model");
const axios = require("axios");
module.exports = {
    checkSpreadsheet: async (req, res, next) => {
        let { accessToken, gmail } = res.locals;
        let { spreadsheetId, sheetId } = req.params;
        let foundSpreadsheet = await Spreadsheet.find({ spreadsheetId, user_gmail: gmail })
        if (foundSpreadsheet.length == 0) {
            res.json({ errors: [{ message: "No spreadsheet found in database. Please sync with your google sheet" }] });
            return;
        }
        next();
    },
    checkUserEmail: async (req, res, next) => {
        let { accessToken, gmail } = res.locals;
        let { spreadsheetId, sheetId } = req.params;
        console.log(accessToken);
        let userInfoFromGoogle;
        try{
            userInfoFromGoogle = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
                                                { headers: { 'Authorization': 'Bearer ' + accessToken } })
        }catch(err){
            res.json({errors: [{message: "Cannot validate user access token. Please provide another one!!!"}]})
            return;
        }
        
        if (userInfoFromGoogle.data.email != gmail) {
            res.json({ errors: [{ message: "Access token and user gmail are not matched" }] });
            return;
        }
        next();
    }
}