var pantalla = {
	show_right_to_left: function(onEnd_callback){
		var self = this;
		self.ui.css({
			left: $('div.pantalla:visible').first().width()
		});
		
		$('.pantalla').not( "#"+self.ui.attr('id') ).css( "zIndex", 0 );
		self.ui.css( "zIndex", 1 );
		
		self.ui.show();
		self.ui.animate({
			left: 0
		}, 300, function(){
			
			if(onEnd_callback) onEnd_callback();
			
			$('.pantalla').not( "#"+self.ui.attr('id') ).hide();
			self.show();
		});
		
	},
	show_left_to_right: function(onEnd_callback){
		
		var self = this;
		self.ui.css({
			left: -1 * $('div.pantalla:visible').first().width(),
			width: $('div.pantalla:visible').first().width()
		});
		
		$('.pantalla').not( "#"+self.ui.attr('id') ).css( "zIndex", 0 );
		self.ui.css( "zIndex", 1 );
		
		
		self.ui.show();
		self.ui.animate({
			left: 0
		}, 300, function(){
			
			if(onEnd_callback) onEnd_callback();
			
			$('.pantalla').not( "#"+self.ui.attr('id') ).hide();
			
			self.show();
		});
		
	}
};