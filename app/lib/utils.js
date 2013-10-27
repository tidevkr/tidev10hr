exports.openController = function(name, args) {
	var controller = Alloy.createController(name, args);
	Alloy.Globals.mainTabGroup.activeTab.open(controller.getView());
};
