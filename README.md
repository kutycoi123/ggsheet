# ggsheet-server
This is a small project to play around with google sheet api, RESTFul apis and mongodb. 

It allows user to save their google sheet data in database
and to quickly search any text/pattern over all of their sheets

#### RESTful endpoints:
|Method   |Endpoint|Bearer authorization Header | Request body  |Response   |
|---|---|---|---|---|
|GET    |/spreadsheet         |access_token|{gmail}   | All spreadsheets metadata of gmail user in our database  |
|GET    |/spreadsheet/:spreadsheetid | access_token| {gmail} | Specific spreadsheet metadata of gmail user in our database |
|POST   |/spreadsheet/sync   |access_token   |{gmail, spreadsheetId}   |Synchronized spreadsheet in database with the one on google sheet   |
|POST   |/spreadsheet/query  |access_token   |{gmail, queryString, spreadsheetId, titleSheet(optional)}   |All rows in google sheet that contain the query text |
|POST   |/spreadsheet/:spreadsheetid/sheet/:sheetid   |acces_token   |{gmail}   | Specific sheet data|
|POST   |/spreadsheet/:spreadsheetid/sheet/:sheetid/delete | access_token | {gmail} | Deleted sheet data |
