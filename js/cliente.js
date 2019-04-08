var urlCliente="http://localhost:58102/api/Cliente";
	
	function slider(id){
		if($('.slider'+id).css('display')=="block"){
			if(id==1){
				$('#button'+id).html('+ Endereço');
			}else{
				$('#button'+id).html('+ Endereço Adicional');
			}
			$('.slider'+id).slideUp();
		}else{
			if(id==1){
				$('#button'+id).html('- Endereço');
			}else{
				$('#button'+id).html('- Endereço Adicional');
			}
			$('.slider'+id).slideDown();
		}
	}
	
	function sliderEdit(id){
		if($('.sliderEdit'+id).css('display')=="block"){
			if(id==1){
				$('#buttonEdit'+id).html('+ Endereço');
			}else{
				$('#buttonEdit'+id).html('+ Endereço Adicional');
			}
			$('.sliderEdit'+id).slideUp();
		}else{
			if(id==1){
				$('#buttonEdit'+id).html('- Endereço');
			}else{
				$('#buttonEdit'+id).html('- Endereço Adicional');
			}
			$('.sliderEdit'+id).slideDown();
		}
	}

  $(document).ready(function(){
	List();
      
    masks();
  });
  
  function masks(){
	$('.celular').mask('(00)00000-0000');
	$('.fone').mask('(00)0000-0000');
    $('.cep').mask('00000-000');
    $('.numero').mask('######0');
	$('.celularEdit').mask('(00)00000-0000');
	$('.foneEdit').mask('(00)0000-0000');
    $('.cepEdit').mask('00000-000');
    $('.numeroEdit').mask('######0');
	
  }
  
  $('#formIncluir').submit(function(){
	 var cliente=new Object(); 
	 var enderecos=[];
	 cliente.Nome=$('#nome').val();  
	 cliente.DtNascimento=$('#dtNascimento').val() ; 
	 cliente.TipoCliente=$('#oppTipoCliente').val() ; 
	 cliente.CPF_CNPJ= $('#cpfCnpj').val() ; 
	 cliente.Email= $('#email').val(); 
	 cliente.Celular= $('#celular').val(); 
	 cliente.Fone= $('#fone').val(); 
	 cliente.Enderecos=includeAddress();
	 //alert(JSON.stringify(cliente));
	 $.ajax({ 
				  url: urlCliente, 
				  type: 'POST',  
				  dataType: 'json',  
				  data: cliente, 
				  success: function (data) { 
					 
					 $('#valSuccess').html("Cliente inserido com sucesso!");
					 $('.success').css('display','block'); 
					 $('#InsertModal').modal('hide');  
					 
					 List(); 
					 HideAlert(); 
				 },   
				 error: function (data) {   
					$('#valError').html(data);
					  $('#valError').html(data['responseJSON']["Message"]);  
					  $('.error').css('display','block'); 
					  $('#InsertModal').modal('hide');  
					  List(); 
					  HideAlert(); 
				  }   
			  });   
			 
			 
		return false;
  });
  

  
  function includeAddress(){
	var idAtual=0;
	var enderecos=[];
	var endereco=new Object();
	$.each($('.valoresEnderecos :input[type="text"] , .valoresEnderecos select'),function(){
			var attr = $(this).attr('name');
			if($(this).attr('name').indexOf("cep")!=-1){
				endereco.CEP=$(this).val();
			}
			else if($(this).attr('name').indexOf("logradouro")!=-1){
				endereco.Logradouro=$(this).val();
			}else if($(this).attr('name').indexOf("bairro")!=-1){
				endereco.Bairro=$(this).val();
			}else if($(this).attr('name').indexOf("cidade")!=-1){
				endereco.Cidade=$(this).val();
			}else if($(this).attr('name').indexOf("numero")!=-1){
				endereco.Numero=$(this).val();
			}else if($(this).attr('name').indexOf("complemento")!=-1){
				endereco.Complemento=$(this).val();
			}else{
				endereco.UF=$(this).val();
				 enderecos.push(endereco);
				 endereco=new Object();
			}
	});
	return enderecos;

  }
  
  
  $('#formEditar').submit(function(){
	var cliente=new Object();
	cliente.Id=$('#idClienteEdit').val();
	cliente.Nome=$('#nomeEdit').val(); 
	cliente.DtNascimento=$('#dtNascimentoEdit').val() ;
	cliente.TipoCliente=$('#oppTipoClienteEdit').val() ;
	cliente.CPF_CNPJ= $('#cpfCnpjEdit').val() ; 
	cliente.Email= $('#emailEdit').val(); 
	cliente.Celular= $('#celularEdit').val();
	cliente.Fone= $('#foneEdit').val();
	cliente.Enderecos=includeAddressEdit();
	
		//alert(JSON.stringify(cliente));
	$.ajax({  
				 url: urlCliente+"?id="+$('#idClienteEdit').val(),  
				 type: 'PUT',  
				 dataType: 'json',  
				 data: cliente,  
				 success: function (data) { 
					 
					 $('#valSuccess').html("Cliente editado com sucesso!");
					 $('.success').css('display','block'); 
					 $('#EditModal').modal('hide');  
					 
					 List(); 
					 HideAlert(); 
				 },   
				 error: function (data) {   
					$('#valError').html(data);
					  $('#valError').html(data['responseJSON']["Message"]);  
					  $('.error').css('display','block'); 
					  $('#EditModal').modal('hide');  
					  List(); 
					  HideAlert(); 
				  }    
			 });  
		return false;
  });
	
	function includeAddressEdit(){
	var idAtual=0;
	var enderecos=[];
	var endereco=new Object();
	$.each($('.valoresEnderecosEdit :input[type="text"] , .valoresEnderecosEdit select'),function(){
			//alert(JSON.stringify($(this)));
			var attr = $(this).attr('name');
			if($(this).attr('name').indexOf("cepEdit")!=-1){
				endereco.CEP=$(this).val();
			}
			else if($(this).attr('name').indexOf("logradouroEdit")!=-1){
				endereco.Logradouro=$(this).val();
			}else if($(this).attr('name').indexOf("bairroEdit")!=-1){
				endereco.Bairro=$(this).val();
			}else if($(this).attr('name').indexOf("cidadeEdit")!=-1){
				endereco.Cidade=$(this).val();
			}else if($(this).attr('name').indexOf("numeroEdit")!=-1){
				endereco.Numero=$(this).val();
			}else if($(this).attr('name').indexOf("complementoEdit")!=-1){
				endereco.Complemento=$(this).val();
			}else{
				endereco.UF=$(this).val();
				 enderecos.push(endereco);
				 //alert(JSON.stringify(endereco));
				 endereco=new Object();
			}
	});
	return enderecos;

  }
	
	$('#formExcluir').submit(function(){
		
	$.ajax({  
				 url: urlCliente+"?id="+$('#idDeletar').val(),  
				 type: 'DELETE',  
				 dataType: 'json',  
				 success: function (data) {  
					 
					 $('#valSuccess').html("Cliente excluído com sucesso!");
					 $('.success').css('display','block');
					 $('#DeleteModal').modal('hide'); 
					 List();
					 HideAlert();
				 },  
				 error: function (data) {  
					 $('#valError').html(data['responseJSON']["Message"]); 
					 $('.error').css('display','block');
					 $('#DeleteModal').modal('hide'); 
					 List();
					 HideAlert();
				 }  
			 });  
		return false;
  });
	
   function List(){
	var max=maxIdAddress();
	while(max>1){
		$('#endereco'+max).remove();
		max--;
	}
	
	$('#nome').val("");  
	$('#dtNascimento').val("") ; 
	$('#oppTipoCliente').val("") ; 
	$('#cpfCnpj').val("") ; 
	$('#email').val(""); 
	$('#celular').val(""); 
	$('#fone').val(""); 
	$("#cep1").val("");
	$("#logradouro1").val("");
	$("#bairro1").val("");
	$("#complemento1").val("");
	$("#bairro1").val("");
	$("#cidade1").val("");
	$("#estado1").val("");
	$("#numero1").val("");
	$('#oppTipoCliente').change();
	
	$('#nomeEdit').val("");  
	$('#dtNascimentoEdit').val("") ; 
	$('#oppTipoClienteEdit').val("") ; 
	$('#cpfCnpjEdit').val("") ; 
	$('#emailEdit').val(""); 
	$('#celularEdit').val(""); 
	$('#foneEdit').val(""); 
	$("#cepEdit1").val("");
	$("#logradouroEdit1").val("");
	$("#bairroEdit1").val("");
	$("#complementoEdit1").val("");
	$("#bairroEdit1").val("");
	$("#cidadeEdit1").val("");
	$("#estadoEdit1").val("");
	$("#numeroEdit1").val("");
	
	$.ajax(
            {
                type: 'GET',
                url: urlCliente,
                dataType: 'json',
                crossDomain: true,
                async: false,
                success: function (data) {
					$('#corpoTabela').html("");
                    $.each(data,function(key,value){
					var dataquebrada=value["DtNascimento"].split('-');
					  $('#corpoTabela').append("<tr>"
					  +"<td>"+value['CPF_CNPJ']+"</td>"
					  +"<td>"+value['Nome']+"</td>"
					  +"<td>"+dataquebrada[2]+"/"+dataquebrada[1]+"/"+dataquebrada[0]+"</td>"
					  +"<td>"+value['Email']+"</td>"
					  +"<td>"+value['Celular']+"</td>"
					  +"<td>"+(value['TipoCliente']==1?'Pessoa Física':'Pessoa Jurídica')+"</td>"
					  +'<td><a onclick="editModal('+value["Id"]+');" style="color: white;" class="btn btn-info">Editar</a><br><br>'
					  +'<a style="color: white;"  onclick="deleteModal('+value["Id"]+',\''+value['Nome']+'\');"  class="btn btn-danger">Excluir</a></td>'
					  +"</tr>");	
					});
                }
            });
  
   }
	
	
   function HideAlert(){
		  setTimeout(function() {
			  $('.alertas').fadeOut('out');}, 4000);
	}
  

    $('#oppTipoCliente').change(function(){
    if($('#oppTipoCliente').val()!='') {
      if($('#oppTipoCliente').val()==1) {
        $('#cpfCnpjModal').html("CPF");
        $('#cpfCnpj').mask('000.000.000-00', {reverse: true});
      }else{
        $('#cpfCnpjModal').html("CNPJ");
        $('#cpfCnpj').mask('00.000.000/0000-00', {reverse: true});
      }
      $('#camposIncluiCliente').css('display', 'block');
    }else{
      $('#cpfCnpjModal').html("");
      $('#camposIncluiCliente').css('display', 'none');
    }
  });

    $('#oppTipoClienteEdit').change(function(){
      if($('#oppTipoClienteEdit').val()!='') {
        if($('#oppTipoClienteEdit').val()==1) {
          $('#cpfCnpjModalEdit').html("CPF");
          $('#cpfCnpjEdit').mask('000.000.000-00', {reverse: true});
        }else{
          $('#cpfCnpjModalEdit').html("CNPJ");
          $('#cpfCnpjEdit').mask('00.000.000/0000-00', {reverse: true});
        }
        $('#camposEditaCliente').css('display', 'block');
      }else{
        $('#cpfCnpjModalEdit').html("");
        $('#camposEditaCliente').css('display', 'none');
      }
    });


	
  function deleteModal(id, cpfCnpj){
    $('#deletar').html(cpfCnpj);
    $('#idDeletar').val(id);
	$('#DeleteModal').modal('show'); 
  }

  function editModal(id){	
    var tipo=0;  
	$.ajax( 
             { 
                 type: 'get', 
                 url: urlCliente+"?id="+id,
                 datatype: 'json', 
                 crossdomain: true,
                 async: false, 
                 success: function (data) {
					//alert(data["Enderecos"]);
					var max=1;
					var maxExistent=maxIdAddressEdit();
					for(var i=maxExistent;i>1; i--){
						$('#enderecoEdit'+i).remove();
					}
					$('.sliderEdit1').slideDown();
					$.each(data["Enderecos"],function(){
						
						//alert(JSON.stringify($(this)));	
						if(max>1){
							createAddressEdit();
						}
						$("#cepEdit"+max).val($(this)['0']['CEP']);
						$("#logradouroEdit"+max).val($(this)['0']['Logradouro']);
						$("#bairroEdit"+max).val($(this)['0']['Bairro']);
						$("#complementoEdit"+max).val($(this)['0']['Complemento']);
						$("#numeroEdit"+max).val($(this)['0']['Numero']);
						$("#cidadeEdit"+max).val($(this)['0']['Cidade']);
						$("#estadoEdit"+max).val($(this)['0']['UF']);
						max=max+1;
					});
					
					tipo=data["TipoCliente"];
				     var dataquebrada=data["DtNascimento"].split('-'); 
						 $('#cpfCnpjEdit').val(data["CPF_CNPJ"]); 
						 $('#nomeEdit').val(data["Nome"]);
						 var dataquebrada=data["DtNascimento"].split('-');
						 $('#dtNascimentoEdit').val(dataquebrada[0]+"-"+dataquebrada[1]+"-"+dataquebrada[2]); 
						 $('#emailEdit').val(data["Email"]); 
						 $('#foneEdit').val(data["Fone"]); 
						 $('#celularEdit').val(data["Celular"]); 
						 $('#oppTipoClienteEdit').val(data["TipoCliente"]);
						 $('#idClienteEdit').val(data["Id"]); 
						 $('#EditModal').modal('show'); 
						
                 } 
             }); 
	
    
     if(tipo==1){ 
       $('#cpfCnpjEdit').mask('000.000.000-00', {reverse: true});
       $('#cpfCnpjModalEdit').html("CPF"); 
    }else{ 
      $('#cpfCnpjModalEdit').html("CNPJ"); 
      $('#cpfCnpjEdit').mask('00.000.000/0000-00', {reverse: true}); 
    } 
  }
  
  $(".cep").focusout(function(){
			var id=$(this).attr("data-id");
			$.ajax({

				url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
				dataType: 'json',
				success: function(resposta){
					$("#logradouro"+id).val(resposta.logradouro);
					$("#bairro"+id).val(resposta.bairro);
					$("#complemento"+id).val(resposta.complemento);
					$("#bairro"+id).val(resposta.bairro);
					$("#cidade"+id).val(resposta.localidade);
					$("#estado"+id).val(resposta.uf.toLowerCase());
					$("#numero"+id).focus();
				}
			});
		});
	
	function objectLength(obj) {
	  var result = 0;
	  for(var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
		// or Object.prototype.hasOwnProperty.call(obj, prop)
		  result++;
		}
	  }
	  return result;
	}
	
	function maxIdAddress(){
	var max=0;
		$.each($('.cep'),function(){
			if($(this).attr('data-id')>max){
				max=$(this).attr('data-id');
			}	
		});
		
		return max;
	}
	function createAddress(){
		var max=maxIdAddress();
		
		max=parseInt(max)+1;
		$('.enderecos').append(
			'<div id="endereco'+max+'" class="valoresEnderecos">'
			+'<button type="button" id="button'+max+'" data-id="'+max+'" onclick="slider('+max+');" class="btn btn-sm">- Endereço Adicional</button>&nbsp;&nbsp;'
			+'<button type="button" id="buttonrm" data-id="'+max+'" onclick="removeAddress('+max+')" class="btn btn-sm btn-danger">Remover</button>'
				+'<br><br>'
				+'<$(this).val()set class="slider'+max+'">'
				+'<div class="form-group col-md-9">'
                +'<label for="cep'+max+'">CEP</label><br>'
                +'<input for="cep'+max+'"  type="text" id="cep'+max+'" data-id="'+max+'" class="form-control form-control-sm cep" name="cep'+max+'" placeholder="CEP" />'
				+'</div>'
              +'<div class="form-group col-md-9">'
                +'<label for="logradouro'+max+'">Logradouro</label><br>'
                +'<input for="logradouro'+max+'" type="text" id="logradouro'+max+'" data-id="'+max+'" class="form-control form-control-sm" name="logradouro'+max+'" placeholder="Logradouro" />'
              +'</div>'
			  
			  +'<div class="form-group col-md-9">'
                +'<label for="bairro'+max+'">Bairro</label><br>'
                +'<input for="bairro'+max+'" type="text" id="bairro'+max+'" data-id="'+max+'" class="form-control form-control-sm" name="bairro'+max+'" placeholder="Bairro" />'
              +'</div>'

              +'<div class="form-group col-md-9">'
                +'<label for="numero'+max+'">Número</label><br>'
                +'<input for="numero'+max+'" type="text" data-min="1" data-max="1000" data-id="'+max+'" id="numero'+max+'" class="form-control form-control-sm bfh-number" data-zeros="true" name="numero'+max+'" placeholder="Número" />'
              +'</div>'

              +'<div class="form-group col-md-9">'
               +' <label for="complemento'+max+'">Complemento</label><br>'
               +' <input for="complemento'+max+'" type="text" id="complemento'+max+'" data-id="'+max+'" class="form-control form-control-sm" name="complemento'+max+'" placeholder="Complemento" />'
              +'</div>'

              +'<div class="form-group col-md-9">'
                +'<label for="cidade'+max+'">Cidade</label><br>'
                +'<input for="cidade'+max+'" type="text" id="cidade'+max+'" data-id="'+max+'" class="form-control form-control-sm" name="cidade'+max+'" placeholder="Cidade" />'
              +'</div>'

              +'<div class="form-group col-md-9">'
                +'<label for="estado'+max+'">Estado</label><br>'
                +'<select class="form-control form-control-sm" data-id="'+max+'" name="estado'+max+'" id="estado'+max+'">'
                  +'<option value="estado">Selecione o Estado</option>'
                  +'<option value="ac">Acre</option>'
                  +'<option value="al">Alagoas</option>'
                  +'<option value="am">Amazonas</option>'
                  +'<option value="ap">Amapá</option>'
                  +'<option value="ba">Bahia</option>'
                  +'<option value="ce">Ceará</option>'
                  +'<option value="df">Distrito Federal</option>'
                  +'<option value="es">Espírito Santo</option>'
                  +'<option value="go">Goiás</option>'
                  +'<option value="ma">Maranhão</option>'
                  +'<option value="mt">Mato Grosso</option>'
                  +'<option value="ms">Mato Grosso do Sul</option>'
                  +'<option value="mg">Minas Gerais</option>'
                  +'<option value="pa">Pará</option>'
                  +'<option value="pb">Paraíba</option>'
                  +'<option value="pr">Paraná</option>'
                  +'<option value="pe">Pernambuco</option>'
                  +'<option value="pi">Piauí</option>'
                  +'<option value="rj">Rio de Janeiro</option>'
                  +'<option value="rn">Rio Grande do Norte</option>'
                  +'<option value="ro">Rondônia</option>'
                  +'<option value="rs">Rio Grande do Sul</option>'
                  +'<option value="rr">Roraima</option>'
                  +'<option value="sc">Santa Catarina</option>'
                  +'<option value="se">Sergipe</option>'
                  +'<option value="sp">São Paulo</option>'
                  +'<option value="to">Tocantins</option>'
                +'</select>'
              +'</div>'
			  +'</$(this).val()set>'
			  +'</div>'
		);
		masks();
		
		 $(".cep").focusout(function(){
			var id=$(this).attr("data-id");
			$.ajax({

				url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
				dataType: 'json',
				success: function(resposta){
					$("#logradouro"+id).val(resposta.logradouro);
					$("#bairro"+id).val(resposta.bairro);
					$("#complemento"+id).val(resposta.complemento);
					$("#bairro"+id).val(resposta.bairro);
					$("#cidade"+id).val(resposta.localidade);
					$("#estado"+id).val(resposta.uf.toLowerCase());
					$("#numero"+id).focus();
				}
			});
		});
	} 
	function maxIdAddressEdit(){
	var max=0;
		$.each($('.cepEdit'),function(){
			if($(this).attr('data-id')>max){
				max=$(this).attr('data-id');
			}	
		});
		
		return max;
	}
	
	function createAddressEdit(){
		var max=maxIdAddressEdit();
		
		max=parseInt(max)+1;
		$('.enderecosEdit').append(
			'<div id="enderecoEdit'+max+'" class="valoresEnderecosEdit">'
			+'<button type="button" id="buttonEdit'+max+'" data-id="'+max+'" onclick="sliderEdit('+max+');" class="btn btn-sm">- Endereço Adicional</button>&nbsp;&nbsp;'
			+'<button type="button" id="buttonrmEdit" data-id="'+max+'" onclick="removeAddressEdit('+max+')" class="btn btn-sm btn-danger">Remover</button>'
				+'<br><br>'
				+'<$(this).val()set class="sliderEdit'+max+'">'
				+'<div class="form-group col-md-9">'
                +'<label for="cepEdit'+max+'">CEP</label><br>'
                +'<input for="cepEdit'+max+'"  type="text" id="cepEdit'+max+'" data-id="'+max+'" class="form-control form-control-sm cepEdit" name="cepEdit'+max+'" placeholder="CEP" />'
				+'</div>'
              +'<div class="form-group col-md-9">'
                +'<label for="logradouroEdit'+max+'">Logradouro</label><br>'
                +'<input for="logradouroEdit'+max+'" type="text" id="logradouroEdit'+max+'" data-id="'+max+'" class="form-control form-control-sm" name="logradouroEdit'+max+'" placeholder="Logradouro" />'
              +'</div>'
			  
			  +'<div class="form-group col-md-9">'
                +'<label for="bairroEdit'+max+'">Bairro</label><br>'
                +'<input for="bairroEdit'+max+'" type="text" id="bairroEdit'+max+'" data-id="'+max+'" class="form-control form-control-sm" name="bairroEdit'+max+'" placeholder="Bairro" />'
              +'</div>'

              +'<div class="form-group col-md-9">'
                +'<label for="numeroEdit'+max+'">Número</label><br>'
                +'<input for="numeroEdit'+max+'" type="text" data-min="1" data-max="1000" data-id="'+max+'" id="numeroEdit'+max+'" class="form-control form-control-sm bfh-number" data-zeros="true" name="numeroEdit'+max+'" placeholder="Número" />'
              +'</div>'

              +'<div class="form-group col-md-9">'
               +' <label for="complementoEdit'+max+'">Complemento</label><br>'
               +' <input for="complementoEdit'+max+'" type="text" id="complementoEdit'+max+'" data-id="'+max+'" class="form-control form-control-sm" name="complementoEdit'+max+'" placeholder="Complemento" />'
              +'</div>'

              +'<div class="form-group col-md-9">'
                +'<label for="cidadeEdit'+max+'">Cidade</label><br>'
                +'<input for="cidadeEdit'+max+'" type="text" id="cidadeEdit'+max+'" data-id="'+max+'" class="form-control form-control-sm" name="cidadeEdit'+max+'" placeholder="Cidade" />'
              +'</div>'

              +'<div class="form-group col-md-9">'
                +'<label for="estadoEdit'+max+'">Estado</label><br>'
                +'<select class="form-control form-control-sm" data-id="'+max+'" name="estadoEdit'+max+'" id="estadoEdit'+max+'">'
                  +'<option value="estadoEdit">Selecione o Estado</option>'
                  +'<option value="ac">Acre</option>'
                  +'<option value="al">Alagoas</option>'
                  +'<option value="am">Amazonas</option>'
                  +'<option value="ap">Amapá</option>'
                  +'<option value="ba">Bahia</option>'
                  +'<option value="ce">Ceará</option>'
                  +'<option value="df">Distrito Federal</option>'
                  +'<option value="es">Espírito Santo</option>'
                  +'<option value="go">Goiás</option>'
                  +'<option value="ma">Maranhão</option>'
                  +'<option value="mt">Mato Grosso</option>'
                  +'<option value="ms">Mato Grosso do Sul</option>'
                  +'<option value="mg">Minas Gerais</option>'
                  +'<option value="pa">Pará</option>'
                  +'<option value="pb">Paraíba</option>'
                  +'<option value="pr">Paraná</option>'
                  +'<option value="pe">Pernambuco</option>'
                  +'<option value="pi">Piauí</option>'
                  +'<option value="rj">Rio de Janeiro</option>'
                  +'<option value="rn">Rio Grande do Norte</option>'
                  +'<option value="ro">Rondônia</option>'
                  +'<option value="rs">Rio Grande do Sul</option>'
                  +'<option value="rr">Roraima</option>'
                  +'<option value="sc">Santa Catarina</option>'
                  +'<option value="se">Sergipe</option>'
                  +'<option value="sp">São Paulo</option>'
                  +'<option value="to">Tocantins</option>'
                +'</select>'
              +'</div>'
			  +'</$(this).val()set>'
			  +'</div>'
		);
		masks();
		
		 $(".cepEdit").focusout(function(){
			var id=$(this).attr("data-id");
			$.ajax({

				url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
				dataType: 'json',
				success: function(resposta){
					$("#logradouroEdit"+id).val(resposta.logradouro);
					$("#bairroEdit"+id).val(resposta.bairro);
					$("#complementoEdit"+id).val(resposta.complemento);
					$("#bairroEdit"+id).val(resposta.bairro);
					$("#cidadeEdit"+id).val(resposta.localidade);
					$("#estadoEdit"+id).val(resposta.uf.toLowerCase());
					$("#numeroEdit"+id).focus();
				}
			});
		});
	} 
	
	$('.cpf_cnpj').blur(function(){
			var cpf_cnpj = $(this);
			
			if ( valida_cpf_cnpj( cpf_cnpj.val())==false ) {
				cpf_cnpj.val('');
				alert('CPF ou CNPJ inválido!');
			}
		});
	
	function removeAddress(id){
		$('#endereco'+id).remove();
	}
	
	function removeAddressEdit(id){
		$('#enderecoEdit'+id).remove();
	}
	
	$('.email').blur(function(){
		usuario = $(this).val().substring(0, $(this).val().indexOf("@"));
		dominio = $(this).val().substring($(this).val().indexOf("@")+ 1, $(this).val().length);
		 
		if ((usuario.length >=1) &&
			(dominio.length >=3) && 
			(usuario.search("@")==-1) && 
			(dominio.search("@")==-1) &&
			(usuario.search(" ")==-1) && 
			(dominio.search(" ")==-1) &&
			(dominio.search(".")!=-1) &&      
			(dominio.indexOf(".") >=1)&& 
			(dominio.lastIndexOf(".") < dominio.length - 1)) {
			return true;
		}
		else{
			$(this).val("");
			alert("E-mail inválido");
			return false;
		}
});