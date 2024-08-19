<?php

namespace Model;

class Aplicacion extends ActiveRecord
{
    protected static $tabla = 'aplicacion';
    protected static $idTabla = 'id';
    protected static $columnasDB = ['nombre', 'situacion'];

    public $id;
    public $nombre;
    public $situacion;


    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->situacion = $args['situacion'] ?? 1;
    }

    public static function obtenerAplicacionconQuery()
    {
        $sql = "SELECT * FROM aplicaciion where situacion = 1";
        return self::fetchArray($sql);
    }
}
