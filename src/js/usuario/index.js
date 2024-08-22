import { Dropdown } from "bootstrap";
import { Toast, validarFormulario } from "../funciones";
import Swal from "sweetalert2";
import DataTable from "datatables.net-bs5";
import { lenguaje } from "../lenguaje";

const formulario = document.getElementById('formUsuario');
const tabla = document.getElementById('tablaUsuario');
const btnGuardar = document.getElementById('btnGuardar');
const btnModificar = document.getElementById('btnModificar');
const btnCancelar = document.getElementById('btnCancelar');

let contador = 1;
const datatable = new DataTable('#tablaUsuario', {
    data: null,
    language: lenguaje,
    pageLength: '15',
    lengthMenu: [3, 9, 11, 25, 100],
    columns: [
        {
            title: 'No.',
            data: 'id',
            width: '2%',
            render: (data, type, row, meta) => {
                return meta.row + 1;
            }
        },
        {
            title: 'Nombre',
            data: 'usu_nombre'
        },
        {
            title: 'Catalogo',
            data: 'usu_catalogo'
        },
        {
            title: 'Acciones',
            data: 'usu_id',
            searchable: false,
            orderable: false,
            render: (data, type, row, meta) => {
                let html = `
                <button class='btn btn-warning modificar' data-id="${data}" data-nombre="${row.usu_nombre}" data-catalogo="${row.usu_catalogo}" data-password="${row.usu_password}"><i class='bi bi-pencil-square'></i>Modificar</button>
                <button class='btn btn-danger eliminar' data-id="${data}">Eliminar</button>
                `;
                return html;
            }
        }
    ]
});

btnModificar.parentElement.style.display = 'none';
btnModificar.disabled = true;
btnCancelar.parentElement.style.display = 'none';
btnCancelar.disabled = true;

const guardar = async (e) => {
    e.preventDefault();

    if (!validarFormulario(formulario, ['usu_id'])) {
        Swal.fire({
            title: "Campos vacios",
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
        if (codigo === 1) {
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
            method: 'GET'
        };

        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { codigo, mensaje, detalle, datos } = data;

        datatable.clear().draw();

        if (datos) {
            datatable.rows.add(datos).draw();
        }

    } catch (error) {
        console.log(error);
    }
};
buscar();

const traerDatos = (e) => {
    const elemento = e.currentTarget.dataset;

    formulario.usu_id.value = elemento.id || '';
    formulario.usu_nombre.value = elemento.usu_nombre || '';
    formulario.usu_catalogo.value = elemento.usu_catalogo || '';
    formulario.usu_password.value = elemento.usu_password || '';

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
            title: "Campos vacios",
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
        if (codigo === 1) {
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

const eliminar = async (usuario) => {
    const id = e.currentTarget.dataset.id;
    let confirmacion = await Swal.fire({
        icon: 'question',
        title: 'Confirmacion',
        text: '¿Está seguro que desea eliminar este registro?',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    });
    
    if (confirmacion.isConfirmed) {
        try {
            const body = new FormData();
            body.append('id', usuario.usu_id);
            const url = "/crud/API/usuario/eliminar";
            const config = {
                method: 'POST',
                body
            };

            const respuesta = await fetch(url, config);
            const data = await respuesta.json();
            const { codigo, mensaje, detalle } = data;
            let icon = 'info';
            if (codigo === 1) {
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
    }
};

formulario.addEventListener('submit', guardar);
btnCancelar.addEventListener('click', cancelar);
btnModificar.addEventListener('click', modificar);
datatable.on('click', '.modificar', traerDatos);
datatable.on('click', '.eliminar', eliminar);
