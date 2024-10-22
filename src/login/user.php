<?php
#User.php
class User {
    private $con;
    private $table_name = "user";

    public $username;
    public $password;
    public $usertype;

    public function __construct($db) {
        $this->con = $db;
    }

    public function getTableName() {
        return $this->table_name;
    }

    public function getCon() {
        return $this->con;
    }

}
?>
