var placeCol = Alloy.Collections.instance('place');

placeCol.on('reset',function(col){
	var items = [];
	placeCol.each(function(model){
		Ti.API.info(model.attributes);
		items.push({
			template : 'itemTemplate',
			thumb : {
				image : model.get('thumbnail_url')
			},
			myLabel :{
				text : model.get('name')
			},
			properties :{
				itemId : model.id,
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
		//alert(e);
		var selectedModel = placeCol.get(e.itemId);
		var detailC = Alloy.createController('detail',{
			model : selectedModel
		});
		Alloy.Globals.mainTabGroup.activeTab.open(detailC.getView());
	}
});
