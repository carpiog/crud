<h1 class="text-center">Formulario de Roles</h1>
<div class="row justify-content-center mb-4">
    <form id="formRol" class="border shadow p-4 col-lg-4">
        <input type="hidden" name="rol_id" id="rol_id">
        <div class="row mb-3">
            <div class="col">
                <label for="rol_nombre">Nombre del Rol</label>
                <input type="text" name="rol_nombre" id="rol_nombre" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <label for="rol_nombre_ct">Nombre Corto</label>
                <input type="text" name="rol_nombre_ct" id="rol_nombre_ct" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <label for="rol_app">Aplicación</label>
                <select name="rol_app" id="rol_app" class="form-select">
                    <?php foreach($aplicaciones as $aplicacion): ?>
                        <option value="<?= $aplicacion->app_nombre; ?>"></option>
                    <?php endforeach; ?>
                </select>
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
        <table class="table table-bordered table-hover" id="tablaRol">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nombre</th>
                    <th>Nombre Corto</th>
                    <th>Aplicación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- Los datos se llenan dinámicamente -->
            </tbody>
        </table>
    </div>
</div>
<script src="<?= asset('./build/js/rol/index.js') ?>"></script>
