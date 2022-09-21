let SucesosHistoricos = [];

//MOSTRAR ALERTAS
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
}

//VALIDARMOS LOS DATE
var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("FechaInicio").setAttribute("max", today);
    document.getElementById("FechaFin").setAttribute("max", today);

//CRAEMOS EL OBJETO
const objSucesos = {
    id: '',
    tituloEvento: '',
    descripcionEvento: '',
    fechaIncio: '',
    fechaFin: ''
}

//INICAMOS LA VARIABLE 
let editando = false;

//CREAMOS CONSTANTES PARA EL FORMULARIO

const formulario = document.querySelector('#frmValores');
const tituloInput = document.querySelector('#TituloEvento');
const descripcionInput = document.querySelector('#DescripcionEvento');
const fechaIncioInput = document.querySelector('#FechaInicio');
const FechaFinInput = document.querySelector('#FechaFin');
const btnAgregar = document.querySelector('#boton');

//INDICAMOS EL EVENTO
formulario.addEventListener('submit', validarFormulario);


//CREAMOS LA FUNCION

function validarFormulario(e) {
    e.preventDefault();

    //validamos
    if (tituloInput.value === '' || descripcionInput === '') {
        showAlert('Todos los campos son obligatorios', "danger");
        return;
    }
    if (editando) {
        editarSuceso();
        editando = false;
    } else {
        objSucesos.id = Date.now();
        objSucesos.tituloEvento = tituloInput.value;
        objSucesos.descripcionEvento = descripcionInput.value;
        objSucesos.fechaIncio = fechaIncioInput.value;
        objSucesos.fechaFin = FechaFinInput.value;

        agregarSuceso();
    }

}

//FUNCION PARA AGREGAR SUCESOS
function agregarSuceso() {
    SucesosHistoricos.push({ ...objSucesos });

    mostrarSucesos();
    formulario.reset();
    limpiarObjeto();
}

//FUNCION PARA LIMPIAR INPUTS
function limpiarObjeto() {
    objSucesos.id = '';
    objSucesos.tituloEvento = '';
    objSucesos.descripcionEvento = '';
    objSucesos.fechaIncio = '';
    objSucesos.fechaFin = '';


}

//FUNCION PARA MOSTRAR SUCESOS
function mostrarSucesos() {
    limpiarHTML();
    //INIDICAMOS ADONDE AGREGARA LOS ELEMENTOS
    const divsucesos = document.querySelector('.timeline-area');
    //RECORREMOS EL ARREGLO
    SucesosHistoricos.forEach(sucesos => {
        //DESESTRUCTURAMOS LOS ELEMENTOS
        const { id, tituloEvento, descripcionEvento, fechaIncio, fechaFin } = sucesos;
        //CREAMOS EL DIV
        const contenido = document.createElement('div');

        //MOSTRAMOS LOS DATOS DEL ARREGLO
        contenido.innerHTML =
            `
        <h4>${fechaIncio}</h4>
        <h4>${tituloEvento}</h4>
        
        <p>${descripcionEvento}</p>
        
        <h4>${fechaFin}</h4>
        
        
        `;
        contenido.dataset.id = id;

        const editarBoton = document.createElement('button');
        //NOS MUESTRA LOS DATOS EN EL FORM
        editarBoton.onclick = () => cargarSuceso(sucesos);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-warning');
        contenido.append(editarBoton);

        const BorrarBoton = document.createElement('button');
        BorrarBoton.onclick = () => eliminarSuceso(id);
        BorrarBoton.textContent = 'Borrar';
        BorrarBoton.classList.add('btn', 'btn-danger');
        contenido.append(BorrarBoton);



        divsucesos.appendChild(contenido);
        showAlert("Dato historico añadido", "success");


    });
}

//FUNCION PARA CARGAR SUCESOS

function cargarSuceso(sucesos) {
    const { id, tituloEvento, descripcionEvento, fechaIncio, fechaFin } = sucesos;
    tituloInput.value = tituloEvento;
    descripcionInput.value = descripcionEvento;
    fechaIncioInput.value = fechaIncio;
    FechaFinInput.value = fechaFin;

    objSucesos.id = id;
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;

}

//FUNCION PARA EDITAR SUCESO
function editarSuceso() {
    objSucesos.tituloEvento = tituloInput.value;
    objSucesos.descripcionEvento = descripcionInput.value;
    objSucesos.fechaIncio = fechaIncioInput.value;
    objSucesos.fechaFin = FechaFinInput.value;

    SucesosHistoricos.map(sucesos => {
        if (sucesos.id === objSucesos.id) {
            sucesos.id = objSucesos.id;
            sucesos.tituloEvento = objSucesos.tituloEvento;
            sucesos.descripcionEvento = objSucesos.descripcionEvento;
            sucesos.fechaIncio = objSucesos.fechaIncio;
            sucesos.fechaFin = objSucesos.fechaFin;
        }

    });
    limpiarHTML();
    mostrarSucesos();
    formulario.reset();
    formulario.querySelector('button[type=submit]').textContent = 'Agregar ';
    editando = false;
}

//FUNCION PARA ELIMINAR SUCESO
function eliminarSuceso(id) {
    //Filtramos los elementos
    SucesosHistoricos = SucesosHistoricos.filter(sucesos => sucesos.id !== id);
    limpiarHTML();
    mostrarSucesos();
    showAlert("Suceso historico eliminado", "danger");
}


//FUNCION PARA LIMPIAR EL DIV
function limpiarHTML() {
    const divsucesos = document.querySelector('.timeline-area')
    while (divsucesos.firstChild) {
        divsucesos.removeChild(divsucesos.firstChild);

    }
}

    
   


