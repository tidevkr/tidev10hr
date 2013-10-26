exports.definition = {
	config: {

		adapter: {
			type: "acs",
			collection_name: "place"
		},
		
		"settings": {
	        "object_name": "places", 
	        "object_method": "Places"
	    }
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};