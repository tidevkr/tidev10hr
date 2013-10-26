$.index.open();

var cloudSessionId = Ti.App.Properties.getString('cloudSessionId');
if(cloudSessionId){
	Cloud.sessionId = cloudSessionId;
}else{
	var loginController = Alloy.createController('login');
	loginController.getView().open();
}

