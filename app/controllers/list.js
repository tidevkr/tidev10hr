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
		
		//add custom filed
		var findData = _.find(data,function(item){
			return item.title == myModel.get('name');
		});
		Ti.API.info(myModel.id);
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
		//alert(e);
		var selectedModel = placeCol.get(e.itemId);
		var detailC = Alloy.createController('detail',{
			model : selectedModel
		});
		Alloy.Globals.mainTabGroup.activeTab.open(detailC.getView());
	}
});
