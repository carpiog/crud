import { Dropdown } from "bootstrap";
import { Toast, validarFormulario } from "../funciones";
import Swal from "sweetalert2";

const formulario = document.getElementById('formUsuario');
const tabla = document.getElementById('tablaUsuario');
const btnGuardar = document.getElementById('btnGuardar');
const btnModificar = document.getElementById('btnModificar');
const btnCancelar = document.getElementById('btnCancelar');

btnModificar.parentElement.style.display = 'none';
btnModificar.disabled = true;
btnCancelar.parentElement.style.display = 'none';
btnCancelar.disabled = true;

const guardar = async (e) => {
    e.preventDefault();

    if (!validarFormulario(formulario, ['usu_id'])) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Debe llenar todos los campos",
            icon: "info"
        });
        return;
    }

    try {
        const body = new FormData(formulario);
        const url = "/crud/API/usuario/guardar";
        const config = {
            method: 'POST',
            body
        };

        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { codigo, mensaje, detalle } = data;
        let icon = 'info';
        if (codigo == 1) {
            icon = 'success';
            formulario.reset();
            buscar();
        } else {
            icon = 'error';
            console.log(detalle);
        }

        Toast.fire({
            icon: icon,
            title: mensaje
        });

    } catch (error) {
        console.log(error);
    }
};

const buscar = async () => {
    try {
        const url = "/crud/API/usuario/buscar";
        const config = {
            method: 'GET',
        };

        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { codigo, mensaje, detalle, datos } = data;
        tabla.tBodies[0].innerHTML = '';
        const fragment = document.createDocumentFragment();
        if (codigo == 1) {
            let counter = 1;
            datos.forEach(usuario => {
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                const td3 = document.createElement('td');
                const td4 = document.createElement('td');
                const buttonModificar = document.createElement('button');
                const buttonEliminar = document.createElement('button');

                td1.innerText = counter;
                td2.innerText = usuario.usu_nombre;
                td3.innerText = usuario.usu_catalogo;
                td4.innerHTML = `
                    <button class="btn btn-warning" onclick="traerDatos(${usuario.usu_id})">Modificar</button>
                    <button class="btn btn-danger" onclick="eliminar(${usuario.usu_id})">Eliminar</button>
                `;
                
                counter++;

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                fragment.appendChild(tr);
            });
        } else {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.innerText = "No hay usuarios";
            td.colSpan = 4;

            tr.appendChild(td);
            fragment.appendChild(tr);
        }

        tabla.tBodies[0].appendChild(fragment);

    } catch (error) {
        console.log(error);
    }
};
buscar();

const traerDatos = (usuario) => {
    formulario.usu_id.value = usuario.usu_id;
    formulario.usu_nombre.value = usuario.usu_nombre;
    formulario.usu_catalogo.value = usuario.usu_catalogo;
    formulario.usu_password.value = ''; // Deja el campo de contraseña vacío para editar
    tabla.parentElement.parentElement.style.display = 'none';

    btnGuardar.parentElement.style.display = 'none';
    btnGuardar.disabled = true;
    btnModificar.parentElement.style.display = '';
    btnModificar.disabled = false;
    btnCancelar.parentElement.style.display = '';
    btnCancelar.disabled = false;
};

const cancelar = () => {
    tabla.parentElement.parentElement.style.display = '';
    formulario.reset();
    btnGuardar.parentElement.style.display = '';
    btnGuardar.disabled = false;
    btnModificar.parentElement.style.display = 'none';
    btnModificar.disabled = true;
    btnCancelar.parentElement.style.display = 'none';
    btnCancelar.disabled = true;
};

const modificar = async (e) => {
    e.preventDefault();

    if (!validarFormulario(formulario)) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Debe llenar todos los campos",
            icon: "info"
        });
        return;
    }

    try {
        const body = new FormData(formulario);
        const url = "/crud/API/usuario/modificar";

        const config = {
            method: 'POST',
            body
        };

        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { codigo, mensaje, detalle } = data;
        let icon = 'info';
        if (codigo == 1) {
            icon = 'success';
            formulario.reset();
            buscar();
            cancelar();
        } else {
            icon = 'error';
            console.log(detalle);
        }

        Toast.fire({
            icon: icon,
            title: mensaje
        });

    } catch (error) {
        console.log(error);
    }
};

const eliminar = async (usu_id) => {
    let confirmacion = await Swal.fire({
        icon: 'question',
        title: 'Confirmación',
        text: '¿Está seguro que desea eliminar este registro?',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    });

    if (confirmacion.isConfirmed) {
        try {
            const body = new FormData();
            body.append('usu_id', usu_id);

            const url = "/crud/API/usuario/eliminar";
            const config = {
                method: 'POST',
                body
            };

            const respuesta = await fetch(url, config);
            const data = await respuesta.json();
            const { codigo, mensaje, detalle } = data;
            let icon = 'info';
            if (codigo == 1) {
                icon = 'success';
                buscar();
            } else {
                icon = 'error';
                console.log(detalle);
            }

            Toast.fire({
                icon: icon,
                title: mensaje
            });

        } catch (error) {
            console.log(error);
        }
    }
};

btnGuardar.addEventListener('click', guardar);
btnModificar.addEventListener('click', modificar);
btnCancelar.addEventListener('click', cancelar);
