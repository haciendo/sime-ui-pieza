/*
EJEMPLO MODELO DE HTML:

		<div id="pantalla_abm_tipoPieza" class="pantalla">
			<div class="custom_toolbar">
				<div class="toolbar_button medir" ></div>
				<div class="toolbar_button btn_agregar">+</div>
				<div class="toolbar_button btn_aceptar">V</div>
				<div class="toolbar_button btn_cancelar">X</div>
			</div>
			
			<div class="list">
				<ul>
					
				</ul>
			</div>
			
			
			<div class="overlay">
			</div>
			
			<div id="tipoPieza_detail" class="detail">
				<ul>
					<li class="input_field">
						<div class="input_container"> 
							<input id="descripcion" placeholder="Descripción de la pieza"/>
						</div>
					</li>
				</ul>
				
			</div>
			
		</div>

		
ACLARACIÓN:
--- Las clases y jerarquias de:
	.custom_toolbar>.btn_agregar/aceptar/cancelar
--- Solo la clases de:
	.detail
	.overlay
	
*/


$(function(){
	
	$('.custom_toolbar>.btn_agregar').show();
	$('.custom_toolbar>.btn_aceptar').hide();
	$('.custom_toolbar>.btn_cancelar').hide();
	$('.detail').hide();
	$('.overlay').hide();
	
	
	$('.custom_toolbar>.btn_agregar').on('click', function(){
		var ui = $(this).parent().parent();
		
		var height_detail = ui.find('.detail').height();
		
		
		ui.find('.detail').css({
			height: 0
		});
		ui.find('.overlay').css({
			opacity: 0
		});
		
		
		ui.find('.detail').show();
		ui.find('.overlay').show();
		
		ui.find('.detail').animate({
			height: height_detail
		}, 200);
		ui.find('.overlay').animate({
			opacity: 0.6
		}, 200);
		
		
		
		ui.find('.btn_agregar').hide();
		ui.find('.btn_aceptar').show();
		ui.find('.btn_cancelar').show();
	
	});
	
	
	// TODO: asignarle a todos el enter con el foco al siguiente
	// TODO: buscar último item de los li y asignarle el evento enter para que haga click en aceptar
	
	
	
	var ocultar =  function(){
		var ui = $(this).parent().parent();
		
		var height_detail = ui.find('.detail').height();
		
		
		ui.find('.detail').animate({
			height: 0
		}, 200, function(){
			ui.find('.detail').hide();
			ui.find('.detail').css({
				height: height_detail
			});
		});
		
		
		ui.find('.overlay').animate({
			opacity: 0
		}, 200, function(){
			ui.find('.overlay').hide();
		});
		
		
		
		ui.find('.btn_agregar').show();
		ui.find('.btn_aceptar').hide();
		ui.find('.btn_cancelar').hide();
	};
	
	
	$('.custom_toolbar>.btn_cancelar').on('click', function(){
		ocultar.call(this);
	});
	
	
	$('.custom_toolbar>.btn_aceptar').on('click', function(){
		ocultar.call(this);
	});
});