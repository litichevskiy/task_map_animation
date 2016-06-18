(function() {

	var pubsub = new PubSub;

	var block_map = new BlockMap({
		container : $('.container'),
		points : ['Ternopil', 'Mykolaiv', 'Luhansk', 'Crimea']
	});

	var selectBlock = new SelectBlock({
		pubsub : pubsub,
		container : $('.select_scen')
	});

})();