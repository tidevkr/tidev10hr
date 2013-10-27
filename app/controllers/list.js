var utils = require('utils');
var placeCol = Alloy.Collections.instance('place');
Cloud.debug = true;

placeCol.on('reset',function(col){
	var items = [];
	placeCol.each(function(myModel){
		var custom = myModel.get('custom_fields');
		var thumbUrl;
		if(custom){
			thumbUrl = custom["thumbnail_url"];
		}
		items.push({
			template : 'itemTemplate',
			thumb : {
				image : thumbUrl
			},
			myLabel :{
				text : myModel.get('name')
			},
			properties :{
				itemId : myModel.id,
				height : 70
			},
		});
		
	});
	$.section.setItems(items);
});

placeCol.fetch({
	data : {
		per_page: 200
	}
});


$.listView.addEventListener('itemclick', function(e) {
	if(e.itemId){
		var selectedModel = placeCol.get(e.itemId);
		utils.openController('detail', {
			model: selectedModel
		});
	}
});
