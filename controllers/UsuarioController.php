<?php

namespace Controllers;

use Exception;
use Model\Usuario;
use MVC\Router;

class UsuarioController
{
    public static function index(Router $router)
    {
        $usuarios = Usuario::find(2);
        $router->render('usuario/index', [
            'usuarios' => $usuarios
        ]);
    }

    public static function guardarAPI()
    {
        $_POST['usu_nombre'] = htmlspecialchars($_POST['usu_nombre']);
        $_POST['usu_catalogo'] = filter_var($_POST['usu_catalogo'], FILTER_SANITIZE_NUMBER_INT);
        $_POST['usu_password'] = htmlspecialchars($_POST['usu_password']);

        try {
            $usuario = new Usuario($_POST);
            $resultado = $usuario->crear();
            http_response_code(200);
            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Usuario guardado exitosamente',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al guardar el usuario',
                'detalle' => $e->getMessage(),
            ]);
        }
    }

    public static function buscarAPI()
    {
        try {
            $usuarios = Usuario::obtenerUsuariosConQuery();
            http_response_code(200);
            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Datos encontrados',
                'detalle' => '',
                'datos' => $usuarios
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al buscar usuarios',
                'detalle' => $e->getMessage(),
            ]);
        }
    }

    public static function modificarAPI()
    {
        $_POST['usu_nombre'] = htmlspecialchars($_POST['usu_nombre']);
        $_POST['usu_catalogo'] = filter_var($_POST['usu_catalogo'], FILTER_SANITIZE_NUMBER_INT);
        $_POST['usu_password'] = htmlspecialchars($_POST['usu_password']);
        $id = filter_var($_POST['usu_id'], FILTER_SANITIZE_NUMBER_INT);

        try {
            $usuario = Usuario::find($id);
            $datos = [
                'usu_nombre' => $_POST['usu_nombre'],
                'usu_catalogo' => $_POST['usu_catalogo'],
                'usu_password' => $_POST['usu_password'],
            ];
            $usuario->sincronizar($datos);
            $usuario->actualizar();
            http_response_code(200);
            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Usuario modificado exitosamente',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al modificar el usuario',
                'detalle' => $e->getMessage(),
            ]);
        }
    }

    public static function eliminarAPI()
    {

        $id = filter_var($_POST['usu_id'], FILTER_SANITIZE_NUMBER_INT);
        try {

            $usuario = Usuario::find($id);
            $usuario->eliminar();
            http_response_code(200);
            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Usuario eliminado exitosamente',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al eliminadar al usuario',
                'detalle' => $e->getMessage(),
            ]);
        }
    }
}
