<?php
# general crud operations for all tables
#User crud
function createUser($mysqli, $userid, $username, $password, $usertype) {
    $stmt = $mysqli->prepare("INSERT INTO user (userid, username, password, usertype) VALUES (?, ?, ?, ?)");
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt->bind_param("ssss", $userid, $username, $hashedPassword, $usertype);
    $stmt->execute();
    $stmt->close();
}

function getUser($mysqli, $userid) {
    $stmt = $mysqli->prepare("SELECT * FROM user WHERE userid = ?");
    $stmt->bind_param("s", $userid);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    return $user;
}

function updateUser($mysqli, $userid, $username, $password, $usertype) {
    $stmt = $mysqli->prepare("UPDATE user SET username = ?, password = ?, usertype = ? WHERE userid = ?");
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt->bind_param("ssss", $username, $hashedPassword, $usertype, $userid);
    $stmt->execute();
    $stmt->close();
}

function deleteUser($mysqli, $userid) {
    $stmt = $mysqli->prepare("DELETE FROM user WHERE userid = ?");
    $stmt->bind_param("s", $userid);
    $stmt->execute();
    $stmt->close();
}

#Alumni crud
function createAlumni($mysqli, $userid, $email, $firstname, $middlename, $lastname, $empstatus, $location, $displaypic, $banned) {
    $stmt = $mysqli->prepare("INSERT INTO alumni (userid, email, firstname, middlename, lastname, empstatus, location, displaypic, banned) 
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssi", $userid, $email, $firstname, $middlename, $lastname, $empstatus, $location, $displaypic, $banned);
    $stmt->execute();
    $stmt->close();
}

function getAlumni($mysqli, $userid) {
    $stmt = $mysqli->prepare("SELECT * FROM alumni WHERE userid = ?");
    $stmt->bind_param("s", $userid);
    $stmt->execute();
    $result = $stmt->get_result();
    $alumni = $result->fetch_assoc();
    $stmt->close();
    return $alumni;
}

function updateAlumni($mysqli, $userid, $email, $firstname, $middlename, $lastname, $empstatus, $location, $displaypic, $banned) {
    $stmt = $mysqli->prepare("UPDATE alumni SET email = ?, firstname = ?, middlename = ?, lastname = ?, empstatus = ?, location = ?, displaypic = ?, banned = ? WHERE userid = ?");
    $stmt->bind_param("sssssssii", $email, $firstname, $middlename, $lastname, $empstatus, $location, $displaypic, $banned, $userid);
    $stmt->execute();
    $stmt->close();
}

function deleteAlumni($mysqli, $userid) {
    $stmt = $mysqli->prepare("DELETE FROM alumni WHERE userid = ?");
    $stmt->bind_param("s", $userid);
    $stmt->execute();
    $stmt->close();
}

#Event crud
function createEvent($mysqli, $eventid, $title, $description, $category, $eventtime, $eventdate, $eventloc, $publishtimestamp, $userid) {
    $stmt = $mysqli->prepare("INSERT INTO event (eventid, title, description, category, eventtime, eventdate, eventloc, publishtimestamp, userid) 
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $eventid, $title, $description, $category, $eventtime, $eventdate, $eventloc, $publishtimestamp, $userid);
    $stmt->execute();
    $stmt->close();
}

function getEvent($mysqli, $eventid) {
    $stmt = $mysqli->prepare("SELECT * FROM event WHERE eventid = ?");
    $stmt->bind_param("s", $eventid);
    $stmt->execute();
    $result = $stmt->get_result();
    $event = $result->fetch_assoc();
    $stmt->close();
    return $event;
}

function updateEvent($mysqli, $eventid, $title, $description, $category, $eventtime, $eventdate, $eventloc, $userid) {
    $stmt = $mysqli->prepare("UPDATE event SET title = ?, description = ?, category = ?, eventtime = ?, eventdate = ?, eventloc = ?, userid = ? WHERE eventid = ?");
    $stmt->bind_param("ssssssss", $title, $description, $category, $eventtime, $eventdate, $eventloc, $userid, $eventid);
    $stmt->execute();
    $stmt->close();
}

function deleteEvent($mysqli, $eventid) {
    $stmt = $mysqli->prepare("DELETE FROM event WHERE eventid = ?");
    $stmt->bind_param("s", $eventid);
    $stmt->execute();
    $stmt->close();
}

#exp crud
function createExperience($mysqli, $xpid, $title, $body, $publishtimestamp, $userid) {
    $stmt = $mysqli->prepare("INSERT INTO experience (xpid, title, body, publishtimestamp, userid) 
                              VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $xpid, $title, $body, $publishtimestamp, $userid);
    $stmt->execute();
    $stmt->close();
}

function getExperience($mysqli, $xpid) {
    $stmt = $mysqli->prepare("SELECT * FROM experience WHERE xpid = ?");
    $stmt->bind_param("s", $xpid);
    $stmt->execute();
    $result = $stmt->get_result();
    $experience = $result->fetch_assoc();
    $stmt->close();
    return $experience;
}

function updateExperience($mysqli, $xpid, $title, $body, $userid) {
    $stmt = $mysqli->prepare("UPDATE experience SET title = ?, body = ?, userid = ? WHERE xpid = ?");
    $stmt->bind_param("ssss", $title, $body, $userid, $xpid);
    $stmt->execute();
    $stmt->close();
}

function deleteExperience($mysqli, $xpid) {
    $stmt = $mysqli->prepare("DELETE FROM experience WHERE xpid = ?");
    $stmt->bind_param("s", $xpid);
    $stmt->execute();
    $stmt->close();
}

#comment crud
function createComment($mysqli, $commid, $content, $publishtimestamp, $xpid, $userid) {
    $stmt = $mysqli->prepare("INSERT INTO comment (commid, content, publishtimestamp, xpid, userid) 
                              VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $commid, $content, $publishtimestamp, $xpid, $userid);
    $stmt->execute();
    $stmt->close();
}

function getComment($mysqli, $commid) {
    $stmt = $mysqli->prepare("SELECT * FROM comment WHERE commid = ?");
    $stmt->bind_param("s", $commid);
    $stmt->execute();
    $result = $stmt->get_result();
    $comment = $result->fetch_assoc();
    $stmt->close();
    return $comment;
}

function updateComment($mysqli, $commid, $content, $xpid, $userid) {
    $stmt = $mysqli->prepare("UPDATE comment SET content = ?, xpid = ?, userid = ? WHERE commid = ?");
    $stmt->bind_param("ssss", $content, $xpid, $userid, $commid);
    $stmt->execute();
    $stmt->close();
}

function deleteComment($mysqli, $commid) {
    $stmt = $mysqli->prepare("DELETE FROM comment WHERE commid = ?");
    $stmt->bind_param("s", $commid);
    $stmt->execute();
    $stmt->close();
}

#jobpost crud
function createJobPost($mysqli, $jobpid, $title, $location, $description, $companyname, $publishtimestamp, $userid) {
    $stmt = $mysqli->prepare("INSERT INTO jobpost (jobpid, title, location, description, companyname, publishtimestamp, userid) 
                              VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $jobpid, $title, $location, $description, $companyname, $publishtimestamp, $userid);
    $stmt->execute();
    $stmt->close();
}

function getJobPost($mysqli, $jobpid) {
    $stmt = $mysqli->prepare("SELECT * FROM jobpost WHERE jobpid = ?");
    $stmt->bind_param("s", $jobpid);
    $stmt->execute();
    $result = $stmt->get_result();
    $jobpost = $result->fetch_assoc();
    $stmt->close();
    return $jobpost;
}

function updateJobPost($mysqli, $jobpid, $title, $location, $description, $companyname, $userid) {
    $stmt = $mysqli->prepare("UPDATE jobpost SET title = ?, location = ?, description = ?, companyname = ?, userid = ? WHERE jobpid = ?");
    $stmt->bind_param("ssssss", $title, $location, $description, $companyname, $userid, $jobpid);
    $stmt->execute();
    $stmt->close();
}

function deleteJobPost($mysqli, $jobpid) {
    $stmt = $mysqli->prepare("DELETE FROM jobpost WHERE jobpid = ?");
    $stmt->bind_param("s", $jobpid);
    $stmt->execute();
    $stmt->close();
}

#expimg crud
function createExperienceImage($mysqli, $xpid, $xpimage) {
    $stmt = $mysqli->prepare("INSERT INTO experienceimage (xpid, xpimage) VALUES (?, ?)");
    $stmt->bind_param("sb", $xpid, $xpimage);
    $stmt->execute();
    $stmt->close();
}

function getExperienceImage($mysqli, $xpid) {
    $stmt = $mysqli->prepare("SELECT * FROM experienceimage WHERE xpid = ?");
    $stmt->bind_param("s", $xpid);
    $stmt->execute();
    $result = $stmt->get_result();
    $experienceimage = $result->fetch_assoc();
    $stmt->close();
    return $experienceimage;
}

function updateExperienceImage($mysqli, $xpid, $xpimage) {
    $stmt = $mysqli->prepare("UPDATE experienceimage SET xpimage = ? WHERE xpid = ?");
    $stmt->bind_param("bs", $xpimage, $xpid);
    $stmt->execute();
    $stmt->close();
}

function deleteExperienceImage($mysqli, $xpid) {
    $stmt = $mysqli->prepare("DELETE FROM experienceimage WHERE xpid = ?");
    $stmt->bind_param("s", $xpid);
    $stmt->execute();
    $stmt->close();
}

#jobpimg crud
function createJobPostImage($mysqli, $jobpid, $jobpimage) {
    $stmt = $mysqli->prepare("INSERT INTO jobpostimage (jobpid, jobpimage) VALUES (?, ?)");
    $stmt->bind_param("sb", $jobpid, $jobpimage);
    $stmt->execute();
    $stmt->close();
}

function getJobPostImage($mysqli, $jobpid) {
    $stmt = $mysqli->prepare("SELECT * FROM jobpostimage WHERE jobpid = ?");
    $stmt->bind_param("s", $jobpid);
    $stmt->execute();
    $result = $stmt->get_result();
    $jobpostimage = $result->fetch_assoc();
    $stmt->close();
    return $jobpostimage;
}

function updateJobPostImage($mysqli, $jobpid, $jobpimage) {
    $stmt = $mysqli->prepare("UPDATE jobpostimage SET jobpimage = ? WHERE jobpid = ?");
    $stmt->bind_param("bs", $jobpimage, $jobpid);
    $stmt->execute();
    $stmt->close();
}

function deleteJobPostImage($mysqli, $jobpid) {
    $stmt = $mysqli->prepare("DELETE FROM jobpostimage WHERE jobpid = ?");
    $stmt->bind_param("s", $jobpid);
    $stmt->execute();
    $stmt->close();
}

?>