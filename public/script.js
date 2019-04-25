function onSignIn(user){

	console.log(user);
	let profile = user.getBasicProfile();
	$("#user-name").text(profile.getName());
	$("#user-email").text(profile.getEmail());
	makeAjaxRequest("POST", "/login", function(err, response){
		if(err){
			console.log(err);
			return;
		}
		//console.log(response.split("<body>")[1].split("</body>")[0]);
		//$("html")[0].innerHTML = response.split("<body>")[1].split("</body>")[0];
		//$("html")[0].innerHTML = response;
		//$("body")[0].innerHTML = response.split("<body>")[1].split("</body>")[0];
		$("#dashboard")[0].innerHTML = response.split("<body>")[1].split("</body>")[0];
		$('button[rel="sync"]').click(function(){
			console.log("Syncing")
			makeAjaxRequest('POST', '/spreadsheets/sync', function(err, response){
				if(err){
					console.log(err);
					return;
				}
				console.log(response);
			}, {spreadsheetId: "1fWYf-3L5Kiolml6KzmCN9EII3Qcb9Qcvmmi8_W1EHkw"})
		})
	})
}
function onSignOut(){
	let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
		makeAjaxRequest("POST", "/logout", function(err, response){
			if(err){
				console.log(err);
				return;
			}
			console.log(response);
			$("#dashboard")[0].innerHTML = "";
		})
    });
}
$(function(){
	
})

function makeAjaxRequest(method, url, callback, data={}){
	let auth = gapi.auth2.getAuthInstance();
	let accessToken;
	if(auth)
		accessToken = auth.currentUser.get().getAuthResponse().access_token;
	else
		accessToken = "";
	let user_email = auth.currentUser.Ab.w3.U3;
	let body = {access_token: accessToken, gmail: user_email};
	for(let i in data){
		body[i] = data[i];
	}
	$.ajax(url, {
		method,
		headers: {
			'Authorization': accessToken
		},
		data: body,
		success: (response) => {
				return callback(null, response);
		},
		error: (response) => {
			return callback("Error");
		}
	})
}
