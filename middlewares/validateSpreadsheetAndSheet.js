module.exports = {
    checkSpreadsheet = async (req, res, next) => {
        let { accessToken, gmail } = res.locals;
        let { spreadsheetId, sheetId } = req.params;
        let foundSpreadsheet = await Spreadsheet.find({ spreadsheetId, user_gmail: gmail })
        if (!foundSpreadsheet) {
            res.json({ errors: [{ message: "No spreadsheet found in database. Please sync with your google sheet" }] });
            return;
        }
        next();
    },
    checkUserEmail = async (req, res, next) => {
        let { accessToken, gmail } = res.locals;
        let { spreadsheetId, sheetId } = req.params;
        let userInfoFromGoogle = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
                                                { headers: { 'Authorization': 'Bearer ' + accessToken } });
        if (userInfoFromGoogle.email != gmail) {
            res.json({ errors: [{ message: "Access token and user gmail are not matched" }] });
            return;
        }
        next();
    }
}