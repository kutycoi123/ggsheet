function onSignIn(user){
	console.log(user);
	let profile = user.getBasicProfile();
	$("#user-name").text(profile.getName());
	$("#user-email").text(profile.getEmail());
}
