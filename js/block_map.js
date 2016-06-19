(function( exports ) {

	const
		POINT_IS_SET = 'point_is_set';

	function BlockMap( param ) {

		this.container = param.container;
		this.pubsub = param.pubsub;
		this.canvas = $('.canvas')[ 0 ];
		this.context = this.canvas.getContext('2d');
		initMap( this.container );
		this.storagePoints = getAllAreas( this.container );
		this.storageCoord = getCoordinates( this.container );
		this.createPoints( param.points );

		this.pubsub.subscribe( 'new_scen', this.changeScen );

		var that = this;

		$( this.canvas ).click(function(event) {
			that.pubsub.publish('new_scen');
			that.context.clearRect( 0, 0, that.canvas.width, that.canvas.height );
		});
	}

	BlockMap.prototype.createPoints = function( list ) {

		var point,
			fragment = document.createDocumentFragment(),
			that = this,
			main_point = list[ 0 ],
			coordPoints = [],
			top, left;

			list.splice( 0, 1 );


		list.forEach( function( item ) {

			top = that.storageCoord[item].top;
			left = that.storageCoord[item].left;

			point = new Point({
				top       : top,
				left      : left,
				name      : item,
				main_cont : that.container,
				pubsub 	  : that.pubsub,
				canvas    : that.canvas
			});

			that.add_class( item );
			fragment.appendChild( point.container[ 0 ] );

			coordPoints.push({
				left : left,
				top  : top
			});
		});

		point = new MainPoint({
			top       : this.storageCoord[ main_point ].top,
			left      : this.storageCoord[ main_point ].left,
			name      : main_point,
			main_cont : this.container,
			pubsub    : this.pubsub,
			points    : coordPoints,
			canvas    : this.canvas
		});

		fragment.appendChild( point.container[ 0 ] );

		$( that.container ).append( fragment );
	};


	BlockMap.prototype.add_class = function( value ) {

		this.storagePoints.some( function( item ) {

			if( item.attributes['data-id'].value === value ) {
				$( item ).addClass( POINT_IS_SET );
				return true;
			}

		});
	};


	BlockMap.prototype.changeScen = function( scen ) {
		console.log( 'BlockMap' );
	};

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