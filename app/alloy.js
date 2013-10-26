// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


var Cloud = require('ti.cloud');
var facebookModule = require('facebook');
facebookModule.appid = "591050647599312";
//facebookModule.permissions = [FACEBOOK_APP_PERMISSIONS];
Alloy.Models.instance('user');

// Push Notifications..
if(OS_IOS){
	Titanium.Network.registerForPushNotifications({
		types: [
			Titanium.Network.NOTIFICATION_TYPE_BADGE,
			Titanium.Network.NOTIFICATION_TYPE_ALERT,
			Titanium.Network.NOTIFICATION_TYPE_SOUND
		],
		success:function(e)
		{
			Ti.API.info(e.deviceToken);
			Alloy.Globals.deviceToken = e.deviceToken;
			Ti.App.Properties.setString('deviceToken',e.deviceToken);
		},
		error:function(e)
		{
			Ti.App.Properties.setBool('subscribing',false);
		},
		callback:function(e)
		{
			alert(e.data.alert); 
		}
	});	
}
if(OS_ANDROID){
	var CloudPush = require('ti.cloudpush');
	
	CloudPush.retrieveDeviceToken({
	    success: function deviceTokenSuccess(e) {
	        Ti.API.info('Device Token: ' + e.deviceToken);
	        Alloy.Globals.deviceToken = e.deviceToken;
	        Ti.App.Properties.setString('deviceToken',e.deviceToken);
	    },
	    error: function deviceTokenError(e) {
	        alert('Failed to register for push! ' + e.error);
	    }
	});
	
	CloudPush.addEventListener('callback', function (evt) {
	    alert(evt.payload);
	});
}


Alloy.Collections.instance('user');
var col = Alloy.Collections.instance('user').on('reset',function(col){
	Alloy.Models.instance('user').set(col.first().attributes);
});
col.fetch();
