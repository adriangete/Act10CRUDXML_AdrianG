var datos = new Array();

var parques = new Object();

var posicion = 0;
var cont = 0;
var Nombre;
var Latitud;
var Longitud;
var Calle;
var Aforo;

// Escuchamos todos los botones para hacerles funcionar
bSiguiente.addEventListener("click", registroSiguiente, false);
bAnterior.addEventListener("click", registroAnterior, false);
bModificar.addEventListener("click", modificarRegistro, false);
bBorrar.addEventListener("click", borrarRegistro, false);
bGrabar.addEventListener("click",grabar,false);
bTabla.addEventListener("click",tabla,false);

// Creamos datosParque para pasar los datos de un lado a otro
function datosParque(Nombre, Latitud, Longitud, Calle, Aforo){
    this.Nombre = Nombre;
    this.Latitud = Latitud;
    this.Longitud = Longitud;
    this.Calle = Calle;
    this.Aforo = Aforo;

    this.guarda = guardadatos;
}

// Guardamos los datos en el array datos
function guardadatos(){
    datos[cont] = this;
    cont+=1;
    posicion = cont;
}

function escribirDatos(){
    var datos2 = new datosParque();
    datos2 = datos[c];
    console.log(datos2.Aforo);
    document.write("<tr><td>"+datos2.Nombre+"<tr><td>"+datos2.Latitud+"<tr><td>"+datos2.Longitud+"<tr><td>"+datos2.Calle+"<tr><td>"+datos2.Aforo);
}

function imprimir(){
    document.write("<h1>Listado de los parques</h1><table border='1'");
    for (c=0;c<cont;c++){
        escribirDatos(c);
    }
    document.write("</table>");
}

cargarXml();
function cargarXml(){
    // En esta funcion leemos los datos del fichero datos.js en formato xml y lo
    // transformamos en una coleccion de arrays
    var codigo = new DOMParser();
    var myXml = codigo.parseFromString(datosFichero, "text/xml");

    var auxNombre = new Array();
    var auxLatitud = new Array();
    var auxLongitud = new Array();
    var auxCalle = new Array();
    var auxAforo = new Array();

    // getElementsByTagName coge lo que hay dentro de las etiquetas de un xml
    auxNombre = myXml.getElementsByTagName("nombre");
    auxLatitud = myXml.getElementsByTagName("latitud");
    auxLongitud = myXml.getElementsByTagName("longitud");
    auxCalle = myXml.getElementsByTagName("calle");
    auxAforo = myXml.getElementsByTagName("aforo");

    for (var i = 0; i < auxNombre.length; i++) {
        p = new datosParque(auxNombre.item(i).firstChild.nodeValue, auxLatitud.item(i).firstChild.nodeValue, auxLongitud.item(i).firstChild.nodeValue, auxCalle.item(i).firstChild.nodeValue, auxAforo.item(i).firstChild.nodeValue);
        //console.log(auxAforo.item(i).firstChild.nodeValue);
        //console.log(p.Aforo);
        datos[i] = p;
        //console.log(datos[i].Aforo);

    }
    c = i;
    cont = c;

    mostrarRegistro();
}

// Cuando la posición llegue a la longitud del array deja de sumarse
function registroSiguiente(){
    if (posicion<datos.length-1){
        posicion++;
    }
    mostrarRegistro();
}

// Cuando la posición sea igual a 0 dejará de restarse
function registroAnterior(){
    if (posicion>0){
        posicion--;
    }
    mostrarRegistro();
}
function mostrarRegistro(){
    parques = new datosParque();
    parques = datos[posicion];
    if (parques==undefined){
        return;
    }
    // Utilizamos firstChild para sacar el valor de dentro de las etiquetas, es
    // decir, el hijo. Visualizamos un registro con la posicion
    document.getElementById("Nombre").value=parques.Nombre;
    document.getElementById("Latitud").value=parques.Latitud;
    document.getElementById("Longitud").value=parques.Longitud;
    document.getElementById("Calle").value=parques.Calle;
    document.getElementById("Aforo").value=parques.Aforo;
}

function modificarRegistro(){
    var Nombre2 = document.getElementById("Nombre").value;
    var Latitud2 = document.getElementById("Latitud").value;
    var Longitud2 = document.getElementById("Longitud").value;
    var Calle2 = document.getElementById("Calle").value;
    var Aforo2 = document.getElementById("Aforo").value;

    parque = new datosParque(Nombre2, Latitud2, Longitud2, Calle2, Aforo2);
    datos[posicion]=parque;
}

function borrarRegistro(){
    datos.splice(posicion,1);
    cont--;
    posicion=0;
    mostrarRegistro();
}

function grabar(){

    var Nombre2 = document.getElementById("Nombre").value;
    var Latitud2 = document.getElementById("Latitud").value;
    var Longitud2 = document.getElementById("Longitud").value;
    var Calle2 = document.getElementById("Calle").value;
    var Aforo2 = document.getElementById("Aforo").value;

    parque = new datosParque(Nombre2, Latitud2, Longitud2, Calle2, Aforo2);
    parque.guarda();
}

function tabla(){
    var tabla='<tr><td>Nombre</td>'+
    '<td>Latitud</td>'+
    '<td>Longitud</td>'+
    '<td>Calle</td>'+
    '<td>Aforo</td>'+
    '</tr>'
    for (var i=0;i<cont;i++){
        var datos3 = new datosParque();
        datos3 = datos[i];
        tabla=tabla+"<tr><td>"+datos3.Nombre+"</td>"+
        "<td>"+datos3.Latitud+"</td>"+
        "<td>"+datos3.Longitud+"</td>"+
        "<td>"+datos3.Calle+"</td>"+
        "<td>"+datos3.Aforo+"</td></tr>";
        
    }
    document.getElementById("tabla").innerHTML=tabla;
}