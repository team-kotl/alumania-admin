<?php

function OpenCon()
{
    $config = require __DIR__ . '/../../config/dbconfig.php';
    $db_server = $config['HOST'];
    $db_user = $config['USERNAME'];
    $db_pass = $config['PASSWORD'];
    $db_name = $config['DB_NAME'];    
    
    $con = mysqli_connect($db_server, $db_user, $db_pass, $db_name);
    return $con;
}

function CloseCon($con)
{
    $con -> close();
}