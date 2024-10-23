<?php
require_once '..\database\database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $user_type = "admin";

    $db = \Database::getInstance()->getConnection();

    $query = "SELECT password FROM user WHERE username = ? AND usertype = ? LIMIT 1";

    if ($stmt = $db->prepare($query)) {
        $stmt->bind_param('ss', $username, $user_type);
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

function FunctionName() : string {
    return "aa";
}