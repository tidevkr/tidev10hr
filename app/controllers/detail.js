var args = arguments[0] || {},
	model = args.model;
	
if(model){
	$.webView.url = model.get('website');
	$.getView().title = model.get('name');
}
