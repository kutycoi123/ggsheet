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
	getSheetsMetadata(spreadsheetId, callback, ranges=[], includeGridData=false){
		let request = {
			spreadsheetId,
			ranges,
			includeGridData
		}
		this.service.spreadsheets.get(request, (err, response) => {
			if(err){
				callback(err);
				return;
			}
			callback(null, response);
		})
	}
	getAllSheetData(spreadsheetId, sheetTitles, callback, ranges=[]){
		let request = {
			spreadsheetId,
			ranges: [sheetTitles, ...ranges]
		}
		this.service.spreadsheets.values.batchGet(request, function(err, response){
			if(err){
				callback(err);
				return;
			}
			callback(null, response);
		})
	}
	getSpecificSheetData(spreadsheetId, sheetTitle, callback){
		let request = {
			spreadsheetId,
			range: `${sheetTitles}`
		}
		this.service.spreadsheets.values.get(request, function(err, response){
			if(err){
				callback(err);
				return;
			}
			callback(null, response);
		})
	}
	
}
module.exports = GoogleSheet;



