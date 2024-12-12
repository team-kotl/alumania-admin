/** Author:
* This PHP script is designed to get the likes of an experience from the database.
**/
<?php
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