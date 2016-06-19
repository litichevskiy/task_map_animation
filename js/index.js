(function() {

	var pubsub = new PubSub;

	var block_map = new BlockMap({
		container : $('.container'),
		points    : ['Ternopil', 'Mykolaiv', 'Luhansk', 'Crimea'],
		pubsub    : pubsub
	});

	var selectBlock = new SelectBlock({
		pubsub         : pubsub,
		container      : $('.select_scen')
	});

	document.addEventListener("DOMContentLoaded", function() {
		$('.load').hide('fast');
		$('.select_scen').show();
		$('.container').css({
			'opacity' : 1
		});
	});

})();