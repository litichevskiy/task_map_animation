(function( exports ) {

	const
		SCEN_1 = 'scen_1',
		SCEN_2 = 'scen_2',
		DEFAULT = 'default',
		CURVE = 60, // px
		PADDING = 10; // px

	function MainPoint( param ) {

		Point.call( this, param );
		this.list_points = param.points;

		this.create_line = false;
		this.canvas = param.canvas;
		this.context = this.canvas.getContext('2d');

		var that = this;

		$( this.container ).css({
			'backgroundColor' : 'rgba( 255, 235, 59, 0.9)'
		});

		$( this.container ).click(function(event) {

			if ( that.create_line ) that.addLine( that.list_points );
		});

		this.pubsub.subscribe( 'showName', this.showName.bind( this ) );
		this.pubsub.subscribe( 'clear', this.hideName.bind( this ) );

	}


	MainPoint.prototype.hideName = function() {

		$( this.point_info ).text();
		$( this.point_info ).hide('fast');
	};


	MainPoint.prototype.showName = function() {

		var value = this.point_info.dataset.name;

		$( this.point_info ).text( value );
		$( this.point_info ).show('fast');
		$( this.point_info ).css({
			'top'  : this.top,
			'left' : this.left
		})
	};


	MainPoint.prototype.addLine = function( listCoord ) {

		if( !this.create_line ) return;

		var that = this;

		listCoord.forEach( function( item ) {
			MainPoint.createLine({
				context : that.context,
				x1  : that.left + PADDING, y1  : that.top + PADDING,
				cx1 : that.left + CURVE, cy1 : that.top + CURVE,
				x2  : item.left, y2  : item.top
			});
		});

		$( this.canvas ).css({'z-index':0});
		this.pubsub.publish('show_name');
	};


	MainPoint.prototype.changeScen = function( scen ) {

		if ( scen === SCEN_1 ) {
			this.create_line = true;
			this.default = true;//////////////
			$( this.container ).addClass('active_point');
			return
		}

		if ( scen === DEFAULT ) {
			this.create_line = false;
			this.default = true;//////////////
			$( this.container ).removeClass('active_point');
		}

		if ( scen === SCEN_2 ) {
			this.default = false;
			this.create_line = false;
			$( this.container ).addClass('active_point');
		}
	};


	MainPoint.createLine = function( data ) {

		data.context.beginPath();
		data.context.lineWidth = 3;
		data.context.moveTo( data.x1, data.y1 );

		data.context.quadraticCurveTo( data.cx1, data.cy1, data.x2, data.y2 );
		data.context.strokeStyle = 'gold';
		data.context.stroke();
	}

	exports.MainPoint = MainPoint;

})( window );