<?php
require_once '..\database\database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $user_type = "Admin";

    $db = \Database::getInstance()->getConnection();

    $query = "SELECT password FROM user WHERE username = ? AND password = ? AND usertype = ? LIMIT 1";

    if ($stmt = $db->prepare($query)) {
        $stmt->bind_param('sss', $username, $password, $user_type);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            if ($password === $row['password']) {
                header('Location: create.php');
                die();
            }
        }
    }

    header('Location: ../../index.php');
    exit();
}

function loginAdmin($db, $username, $password)
{
    $query = "SELECT password FROM user WHERE username = ? AND password = ? AND usertype = 'admin' LIMIT 1";

    if ($stmt = $db->prepare($query)) {
        $stmt->bind_param('ss', $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            if ($password === $row['password']) {
                echo "<script>console.log('Goods');</script>";
                return true;
            }
        }
    }

    echo "<script>console.log('Somethins gon to shit?');</script>";
    return false;
}