console.log('-_-_-_-_-_-_slider.js');
var slider = {
	show_right_to_left: function(pantallaShow, pantallaHide, onEnd_callback){
		
		//TODO: tomar el ancho del body
		pantallaShow.ui.css({
			left: $('body').width()
		});
		////
		
		pantallaHide.ui.css( "zIndex", 0 )
		pantallaShow.ui.css( "zIndex", 1 );
		
		pantallaShow.ui.show();
		pantallaShow.ui.animate({
			left: 0
		}, 300, function(){
			
			if(onEnd_callback) onEnd_callback();
			
			pantallaHide.hide();
			pantallaShow.show();
		});
		
	},
	show_left_to_right: function(pantallaShow, pantallaHide, onEnd_callback){
		//TODO: tomar el ancho del body
		pantallaShow.ui.css({
			left: -1 * $('body').first().width()
		});
		////
		
		pantallaHide.ui.css( "zIndex", 0 );
		pantallaShow.ui.css( "zIndex", 1 );
		
		
		pantallaShow.ui.show();
		pantallaShow.ui.animate({
			left: 0
		}, 300, function(){
			
			if(onEnd_callback) onEnd_callback();
			
			pantallaHide.hide();
			pantallaShow.show();
		});
		
	}
};