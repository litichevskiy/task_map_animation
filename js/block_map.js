(function( exports ) {

	function BlockMap( param ) {

		this.container = param.container;
		this.pubsub = param.pubsub;
		this.canvas = $('.canvas')[ 0 ];
		this.context = this.canvas.getContext('2d');
		initMap( this.container );
		this.storagePoints = getAllAreas( this.container );
		this.storageCoord = getCoordinates( this.container );
		this.createPoints( param.points );

		var that = this;

		$( this.canvas ).click(function(event) {
			that.pubsub.publish( 'clear', 'clear' );
			that.context.clearRect( 0, 0, that.canvas.width, that.canvas.height );
		});

		this.pubsub.subscribe( 'clear', this.changeScen );
	}


	BlockMap.prototype.createPoints = function( list ) {

		var point,
			fragment = document.createDocumentFragment(),
			that = this,
			main_point = list[ 0 ],
			coordPoints = [],
			top, left, main_left, main_top, length, item;

		point = new MainPoint({
			top       : this.storageCoord[ main_point ].top,
			left      : this.storageCoord[ main_point ].left,
			name      : main_point,
			main_cont : this.container,
			pubsub    : this.pubsub,
			points    : coordPoints,
			canvas    : this.canvas
		});

		main_top = this.storageCoord[ main_point ].top;
		main_left = this.storageCoord[ main_point ].left;

		fragment.appendChild( point.container[ 0 ] );

		length = list.length;

		for( var i = 1; i < length; i++ ) {

			item = list[i];

			top = that.storageCoord[item].top;
			left = that.storageCoord[item].left;

			point = new Point({
				top       : top,
				left      : left,
				name      : item,
				main_cont : that.container,
				pubsub 	  : that.pubsub,
				canvas    : that.canvas,
				coord_main_points : {
					left : main_left,
					top  : main_top
				}
			});

			that.add_class( item );
			fragment.appendChild( point.container[ 0 ] );

			coordPoints.push({
				left : left,
				top  : top
			});
		};

		$( that.container ).append( fragment );
	};


	BlockMap.prototype.add_class = (function() {
		var point_is_set = 'point_is_set';

		return function( value ) {

			this.storagePoints.some( function( item ) {

				if( item.attributes['data-id'].value === value ) {
					$( item ).addClass( point_is_set );
					return true;
				}
			});
		}
	})();


	BlockMap.prototype.changeScen = function( scen ) {};


	function initMap( container ) {
		container.mapael(maps.ukraine);
	}


	function getAllAreas( container ) {
		return $(container).find('path').toArray();
	}


	function getCoordinates( container ) {
		var coordinates = {},
			text = $(container).find('tspan'),
			value, coord;

		$( text ).each( function( i, item ) {

			value = item.textContent;
			coord = $( item ).offset();
			coordinates[ value ] = {
				left : Math.round( coord.left ),
				top  : Math.round( coord.top )
			}
		});

		return coordinates;
	}

	exports.BlockMap = BlockMap;

})( window );