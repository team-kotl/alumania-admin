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
    <script defer> setActiveNav("dashtab", "dashicon", 1); </script>

    
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

        // Employment status query
        $empstatusCounts = [
            'Employee' => 0,
            'Unemployed' => 0,
            'Underemployed' => 0,
        ];

        $result = $db->query("SELECT empstatus, COUNT(*) AS count FROM alumni GROUP BY empstatus");
        while ($row = $result->fetch_assoc()) {
            if (isset($empstatusCounts[$row['empstatus']])) {
                $empstatusCounts[$row['empstatus']] = $row['count'];
            }
        }

        // Location query
        $locationCounts = [
            'Domestic' => 0,
            'Foreign' => 0,
        ];

        $result = $db->query("SELECT location, COUNT(*) AS count FROM alumni GROUP BY location");
        while ($row = $result->fetch_assoc()) {
            if (isset($locationCounts[$row['location']])) {
                $locationCounts[$row['location']] = $row['count'];
            }
        }    
        
    ?>
    
    <div class="content-container">
        <div class="header">
            <h1>Dashboard</h1>
            <h2 class="date"><?php echo date("F d, Y") ?></h2>
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

        <div class="chart-container">
            <canvas id="employmentChart" ></canvas>
            <canvas id="locationChart"></canvas>
        </div>

    </div>

    </body>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
            
            // Data for Employment Status
            const employmentData = {
            labels: ['Employee', 'Unemployed', 'Underemployed'],
            datasets: [{
                data: [<?php echo $empstatusCounts['Employee']; ?>, <?php echo $empstatusCounts['Unemployed']; ?>, <?php echo $empstatusCounts['Underemployed']; ?>],
                backgroundColor: ['#4CAF50', '#F44336', '#ecf00c'],
                borderWidth: 1
            }]
        };

        // Employment Status Pie Chart
        new Chart(document.getElementById('employmentChart'), {
            type: 'doughnut',
            data: employmentData,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Employment Status' }
                }
            }
        });

            // Data for User Location
            const locationData = {
                labels: ['Domestic', 'Foreign'],
                datasets: [{
                    data: [<?php echo $locationCounts['Domestic']; ?>, <?php echo $locationCounts['Foreign']; ?>],
                    backgroundColor: ['#2196F3', '#FFC107'],
                    borderWidth: 1
                }]
            };

            // Location Pie Chart
            new Chart(document.getElementById('locationChart'), {
                type: 'doughnut',
                data: locationData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'User Location' }
                    }
                }
            });
            
        </script>

</html>
<?php } else { ?>
    <h1 style='margin:auto;'>Access Forbidden</h1>
    <p>Please log in to your account.</p>
<?php } ?>