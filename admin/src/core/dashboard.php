<?php
session_start();
if (isset($_SESSION['username'])) { ?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../../res/styles/dashboard.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
        <title>Alumania</title>
    </head>

    <body>
        <div id="notificationContainer"></div>
        <?php include 'navbar.php'; ?>
        <script defer>
            setActiveNav("dashtab", "dashicon", 1);
        </script>


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

        // Fetch recent alumni
        $recentAlumniData = [];
        $result = $db->query("SELECT name, location, DATE_FORMAT(joined, '%Y-%m-%d') AS joined FROM alumni ORDER BY joined DESC LIMIT 4");

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $recentAlumniData[] = $row; // Store results in an array
            }
        }

        // Fetch recent managers
        $recentManagersData = [];
        $result = $db->query("SELECT name, DATE_FORMAT(joined, '%Y-%m-%d') AS joined FROM user WHERE usertype = 'manager' ORDER BY joined DESC LIMIT 4");

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $recentManagersData[] = $row; // Store results in an array
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
                $cards = [
                    'alumni' => ['Alumni', $counts['alumni'], 'fa-graduation-cap', '#0b1975'],
                    'managers' => ['Managers', $counts['managers'], 'fa-user', '#0077c8'],
                    'event' => ['Events', $counts['event'], 'fa-calendar', '#00d4ff'],
                    'jobpost' => ['Job Posting', $counts['jobpost'], 'fa-briefcase', '#00d4ff'],
                ];

                foreach ($cards as $key => $details) {
                    echo "
        <div class='card'>
            <div class='card-content'>
                <div class='icon-container' style='background-color: {$details[3]}'>
                    <i class='fa {$details[2]}'></i>
                </div>
                <div class='text-container'>
                    <div class='card-title'>{$details[0]}</div>
                    <div class='card-count'>{$details[1]}</div>
                </div>
            </div>
        </div>";
                }
                ?>
            </div>

            <div class="chart-container">
                <!-- Employment Status Chart -->
                <div class="chart-card">
                    <canvas id="employmentChart"></canvas>
                </div>

                <!-- User Location Chart -->
                <div class="chart-card">
                    <canvas id="locationChart"></canvas>
                </div>
            </div>

            <div class="row-container">
    <div class="recent-alumni">
        <h2>Recent Alumni</h2>
        <table class="alumni-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Joined</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($recentAlumniData)) {
                    foreach ($recentAlumniData as $alumni) { ?>
                        <tr>
                            <td>
                                <div class='alumni-info'>
                                    <img src='path/to/avatar.png' alt='Avatar' class='alumni-avatar'>
                                    <span><?php echo htmlspecialchars($alumni['name']); ?></span>
                                </div>
                            </td>
                            <td><?php echo htmlspecialchars($alumni['location']); ?></td>
                            <td><?php echo htmlspecialchars($alumni['joined']); ?></td>
                        </tr>
                    <?php }
                } else { ?>
                    <tr>
                        <td colspan="3" class="no-data">No recent alumni found.</td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

    <div class="recent-managers">
        <h2>Recent Managers</h2>
        <table class="managers-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Joined</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($recentManagersData)) {
                    foreach ($recentManagersData as $manager) { ?>
                        <tr>
                            <td>
                                <div class='manager-info'>
                                    <img src='path/to/avatar.png' alt='Avatar' class='manager-avatar'>
                                    <span><?php echo htmlspecialchars($manager['name']); ?></span>
                                </div>
                            </td>
                            <td><?php echo htmlspecialchars($manager['joined']); ?></td>
                        </tr>
                    <?php }
                } else { ?>
                    <tr>
                        <td colspan="2" class="no-data">No recent managers found.</td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
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
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Employment Status'
                    }
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
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'User Location'
                    }
                }
            }
        });
    </script>

    </html>
<?php } else { ?>
    <h1 style='margin:auto;'>Access Forbidden</h1>
    <p>Please log in to your account.</p>
<?php } ?>