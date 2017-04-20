// Initialize your app
var myApp = new Framework7();

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

document.addEventListener("deviceready", function(){
    $("#iniciar_sesion").bind("click",iniciar_session);
	$('#camara').bind('click', camara);
});

function camara(){
    navigator.camera.getPicture(function(photo){

		$('#yt').attr('src',photo);
		$('#yt1').attr('src',photo);
		

		
    }, function(error){
        myApp.alert('Error al tomar la fotografía','Error')
    }, {
        quality:80,
		saveToPhotoAlbum:true,
		correctOrientation:true,
		cameraDirection:0
    });
}


function iniciar_session(){
    var icon_name = '<i class="f7-icons" style="font-size:14px;">person</i>';
    var icon_mail = '<i class="f7-icons" style="font-size:14px;">email</i>';

    var correo  = $("#username").val();
    var pass    = $("#password").val();

    if(correo.trim().length > 0 && pass.trim().length > 0){
        myApp.showPreloader("Iniciando Sesión...");
        $.ajax({
            dataType: "json",
            type: "POST",
            data:{
                user: correo,
                pass: pass
            },
            url: "http://login-appmovilubb.rhcloud.com/",
            success: function(respuesta){
                if(respuesta.resp === true){
                    $("#nosesion").hide();
                    $("#sesion").show();
                    $("#name").html(icon_name +" "+ respuesta.data.nombre);
                    $("#mail").html(icon_mail +" "+ correo);
                    myApp.hidePreloader();
                    myApp.closeModal(".login-screen", true);
                }else{
                    myApp.hidePreloader();
                    myApp.alert("Error en los datos de sesión", "SmartAPP");
                }
            },
            error: function(){
                myApp.hidePreloader();
                myApp.alert("Error en la Conexión", "SmartAPP");
            }
        });
    }else{
        myApp.alert("No hay datos ingresados", "SmartAPP");
    }
}
