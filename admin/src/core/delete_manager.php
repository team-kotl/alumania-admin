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

    $sql = "DELETE FROM user WHERE userid = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("i", $managerId);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Manager deleted successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to delete manager"]);
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
