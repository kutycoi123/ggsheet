const {getAllSpreadsheets, getOneSpreadsheet, sync, query} = require("./spreadsheet.controller");
const {login, logout} = require("./auth.controller");
const {get, del} = require("./sheet.controller");
module.exports = {
    spreadsheet: {
        getAllSpreadsheets,
        getOneSpreadsheet,
        sync,
        query
    },
    auth: {
        login,
        logout
    },
    sheet: {
        get,
        del
    }
};