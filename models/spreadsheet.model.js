var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var spreadsheetSchema = new Schema({
    spreadsheetId: String,
    user_gmail: String,
    // sheets: [
    //     {
    //         sheet_db_id: String,
    //         sheet_google_id: String
    //     }
    // ] //Store ids of sheets
})

var Spreadsheet = mongoose.model('Spreadsheet', spreadsheetSchema);
module.exports = Spreadsheet;