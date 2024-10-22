<?php
include 'src/database/database.php';
$conn = OpenCon();
echo "Connected Successfully";
CloseCon($conn);