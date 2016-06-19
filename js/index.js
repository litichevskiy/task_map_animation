(function() {

	var pubsub = new PubSub;

	var block_map = new BlockMap({
		container : $('.container'),
		points    : ['Ternopil', 'Mykolaiv', 'Luhansk', 'Crimea'],
		pubsub    : pubsub
	});

	var selectBlock = new SelectBlock({
		pubsub    : pubsub,
		container : $('.select_scen')
	});

	window.onload = function() {
		$('.load').hide('')
	}

})();