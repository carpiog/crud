<?php

namespace Controllers;

use Exception;
use Model\Rol;
use MVC\Router;

class RolController {
    public static function index(Router $router) {
        $aplicaciones = Rol::obtenerAplicaciones();
        $router->render('rol/index', [
            'aplicaciones' => $aplicaciones
        ]);
    }

    public static function guardarAPI() {
        $_POST['rol_nombre'] = htmlspecialchars($_POST['rol_nombre']);
        $_POST['rol_nombre_ct'] = htmlspecialchars($_POST['rol_nombre_ct']);
        $_POST['rol_app'] = filter_var($_POST['rol_app'], FILTER_SANITIZE_NUMBER_INT);
        $_POST['rol_situacion'] = filter_var($_POST['rol_situacion'], FILTER_SANITIZE_NUMBER_INT);

        try {
            $rol = new Rol($_POST);
            $resultado = $rol->crear();
            http_response_code(200);
            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Rol guardado exitosamente',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al guardar Rol',
                'detalle' => $e->getMessage(),
            ]);
        }
    }

    public static function buscarAPI() {
        try {
            $roles = Rol::all();
            http_response_code(200);
            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Datos encontrados',
                'detalle' => '',
                'datos' => $roles
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al buscar Roles',
                'detalle' => $e->getMessage(),
            ]);
        }
    }

    public static function modificarAPI() {
        $_POST['rol_nombre'] = htmlspecialchars($_POST['rol_nombre']);
        $_POST['rol_nombre_ct'] = htmlspecialchars($_POST['rol_nombre_ct']);
        $_POST['rol_app'] = filter_var($_POST['rol_app'], FILTER_SANITIZE_NUMBER_INT);
        $_POST['rol_situacion'] = filter_var($_POST['rol_situacion'], FILTER_SANITIZE_NUMBER_INT);
        $id = filter_var($_POST['rol_id'], FILTER_SANITIZE_NUMBER_INT);

        try {
            $rol = Rol::find($id);
            $rol->sincronizar($_POST);
            $rol->actualizar();
            http_response_code(200);
            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Rol modificado exitosamente',
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al modificar Rol',
                'detalle' => $e->getMessage(),
            ]);
        }
    }

    public static function eliminarAPI() {
        if (!isset($_POST['rol_id']) || empty($_POST['rol_id'])) {
            http_response_code(400); // Bad Request
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'ID de rol no proporcionado',
            ]);
            return;
        }

        $id = filter_var($_POST['rol_id'], FILTER_SANITIZE_NUMBER_INT);
        try {
            $rol = Rol::find($id);
            if ($rol) {
                $rol->eliminar();
                http_response_code(200);
                echo json_encode([
                    'codigo' => 1,
                    'mensaje' => 'Rol eliminado exitosamente',
                ]);
            } else {
                http_response_code(404); // Not Found
                echo json_encode([
                    'codigo' => 0,
                    'mensaje' => 'Rol no encontrado',
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al eliminar Rol',
                'detalle' => $e->getMessage(),
            ]);
        }
    }
}
