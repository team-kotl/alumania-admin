<?php
//Author: Nikko Andrei T. Choy
// This handles the the images to be displayed in the experience tab of the posts page
require_once '../database/database.php';
$db = \Database::getInstance()->getConnection();

header('Content-Type: application/json');

if (isset($_GET['xpid'])) {
    $xpid = $_GET['xpid'];
    $stmt = $db->prepare("SELECT xpimage FROM experienceimage WHERE xpid = ?");
    $stmt->bind_param("s", $xpid);
    $stmt->execute();
    $result = $stmt->get_result();

    $images = [];
    while ($row = $result->fetch_assoc()) {
        $images[] = [
            'base64Image' => base64_encode($row['xpimage'])
        ];
    }
    echo json_encode($images);
} else {
    echo json_encode([]);
}
?>