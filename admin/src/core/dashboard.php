<?php 
session_start();
if(isset($_SESSION['username'])) { ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../res/styles/dashboard.css">
    <title>Alumania</title>
</head>

<body>
    <div id="notificationContainer"></div>
    <?php include 'navbar.php'; ?>
    
    <?php
        require_once '..\database\database.php';
        $db = \Database::getInstance()->getConnection();

        $counts = [
            'alumni' => 0,
            'managers' => 0,
            'event' => 0,
            'jobpost' => 0,
        ];

        foreach (['alumni', 'event', 'jobpost'] as $key) {
            $result = $db->query("SELECT COUNT(*) AS count FROM $key"); // Replace table names as needed
            if ($result && $row = $result->fetch_assoc()) {
                $counts[$key] = $row['count'];
            }
        }

        $result = $db->query("SELECT COUNT(*) AS count FROM user WHERE usertype = 'manager'");
            if ($result && $row = $result->fetch_assoc()) {
                $counts['managers'] = $row['count'];
            }
    ?>
    
    <div class="content-container">
        <div class="header">
            <h1>Dashboard</h1>
            <h2>date</h2>
        </div>

        <div class="total-count-section">
            <?php
             foreach ($counts as $key => $count) {
                echo "
                <div class='card'>
                    <div class='card-title'>" . ucfirst($key) . "</div>
                    <div class='card-count'>{$count}</div>
                </div>";
            }
            ?>
        </div>
        

        
    </div>

    </body>

</html>
<?php } else { ?>
    <h1 style='margin:auto;'>Access Forbidden</h1>
    <p>Please log in to your account.</p>
<?php } ?>