const {getSpreadsheet, sync, query} = require("./spreadsheet.controller");
const {login, logout} = require("./auth.controller");
const {get} = require("./sheet.controller");
module.exports = {
    spreadsheet: {
        getSpreadsheet,
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