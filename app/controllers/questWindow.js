var quests = Alloy.Collections.instance('quest');
quests.add([{
	'qid': 0,
	// 'isCompleted': true,
	'title': "앱 설치 & 로그"
},{
	'qid': 1,
	'title': "리뷰 (0/5)개 남기기",
	'reviewed': 0
},{
	'qid': 2,
	'title': "B35에서 도장 받기"
}]);

quests.each(function(quest){
	var row = Ti.UI.createTableViewRow({
		// title: quest.get('isCompleted') ? 'v' : '',
		title: '',
		height: 50,
		font:{
			fontFamily:'Arial',
			// fontSize: 19,
			fontWeight: 'bold'		
		}
	});
	var label = Ti.UI.createLabel({
		text: quest.get('title'),
		// color: quest.get('isCompleted') ? '#000' : "#999",
		color: "#999",
		font: {
			fontFamily:'Arial',
			fontSize: 19
		}
	});
	row.add(label);
	$.questTableSection.add( row );
});

quests.on('change:isCompleted', function(quest, e2, e3){
	var index = quest.get('qid');
	var row = $.questTableSection.rows[index];
	var label = row.getChildren()[0];
	// alert(JSON.stringify(e1));
	if( quest.get('isCompleted') ){
		// alert(index);
		row.setTitle('v');
		label.setColor('#000');
	}else{
		row.setTitle('');
		label.setColor('#999');
	}
});
quests.on('change:reviewed', function(quest){
	var index = 1;	// 리뷰해야 하는 퀘스트 아이디
	if(quest.get('qid') !== index){
		return;
	}  
	var label = $.questTableSection.rows[index].getChildren()[0];
	label.setText(String.format('리뷰 (%d/5)개 남기기', quest.get('reviewed')));
	if( quest.get('reviewed') >= 5){
		quest.set({'isCompleted': true});
	}
});

quests.at(0).set({isCompleted: true});
// quests.at(1).set({reviewed:4});


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
				
	if( !user.get('id') ){
		return;
	}else{
		Ti.API.info(user.get('id'));
	}
	Cloud.Reviews.query({
		owner_id: user.get('id'),
	    where: {
	    	// rating: 5
	        // 'user.id': "526b4fd3d72ec85152022534"
	        // user: {id:"526cb3d91cd8923e160266b3"}
	    }
	}, function(e){
	    if (e.success) {
	    	reviews = _.filter(e.reviews, function(review) {
	    		return review.user.id == user.get('id');
	    	});
	    	quests.at(1).set({'reviewed': reviews.length});
	    	// Ti.API.info(JSON.stringify(e));
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
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

