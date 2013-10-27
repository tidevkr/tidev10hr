var quests = Alloy.Collections.instance('quest');
quests.add([{
	'qid': 0,
	'isCompleted': true,
	'title': "앱 설치 & 로그"
},{
	'qid': 1,
	'title': "리뷰 (0/5)개 남기기"
},{
	'qid': 2,
	'title': "B35에서 도장 받기"
}]);

quests.each(function(quest){
	var row = Ti.UI.createTableViewRow({
		title: quest.get('isCompleted') ? 'v' : '',
		height: 50,
		font:{
			fontFamily:'Arial',
			// fontSize: 19,
			fontWeight: 'bold'		
		}
	});
	var label = Ti.UI.createLabel({
		text: quest.get('title'),
		color: quest.get('isCompleted') ? '#000' : "#999",
		font: {
			fontFamily:'Arial',
			fontSize: 19
		}
	});
	row.add(label);
	$.questTableSection.add( row );
});

var user = Alloy.Models.instance('user');
user.on('change', function(){
	if( !user.get('id') ){
		return;
	}
	// alert( user.attributes );
	// alert( user.get("external_accounts")[0].external_id );
	// alert(facebookModule.getUid());
	$.nameLabel.setText(user.get('first_name') + " " + user.get('last_name'));
	$.profileImageView.setImage("https://graph.facebook.com/"
				+ user.get("external_accounts")[0].external_id
				+"/picture?width=96&height=96");

});
user.trigger('change');

$.logoutButton.addEventListener('click', function(){
	Cloud.Users.logout(function(e){
		if(e.success){
			alert("로그 아웃 되었습니다.");
			Ti.App.Properties.removeProperty('cloudSessionId');
			Alloy.createController('login').getView().open();
	        facebookModule.logout();
		}else{
			alert("로그 아웃이 실패 했는데..\n다시 시도 해보실래요?;;");
		}
	});
});

