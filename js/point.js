(function( exports ){

	const
		MARGIN = 50, // px
		CURVE = 2;


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


	Point.prototype.deleteElements = function(){
		$( this.container ).remove();
		$( this.point_info ).remove();
	};


	Point.prototype.changeScen = (function() {
		var scen_1 = 'scen_1', scen_2 = 'scen_2',
			_default = 'default', clear = 'clear',
			active_point = 'active_point',
			not_active_point = 'not_active_point';
		return function( scen ) {

			if( scen === scen_1 ) {
				$( this.container ).addClass( 'active_point' );
				this.container[0].removeEventListener( 'click', this.newLine );
				return;
			}

			if( scen === _default ) {
				$( this.container ).removeClass( active_point );
				$( this.container ).addClass( not_active_point );
				this.container[0].removeEventListener( 'click', this.newLine );
				this.default = true;
				return;
			}

			if( scen === clear ) {
				$( this.point_info ).hide('fast');
				$( this.point_info ).text('');
				return;
			}

			if( scen === scen_2 ) {
				$( this.container ).addClass( 'active_point' );
				this.default = true;
				this.container[0].addEventListener( 'click', this.newLine );
				return;
			}
		}
	})();


	function createLine( ) {

		MainPoint.createLine({

			context : this.context,
			x1  : this.left, y1  : this.top,
			cx1 : this.left / CURVE, cy1 : this.top / CURVE,
			x2  : this.coord_main_points.left + 10, y2  : this.coord_main_points.top + 10
		});

		this.pubsub.publish( 'showName', 'showName' );
	}

	exports.Point = Point;

})( window );