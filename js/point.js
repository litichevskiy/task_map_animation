(function( exports ){

	const
		MARGIN = 50,
		CLASS_SCEN_1 = 'scen_1',
		CLASS_DEFAULT = 'default',
		NOT_ACTIVE_POINT = 'not_active_point',
		ACTIVE_POINT = 'active_point';

	function Point( param ) {

		this.point_info = $(
			'<span class="point_info" data-name="'+param.name+'"></span>'
		)[ 0 ];
		this.top = param.top;
		this.left = param.left;

		var that = this;

		this.default = true;
		this.canvas = param.canvas;
		this.pubsub = param.pubsub;

		this.container = $(
			'<button class="not_active_point" data-name="'+param.name+'"></button>'
		)
		.css({
			top  : param.top,
			left : param.left
		})
		.hover(function( event ) {

			if( that.default ) {

				$( that.point_info )
				.css({
					'top'  : that.top - MARGIN,
					'left' : that.left
				})
				.show('fast')
				.text( that.container[ 0 ].dataset.name );

				return;
			}

			if ( that.scen_1 ) {}//
			if ( that.scen_2 ) {}//

		}, function(){

			if( that.default ) {

				$( that.point_info )
				.hide('fast')
				.text('');
			}
		});

		$( param.main_cont ).append( that.point_info );

		this.pubsub.subscribe( 'new_scen', this.changeScen.bind( this ) );
		this.pubsub.subscribe( 'show_name', this.showName.bind( this ) );
		// this.pubsub.subscribe( 'clear', this.clearScen.bind( this ) );
	}

	Point.prototype.showName = function() {
		this.default = false;

		var value = this.point_info.dataset.name;
		$( this.point_info ).text( value );
		$( this.point_info ).show('fast');
		$( this.point_info ).css({
			'top'  : this.top,
			'left' : this.left//////////////////////
		})
	};

	Point.prototype.changeScen = function( scen ) {

		if( scen === CLASS_SCEN_1 ) {
			$( this.container ).addClass( 'active_point' );
			return;
		}

		if( scen === CLASS_DEFAULT ) {
			$( this.container ).removeClass( ACTIVE_POINT );
			$( this.container ).addClass( NOT_ACTIVE_POINT );
			this.default = true;
			return;
		}
	};

	exports.Point = Point;

})( window );