<?php
class Database {
    public $db_server = "localhost";
    public $db_user = "root";
    public $db_pass = "";
    public $db_name = "alumaniadb";
    public $con;
    
    
    public function getConnect(){
        $this->con = new mysqli($this->db_server, $this->db_user, $this->db_pass, $this->db_name);

        if($this->con->connect_error) {
            die("Connection Failed: " . $this->con->connect_error);
        }
        return $this->con;
    }
}

?>