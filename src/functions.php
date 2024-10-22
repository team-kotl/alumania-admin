<?php

#Login function for admin
function loginAdmin($user) {
    $query = "SELECT username, password, usertype FROM " . $user->getTableName() . " WHERE username = ? LIMIT 1";
    
    if ($stmt = $user->getCon()->prepare($query)) {
        
        $stmt->bind_param('s', $user->username);
        
        
        $stmt->execute();
        
        
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        
        
        if ($row) {
            
            if ($user->password === $row['password']) {
                if ($row['usertype'] === 'admin') {
                    header("Location: dashboard.html");
                    exit();
                } else {
                    return "Account is not Administrator!";
                }
            }
        }
    }

    return "Invalid login credentials!";
}
?>