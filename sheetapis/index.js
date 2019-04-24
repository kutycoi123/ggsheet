"use-strict";
var {google} = require("googleapis");
var {OAuth2Client} = require("google-auth-library");

class GoogleSheet{
	constructor(access_token){
		let auth = new OAuth2Client();
		auth.credentials = {
			access_token 
		};
		this.service = google.sheets({version: 'v4', auth: auth});
	}
	getSheets(spreadsheetId, callback, ranges=[], includeGridData=false){
		let request = {
			spreadsheetId,
			ranges,
			includeGridData
		}
		this.service.spreadsheets.get(request, function(err, response){
			if(err){
				callback(err);
				return;
			}
			callback(null, response);
		})
	}
}
module.exports = GoogleSheet;



