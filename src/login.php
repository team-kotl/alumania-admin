<?php
#login controller
require_once 'dbc.php';        
require_once 'User.php';       
require_once 'functions.php';  

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    
    $database = new Database();
    $db = $database->getConnect();

    
    $user = new User($db);
    $user->username = $username;
    $user->password = $password;

    
    $loginMessage = loginAdmin($user);

    if ($loginMessage === true) {
        echo "Login successful!";
    } else {
        header("Location: index.php?error=" . urlencode($loginMessage));
        exit();
    }
}
?>
