exports.openController = function(controller) {
	Alloy.Globals.mainTabGroup.activeTab.open(controller.getView());
};
