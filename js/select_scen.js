(function( exports ) {

	function SelectBlock( param ) {

		this.container = param.container;
		this.pubsub = param.pubsub;

		$( this.container ).click(function(event) {

		});
	}

	window.SelectBlock = SelectBlock;

})( window )