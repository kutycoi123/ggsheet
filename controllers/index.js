const {getSpreadsheet, sync, query} = require("./sheet.controller");
const {login, logout} = require("./auth.controller");
module.exports = {
    spreadsheet: {
        getSpreadsheet,
        sync,
        query
    },
    auth: {
        login,
        logout
    }
};