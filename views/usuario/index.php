<h1 class="text-center">Formulario de Usuarios</h1>
<div class="row justify-content-center mb-4">
    <form id="formUsuario" class="border shadow p-4 col-lg-4">
        <input type="hidden" name="usu_id" id="usu_id">
        <div class="row mb-3">
            <div class="col">
                <label for="usu_nombre">Nombre del Usuario</label>
                <input type="text" name="usu_nombre" id="usu_nombre" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <label for="usu_catalogo">Catálogo</label>
                <input type="number" name="usu_catalogo" id="usu_catalogo" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <label for="usu_password">Contraseña</label>
                <input type="password" name="usu_password" id="usu_password" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button type="submit" id="btnGuardar" class="btn btn-primary w-100">Guardar</button>
            </div>
            <div class="col">
                <button type="button" id="btnModificar" class="btn btn-warning w-100">Modificar</button>
            </div>
            <div class="col">
                <button type="button" id="btnCancelar" class="btn btn-danger w-100">Cancelar</button>
            </div>
        </div>
    </form>
</div>
<div class="row">
    <div class="col table-responsive">
        <table class="table table-bordered table-hover" id="tablaUsuario">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nombre</th>
                    <th>Catálogo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- Los datos se llenan dinámicamente -->
            </tbody>
        </table>
    </div>
</div>
<script src="<?= asset('./build/js/usuario/index.js') ?>"></script>
