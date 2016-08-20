var AtributoEditable = function(ui, al_modificar){
    var self = this;
    this.lbl = ui.find(".lbl_valor_atributo");
    this.txt = ui.find(".txt_valor_atributo");
    this.txt.bind('keypress', function(e) {
        var code = e.keyCode || e.which;
        if(code==13){
            self.lbl.show();
            self.txt.hide();
            self.lbl.text(self.txt.val());
            al_modificar(self.txt.val());            
        }
    });
    this.txt.blur(function(){
        self.lbl.show();
        self.txt.hide();
        self.lbl.text(self.txt.val());
        al_modificar(self.txt.val());         
    });
    new Hammer(ui[0]).on('press', function(ev) {
        self.lbl.hide();
        self.txt.show();
        self.txt.focus();
    });   
};

AtributoEditable.prototype.val = function(valor){
    this.lbl.text(valor);
    this.txt.val(valor);
};