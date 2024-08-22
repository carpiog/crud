<h1 class="text-center">INICIO DE SESION</h1>
<div class="row justify-content-center">
    <form class="col-lg-4 border rounded shadow p-3">
        <div class="row mb-3">
            <div class="col">
                <label for="usu_catalogo">Catálogo del usuario</label>
                <input type="number" name="usu_catalogo" id="usu_catalogo" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <label for="usu_password">Password</label>
                <input type="password" name="usu_password" id="usu_password" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button type="submit" class="btn btn-primary w-100">
                    LOGIN
                </button>
            </div>
        </div>
    </form>
    <div class="mt-3">
        <p class="mb-0 text-center">¿No tiene una cuenta?<a href="/crud/registro" class="text-primary fw-bold ms-2">Registrarse</a></p>
    </div>

</div>
<script src="<?= asset('./build/js/auth/login.js') ?>"></script>