(function( exports ){

	function MainPoint( param ) {
		debugger

		Point.call( this, param );
		$( this.container ).css({
			'background' : 'rgba( 255, 118, 0, 0.6)'
		})
	}

	exports.MainPoint = MainPoint;

})( window );