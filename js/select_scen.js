(function( exports ) {

	function SelectBlock( param ) {

		this.container = param.container;
		this.pubsub = param.pubsub;
		this.list = $('.select_item').toArray();

		var that = this;

		$( this.container ).click(function( event ) {

			if ( event.target.tagName !== 'LI' ) return;

			var scen = event.target.dataset.role;

			that.pubsub.publish('new_scen', scen );

			changeClass( that.list );
		});
	}

	var changeClass = (function() {
		var CLASS_AKTIVE = 'active';

		return function ( list ) {

			list.some( function( item ) {

				if ( $( item ).hasClass( CLASS_AKTIVE ) ) {
					$( item ).removeClass( CLASS_AKTIVE );
					$( event.target ).addClass( CLASS_AKTIVE );
					return true;
				}
			});
		}
	})();

	window.SelectBlock = SelectBlock;

})( window )