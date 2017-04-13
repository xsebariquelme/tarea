// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

document.addEventListener('deviceready', function(){
    $('#sub').bind('click', enviar);
}, false);


function enviar(){
    var user = $('#user').val();
    var pass = $('#pass').val();

    if(user.length > 0 && pass.length > 0){
      myApp.showPreloader('Iniciando sesión...');
      $.ajax({
          dataType: 'json',
          type: 'POST',
          data: {
              user: user,
              pass: pass
          },
          url: 'http://login-appmovilubb.rhcloud.com/',
          success: function (data, status, xhr) {
              if(data.resp === true){
                  localStorage.setItem('mail',user);
                  localStorage.setItem('nombre',data.data.nombre);
                  myApp.hidePreloader();
                  window.location = "main.html";
              }else{
                  myApp.hidePreloader();
                  myApp.alert('Datos Incorrectos','APP-TEST');
              }
          },
          error: function (xhr, status) {
              myApp.hidePreloader();
              myApp.alert('Datos Incorrectos','APP-TEST');
          }
      });
    }else{
      myApp.alert('Debe Ingresar los datos solicitados','APP-TEST');
    }
}
