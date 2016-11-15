var AtributoEditable = function(ui_original, al_modificar){
    var self = this;
	
	self.ui = $('#plantilla_AtributoEditable')
					.clone()
					.attr('id', ui_original.attr('id'));
					
					
	self.ui.find('.nombre_atributo').text(ui_original.text());
	
    ui_original.replaceWith(self.ui);
	
	
	self.lbl = self.ui.find(".lbl_valor_atributo");
    self.txt = self.ui.find(".txt_valor_atributo");
    self.txt.bind('keypress', function(e) {
        var code = e.keyCode || e.which;
        if(code==13){
            self.lbl.show();
            self.txt.hide();
            self.lbl.text(self.txt.val());
            al_modificar(self.txt.val());            
        }
    });
    self.txt.blur(function(){
        self.lbl.show();
        self.txt.hide();
        self.lbl.text(self.txt.val());
        al_modificar(self.txt.val());         
    });
    new Hammer(self.ui[0]).on('press', function(ev) {
        self.lbl.hide();
        self.txt.show();
        self.txt.focus();
    });
	
};

AtributoEditable.prototype = {
	val: function(valor){
		this.lbl.text(valor);
		this.txt.val(valor);
	}
};