$.index.open();

var cloudSessionId = Ti.App.Properties.getString('cloudSessionId');
if(cloudSessionId){
	Cloud.sessionId = cloudSessionId;
}else{
	var loginController = Alloy.createController('login');
	loginController.getView().open();
}

$.emailBtn.addEventListener('click', function(e) {
	alert('아직 안되지롱~요..facebook으로 해주세요.^^');
});
