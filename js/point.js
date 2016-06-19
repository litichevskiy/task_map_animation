(function( exports ){

	const
		MARGIN = 50, // px
		CURVE = 200, // px
		PADDING = 10, // px
		CLASS_SCEN_1 = 'scen_1',
		SCEN_2 = 'scen_2',
		CLASS_DEFAULT = 'default',
		NOT_ACTIVE_POINT = 'not_active_point',
		ACTIVE_POINT = 'active_point',
		CLEAR = 'clear';

	function Point( param ) {

		this.point_info = $(
			'<span class="point_info" data-name="'+param.name+'"></span>'
		)[ 0 ];
		this.top = param.top;
		this.left = param.left;

		var that = this;

		this.default = true;
		this.canvas = param.canvas;
		this.context = this.canvas.getContext('2d');
		this.pubsub = param.pubsub;
		this.coord_main_points = param.coord_main_points;
		this.newLine = createLine.bind( this );

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
		this.pubsub.subscribe( 'clear', this.changeScen.bind( this ) );
	}

	Point.prototype.showName = function() {
		this.default = false;

		var value = this.point_info.dataset.name;
		$( this.point_info ).text( value );
		$( this.point_info ).show('fast');
		$( this.point_info ).css({
			'top'  : this.top,
			'left' : this.left
		})
	};


	Point.prototype.changeScen = function( scen ) {

		if( scen === CLASS_SCEN_1 ) {
			$( this.container ).addClass( 'active_point' );
			this.container[0].removeEventListener( 'click', this.newLine );
			return;
		}

		if( scen === CLASS_DEFAULT ) {
			$( this.container ).removeClass( ACTIVE_POINT );
			$( this.container ).addClass( NOT_ACTIVE_POINT );
			this.default = true;
			return;
		}

		if( scen === CLEAR ) {
			$( this.point_info ).hide('fast');
			$( this.point_info ).text('');
			return;
		}

		if( scen === SCEN_2 ) {
			$( this.container ).addClass( 'active_point' );
			this.default = true;
			this.container[0].addEventListener( 'click', this.newLine );

			return;
		}
	};

	function createLine( ) {

		MainPoint.createLine({

			context : this.context,
			x1  : this.left, 		           y1  : this.top,
			cx1 : this.left - CURVE, 		   cy1 : this.top - CURVE,
			x2  : this.coord_main_points.left + 10, y2  : this.coord_main_points.top + 10
		});

		this.pubsub.publish( 'showName', 'showName' );
	}

	exports.Point = Point;

})( window );