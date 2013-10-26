$.index.open();

var cloudSessionId = Ti.App.Properties.getString('cloudSessionId');
if(cloudSessionId){
	Cloud.sessionId = cloudSessionId;
	
	Cloud.Users.showMe(function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        var loginModel = Alloy.Models.instance('user').set(user);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	   });
}else{
	var loginController = Alloy.createController('login');
	loginController.getView().open();
}

