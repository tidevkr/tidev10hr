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
