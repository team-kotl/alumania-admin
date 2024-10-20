<?php
function OpenCon()
{
    $db_server = "localhost";
    $db_user = "root";
    $db_pass = "";
    $db_name = "alumaniadb";
    $con = "";
    
    
    $con = mysqli_connect($db_server, $db_user, $db_pass, $db_name);
    return $con;
}

function CloseCon($con)
{
    $con -> close();
}


?>