(function( exports ){

	const
		MARGIN = 50;

	function Point( param ) {

		var that = this,
			point_info = $('.point_info'),
			top = param.top,
			left = param.left;

		this.default = true;
		this.scen_1 = false;
		this.scen_2 = false;

		this.container = $(
			'<span class="not_active_point" data-name="'+param.name+'"></span>'
		)
		.css({
			top  : param.top,
			left : param.left
		})
		.hover(function( event ) {

			if( that.default ) {

				$( point_info )
				.css({
					'top'  : top - MARGIN,
					'left' : left
				})
				.show('fast')
				.text( that.container[ 0 ].dataset.name );

				return;
			}

			if ( that.scen_1 ) {}//
			if ( that.scen_2 ) {}//

		}, function(){

			if( that.default ) {

				$( point_info )
				.hide('fast')
				.text('');
			}
		});
	}

	exports.Point = Point;

})( window );