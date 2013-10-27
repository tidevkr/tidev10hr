exports.definition = {
	config: {
		columns:{
			'qid': 'INTEGER',
			'isCompleted': 'INTEGER',
			'title': 'TEXT',
			'reviewed': 'INTEGER'	// only for 'qid===1'
		},
		defaults: {
			'isCompleted': false,
			'reviewed': -1
		},
		adapter: {
			type: "properties",
			collection_name: "quest",
			idAttribute : 'qid'
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