(function( exports ) {

	const
		POINT_IS_SET = 'point_is_set';

	function BlockMap( param ) {

		this.container = param.container;
		initMap( this.container );
		this.storagePoints = getAllAreas( this.container );
		this.storageCoord = getCoordinates( this.container );
		this.createPoints( param.points );

	}

	BlockMap.prototype.createPoints = function( list ) {

		var point,
			fragment = document.createDocumentFragment(),
			that = this,
			main_point = list[ 0 ];

			list.splice( 0, 1 );

			point = new MainPoint({
				top  : that.storageCoord[ main_point ].top,
				left : that.storageCoord[ main_point ].left,
				name : main_point
			});

			fragment.appendChild( point.container[ 0 ] );

		list.forEach( function( item ) {

			point = new Point({
				top  : that.storageCoord[item].top,
				left : that.storageCoord[item].left,
				name : item
			});

			that.add_class( item );
			fragment.appendChild( point.container[ 0 ] );
		});

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