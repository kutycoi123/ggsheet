const {getSpreadsheet, sync, query} = require("./sheet.controller");

module.exports = {
    spreadsheet: {
        getSpreadsheet,
        sync,
        query
    }
};