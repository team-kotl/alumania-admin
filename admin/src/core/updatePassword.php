<?php
require_once '..\database\database.php';

$db = \Database::getInstance()->getConnection();

if (isset($_POST['password'])) {
    $newPassword = $_POST['password']; 
    $query = "UPDATE user SET password = ? WHERE usertype = 'Admin'";

    if ($stmt = $db->prepare($query)) {
        
        $stmt->bind_param("s", $newPassword);
        
        if ($stmt->execute()) {
            
            echo "Password updated successfully.";
        } else {
            
            echo "Error updating password: " . $stmt->error;
        }

    } else {
        echo "Error preparing the query.";
    }
} else {
    echo "No password provided.";
}
?>
