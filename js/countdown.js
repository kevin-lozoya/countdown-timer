// Configuración del calendario
Calendar.setup({
    //id de input text
    inputField: "fecha",
    // formato de la fecha
    ifFormat: "%d-%m-%Y",
    // id del boton (en este caso una imagen)
    button: "selector",
    // Quitamos el número de semana
    weekNumbers: false
});

// Cogemos los elementos que vamos a utilizar
var fecha = document.getElementById("fecha");
var dia = document.getElementById("dia");
var mes = document.getElementById("mes");
var ano = document.getElementById("ano");
var hora = document.getElementById("hora");
var min = document.getElementById("minuto");
var sec = document.getElementById("segundo");
var boton = document.getElementById("boton");

// Colocamos la fecha en sus respectivos input
function ponerFecha(){
    // Separamos los valores en un array y los colocamos en los inputs
    var valor = fecha.value;
    valor = valor.split("-");
    dia.value = valor[0];
    mes.value = valor[1];
    ano.value = valor[2];
}

// Permitimos que se cree el formulario si se apreta Enter en algún campo
var form = document.formulario.elements;
for (var i in form) {
    if (form[i].type == "text" ) {
        form[i].onkeyup = function(e){
            var tecla = e.charCode || e.keyCode;
            if (tecla == 13)
                crearCountdown();
        }
    }
}

// -----COUNTDOWN------
boton.onclick = crearCountdown;
var countdown, alerta;

function crearCountdown(){
    if (validarCampos()){ 
        fechaFinal = new Date(ano.value, mes.value-1, dia.value, hora.value, min.value, sec.value).getTime();
        if (alerta != null){
            clearInterval(alerta);
            document.getElementById("mensaje").innerHTML = "";
        }
        if (countdown != null)
            clearInterval(countdown);
        countdown = window.setInterval("empezarCountdown()", 1000);
    }
    
}

// Validar los campos
function validarCampos(){
    var txtDia = dia.value;
    var txtMes = mes.value;
    var txtAno = ano.value;
    var txtHora = hora.value;
    var txtMin = min.value;
    var txtSec = sec.value;
    var date = new Date();
    date.setDate(date.getDate()+1);
    // Comprobar que existe el element, que no esté vacío, que sea un número y que no sean espacios.
    // Si los campos Dia, Mes y Año están vacíos, daremos por hecho que es hoy.
    if (txtDia == null || txtDia.length == 0 || /^\s+$/.test(txtDia) ) {
        dia.value = date.getDate();
    } else if ( isNaN(txtDia) ){
        dia.style.boxShadow = "0 0 2px red";
        return false;
    }
    else
        dia.style.boxShadow = "";

    if (txtMes == null || txtMes.length == 0 || /^\s+$/.test(txtMes) ){
        mes.value = date.getMonth()+1;
    }
    else if( isNaN(txtMes) || txtMes < 1 || txtMes > 12 ){
        mes.style.boxShadow = "0 0 2px red";
        return false;
    }
    else
        mes.style.boxShadow = "";

    if (txtAno == null || txtAno.length == 0 || /^\s+$/.test(txtAno) ){
        ano.value = date.getFullYear();
    } else if ( isNaN(txtAno) || txtAno < 1970 ){
        ano.style.boxShadow = "0 0 2px red";
        return false;
    }
    else
        ano.style.boxShadow = "";
        // Comprobamos que el día introducido es válido para el mes y año marcado
        if (!comprobarDiaMes(txtDia, txtMes, txtAno)){
            dia.style.boxShadow = "0 0 2px red";
            return false;
        }
    if (txtHora == null || txtHora.length == 0 || /^\s+$/.test(txtHora) ){
        hora.value = "00";
    } else if ( isNaN(txtHora) || txtHora < 0 || txtHora > 23 ){
        hora.style.boxShadow = "0 0 2px red";
        return false;
    }
    else
        hora.style.boxShadow = "";

    if (txtMin == null || txtMin.length == 0 || /^\s+$/.test(txtMin) ){
        min.value = "00";
    } else if ( isNaN(txtMin) || txtMin < 0 || txtMin > 59){
        min.style.boxShadow = "0 0 2px red";
        return false;
    }
    else
        min.style.boxShadow = "";

    if (txtSec == null || txtSec.length == 0 || /^\s+$/.test(txtSec) ){
        sec.value = "00";
    } else if( isNaN(txtSec) || txtSec < 0 || txtSec > 59 ){
        sec.style.boxShadow = "0 0 2px red";
        return false;
    }
    else
        sec.style.boxShadow = "";

    //Si todo es correcto, se creará el Countdown
    return true;
    
}

function comprobarDiaMes(dia, mes, ano){
    var ultimoDia = new Date(ano, mes, 0);
    if (dia<= ultimoDia.getDate())
        return true;
    else 
        return false;
}
// Comenzar el countdown según los datos
function empezarCountdown(){
    fechaActual = new Date().getTime();
    var dif = Math.abs(fechaFinal-fechaActual);
    var dias = parseInt( dif/(1000*60*60*24) );
    dif -= dias*(1000*60*60*24);
    var horas = parseInt( dif/(1000*60*60) );
    dif -= horas*(1000*60*60);
    var mins = parseInt( dif/(1000*60) );
    dif -= mins*(1000*60);
    var secs = parseInt( dif/(1000) );
    dif -= parseInt(secs)*(1000);

    //Colocamos los números en su sitio
    document.getElementById("cd-dias").innerHTML = dias;
    document.getElementById("cd-horas").innerHTML = horas;
    document.getElementById("cd-min").innerHTML = mins;
    document.getElementById("cd-sec").innerHTML = secs;

    if (dias == 0 && horas == 0 && mins == 0 && secs == 0){
        clearInterval(countdown);
        document.getElementById("mensaje").innerHTML = "TIEMPO ACABADO";
        activarSonidoAlarma();
        alerta = setInterval("mensajeAlerta()", 500);
    }
}

// Cambia el color del mensaje entre Rojo y Negro cada 500 milisecs
function mensajeAlerta(){
    var mensaje = document.getElementById("mensaje");
    if(mensaje.style.color != "red")
        mensaje.style.color = "red";
    else
        mensaje.style.color = "";    
}

function activarSonidoAlarma(){
    // Creamos el elemento audio
    var audioElement = document.createElement("audio");

    // indicamos el archivo de audio a cargar
    audioElement.setAttribute("src", "song/alarm.mp3");

    // indicamos que una vez cargado, empiece a sonar
    audioElement.setAttribute("autoplay", "autoplay");

}

window.onkeypress = function(e){
    console.log(e);
}

