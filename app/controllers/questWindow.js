

/*
facebookModule.requestWithGraphPath('', {
	ids : fb_ids,
	format : 'json',
	// width: 200,
	// height: 200,
	// fields: ['first_name', 'last_name', 'email', 'picture', 'link']
	fields : ['first_name', 'last_name', 'email', 'link']
}, 'GET', function(e) {
	if (e.success) {
		var result = JSON.parse(e.result);
		_.each(fb_ids, function(fb_id) {
			if (!result[fb_id]) {
				// non public fb user
				return;
			}
			Ti.API.info("result fb_id: 	" + fb_id);
			thisCollection.where({
				'fb_id' : fb_id
			}).pop().set({
				'first_name' : result[fb_id].first_name,
				'last_name' : result[fb_id].last_name,
				'email' : result[fb_id].email,
				'link' : result[fb_id].link
				// 'picture_url': result[fb_id].picture.data.url
				// 'picture_url': "https://graph.facebook.com/"+fb_id+"/picture?width=96&height=96"
			});
		});
	} else if (e.error) {
		Ti.API.warn(e.error);
	} else {
		Ti.API.warn('Unknown response');
	}
});
*/