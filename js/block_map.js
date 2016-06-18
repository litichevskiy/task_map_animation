(function( exports ) {

	function BlockMap( param ) {

		this.container = param.container;
		initMap( this.container );
		this.storagePoints = getAllAreas( this.container );
		this.storageCoord = getCoordinates( this.container );
		this.dedaultPoints = param.points;

	}

	function initMap( container ) {

		container.mapael(maps.ukraine);
	}

	function getAllAreas( container ) {
		return $(container).find('path');
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