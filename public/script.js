function onSignIn(user){
	console.log(user);
	let profile = user.getBasicProfile();
	$("#user-name").text(profile.getName());
	$("#user-email").text(profile.getEmail());
}
$(function(){
	$('button[rel="sync"]').click(function(){
		makeAjaxRequest('GET', '/spreadsheets/1fWYf-3L5Kiolml6KzmCN9EII3Qcb9Qcvmmi8_W1EHkw/sync', function(err, response){
			if(err){
				console.log(err);
				return;
			}
			console.log(response);
		})
	})
})
function makeAjaxRequest(method, url, callback){
	let auth = gapi.auth2.getAuthInstance();
	let accessToken;
	if(auth)
		accessToken = auth.currentUser.get().getAuthResponse().access_token;
	else
		accessToken = "";
	$.ajax(url, {
		method,
		headers: {
			'Authorization': accessToken
		},
		success: (response) => {
				return callback(null, response);
		},
		error: (response) => {
			return callback("Error");
		}
	})
}
