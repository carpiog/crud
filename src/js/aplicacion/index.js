import { Dropdown } from "bootstrap";
import { Toast, validarFormulario } from "../funciones";
import Swal from "sweetalert2";
import DataTable from "datatables.net-bs5";
import { lenguaje } from "../lenguaje";


const formulario = document.getElementById('formAplicacion')
const tabla = document.getElementById('tablaAplicacion')
const btnGuardar = document.getElementById('btnGuardar')
const btnModificar = document.getElementById('btnModificar')
const btnCancelar = document.getElementById('btnCancelar')

let contador = 1;
const datatable = new DataTable('#tablaAplicacion', {
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
                // console.log(meta.ro);
                return meta.row + 1;
            }
        },
        {
            title: 'Nombre',
            data: 'app_nombre'
        },
        {
            title: 'Acciones',
            data: 'app_id',
            searchable: false,
            orderable: false,
            render: (data, type, row, meta) => {
                let html = `
                <button class='btn btn-warning modificar' data-id="${data}" data-nombre="${row.app_nombre}"><i class='bi bi-pencil-square'></i>Modificar</button>
                <button class='btn btn-danger eliminar' data-id="${data}">Eliminar</button>
                `
                return html;
            }
        },

    ]
})

btnModificar.parentElement.style.display = 'none'
btnModificar.disabled = true
btnCancelar.parentElement.style.display = 'none'
btnCancelar.disabled = true

const guardar = async (e) => {
    e.preventDefault()

    if (!validarFormulario(formulario, ['app_id'])) {
        Swal.fire({
            title: "Campos vacios",
            text: "Debe llenar todos los campos",
            icon: "info"
        })
        return
    }

    try {
        const body = new FormData(formulario)
        const url = "/crud/API/aplicacion/guardar"
        const config = {
            method: 'POST',
            body
        }

        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { codigo, mensaje, detalle } = data;
        let icon = 'info'
        if (codigo == 1) {
            icon = 'success'
            formulario.reset();
            buscar();
        } else {
            icon = 'error'
            console.log(detalle);
        }

        Toast.fire({
            icon: icon,
            title: mensaje
        })

    } catch (error) {
        console.log(error);
    }
}


const buscar = async () => {
    try {
        const url = "/crud/API/aplicacion/buscar"
        const config = {
            method: 'GET',
        }

        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { codigo, mensaje, detalle, datos } = data;

        // tabla.tBodies[0].innerHTML = ''
        // const fragment = document.createDocumentFragment();
        console.log(datos);
        datatable.clear().draw();

        if (datos) {
            datatable.rows.add(datos).draw();
        }
        // if (codigo == 1) {
        //     let counter = 1;
        //     datos.forEach(aplicacion => {
        //         const tr = document.createElement('tr');
        //         const td1 = document.createElement('td');
        //         const td2 = document.createElement('td');
        //         const td3 = document.createElement('td');
        //         const td4 = document.createElement('td');
        //         const buttonModificar = document.createElement('button');
        //         const buttonEliminar = document.createElement('button');
        //         td1.innerText = counter
        //         td2.innerText = aplicacion.nombre
        //         td3.innerText = aplicacion.precio

        //         buttonModificar.classList.add('btn', 'btn-warning')
        //         buttonEliminar.classList.add('btn', 'btn-danger')
        //         buttonModificar.innerText = 'Modificar'
        //         buttonEliminar.innerText = 'Eliminar'

        //         buttonModificar.addEventListener('click', () => traerDatos(aplicacion))
        //         buttonEliminar.addEventListener('click', () => eliminar(aplicacion))

        //         td4.appendChild(buttonModificar)
        //         td4.appendChild(buttonEliminar)

        //         counter++

        //         tr.appendChild(td1)
        //         tr.appendChild(td2)
        //         tr.appendChild(td3)
        //         tr.appendChild(td4)
        //         fragment.appendChild(tr)
        //     })
        // } else {
        //     const tr = document.createElement('tr');
        //     const td = document.createElement('td');
        //     td.innerText = "No hay aplicacions"
        //     td.colSpan = 4

        //     tr.appendChild(td)
        //     fragment.appendChild(tr)
        // }

        // tabla.tBodies[0].appendChild(fragment)

    } catch (error) {
        console.log(error);
    }
}
buscar();

const traerDatos = (e) => {
    const elemento = e.currentTarget.dataset

    formulario.app_id.value = elemento.id
    formulario.app_nombre.value = elemento.app_nombre
    tabla.parentElement.parentElement.style.display = 'none'

    btnGuardar.parentElement.style.display = 'none'
    btnGuardar.disabled = true
    btnModificar.parentElement.style.display = ''
    btnModificar.disabled = false
    btnCancelar.parentElement.style.display = ''
    btnCancelar.disabled = false
}

const cancelar = () => {
    tabla.parentElement.parentElement.style.display = ''
    formulario.reset();
    btnGuardar.parentElement.style.display = ''
    btnGuardar.disabled = false
    btnModificar.parentElement.style.display = 'none'
    btnModificar.disabled = true
    btnCancelar.parentElement.style.display = 'none'
    btnCancelar.disabled = true
}

const modificar = async (e) => {
    e.preventDefault()

    if (!validarFormulario(formulario)) {
        Swal.fire({
            title: "Campos vacios",
            text: "Debe llenar todos los campos",
            icon: "info"
        })
        return
    }

    try {
        const body = new FormData(formulario)
        const url = "/crud/API/aplicacion/modificar"
        const config = {
            method: 'POST',
            body
        }

        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { codigo, mensaje, detalle } = data;
        console.log(data);
        let icon = 'info'
        if (codigo == 1) {
            icon = 'success'
            formulario.reset();
            buscar();
            cancelar();
        } else {
            icon = 'error'
            console.log(detalle);
        }

        Toast.fire({
            icon: icon,
            title: mensaje
        })

    } catch (error) {
        console.log(error);
    }
}

const eliminar = async (e) => {
    const id = e.currentTarget.dataset.id
    let confirmacion = await Swal.fire({
        icon: 'question',
        title: 'Confirmacion',
        text: '¿Esta seguro que desea eliminar este registro?',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        // input: 'text'
    })
    console.log(confirmacion);
    if (confirmacion.isConfirmed) {
        try {
            const body = new FormData()
            body.append('app_id', id)
            const url = "/crud/API/aplicacion/eliminar"
            const config = {
                method: 'POST',
                body
            }

            const respuesta = await fetch(url, config);
            const data = await respuesta.json();
            const { codigo, mensaje, detalle } = data;
            let icon = 'info'
            if (codigo == 1) {
                icon = 'success'
                formulario.reset();
                buscar();
            } else {
                icon = 'error'
                console.log(detalle);
            }

            Toast.fire({
                icon: icon,
                title: mensaje
            })
        } catch (error) {
            console.log(error);
        }
    }

}

formulario.addEventListener('submit', guardar)
btnCancelar.addEventListener('click', cancelar)
btnModificar.addEventListener('click', modificar)
datatable.on('click', '.modificar', traerDatos)
datatable.on('click', '.eliminar', eliminar)