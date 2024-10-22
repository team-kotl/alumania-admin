<?php
class Database
{
    private static $instance = null;
    private $mysqli;

    // Private constructor to prevent instantiation
    private function __construct()
    {
        $config = require 'dbconfig.php';
        $this->mysqli = new mysqli(
            $config['HOST'],
            $config['USERNAME'],
            $config['PASSWORD'],
            $config['DB_NAME']
        );

        if ($this->mysqli->connect_error) {
            die("Connection failed: " . $this->mysqli->connect_error);
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->mysqli;
    }
}