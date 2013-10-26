var currentWindow = $.getView();
var fbHandler = function(e){
	if (e.success) {
        var token = this.accessToken;
        Ti.API.info('Logged in ' + token);
        facebookModule.logout();
        
        Cloud.SocialIntegrations.externalAccountLogin({
		    type: 'facebook',
		    token: token
		}, function (e) {
		    if (e.success) {
		        var user = e.users[0];
		        Ti.App.Properties.setString('cloudSessionId', Cloud.sessionId);
		       // alert(String.format('%s님 반갑습니다.',user.last_name+user.first_name));
		        subscribePushChannel();
		        //currentWindow.close();
		    } else {
		        alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
    }
};

$.fbLogin.addEventListener('click', function(e) {
	facebookModule.authorize();
});

currentWindow.addEventListener('open', function(e) {
	facebookModule.addEventListener('login', fbHandler);
});


currentWindow.addEventListener('close', function(e) {
	facebookModule.addEventListener('logout', fbHandler);
});


	
function subscribePushChannel(){
	var token = Ti.App.Properties.getString('deviceToken');
	if(token){
		Cloud.PushNotifications.subscribe({
		    channel: 'quest',
		    device_token: token,
		    type: 'android'
		}, function (e) {
		    if (e.success) {
		        alert('Success');
		    } else {
		        alert('ACS PUSH Error:\n' + JSON.stringify(e));
		    }
		});
	}
}

subscribePushChannel();
