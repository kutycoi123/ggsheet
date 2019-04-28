var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sheetSchema = new Schema({
    sid: String,
    spreadsheetId: String,
    title: String,
    rows: [
        {
            cells: [String]
        }
    ]
})

var Sheet = mongoose.model('Sheet', sheetSchema);
module.exports = Sheet;