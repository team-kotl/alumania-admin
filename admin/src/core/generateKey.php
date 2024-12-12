/** Author:
* This PHP script is designed generate a random string for the new key of the admin.
**/
<?php
function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }

    return $randomString;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $length = isset($_GET['length']) ? intval($_GET['length']) : 10;  // Default length is 10
    echo generateRandomString($length);
}

?>