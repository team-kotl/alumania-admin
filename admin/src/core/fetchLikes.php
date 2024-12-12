<?php
//Author: Nikko Andrei T. Choy
// This handles the number of likes to be displayed in the experience tab of the posts page
require_once '..\database\database.php';
$db = \Database::getInstance()->getConnection();

header('Content-Type: application/json');

if (isset($_GET['xpid'])) {
    $xpid = $_GET['xpid'];
    $stmt = $db->prepare("SELECT COUNT(*) as likes FROM experiencelike WHERE xpid = ?");
    $stmt->bind_param("s", $xpid);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = $result->fetch_assoc();
    echo json_encode(['likes' => $data['likes']]);
} else {
    echo json_encode(['likes' => 0]);
}

?>