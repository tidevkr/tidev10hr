var placeCol = Alloy.Collections.instance('place');

placeCol.on('reset',function(col){
	var items = [];
	placeCol.each(function(model){
		items.push({
			properties :{
				title : model.get('name'),
				itemId : model.id
			}
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
