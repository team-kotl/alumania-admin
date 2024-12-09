<?php
session_start();
if (!isset($_SESSION['username'])) {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Unauthorized access"]);
    exit;
}

require_once '../database/database.php';

$db = Database::getInstance();
$conn = $db->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $managerId = $_POST['manager_id']; 
    $newUsername = $_POST['username'];
    $newPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $sql = "UPDATE user SET username = ?, password = ? WHERE userid = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("ssi", $newUsername, $newPassword, $managerId);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Manager updated successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to update manager"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Database error"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
