SET default_storage_engine=INNODB;

DROP DATABASE IF EXISTS alumaniadb;

CREATE DATABASE alumaniadb CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci;

USE alumaniadb;

CREATE TABLE user (
    userid VARCHAR(15) PRIMARY KEY,
    username VARCHAR(25) UNIQUE,
    password LONGTEXT,
    usertype ENUM('Alumni', 'Manager', 'Admin')
);

CREATE TABLE alumni (
    userid VARCHAR(15) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    firstname VARCHAR(100),
    middlename VARCHAR(50) NULL,
    lastname VARCHAR(50),
    course VARCHAR(100),
    empstatus ENUM('Employee', 'Unemployed', 'Underemployed'),
    location ENUM('Domestic', 'Foreign'),
    company VARCHAR(50) NULL,
    displaypic MEDIUMBLOB,
    diploma MEDIUMBLOB,
    banned BOOL,
    FOREIGN KEY (userid) REFERENCES USER(userid)
);

CREATE TABLE applicants (
    applicantid VARCHAR(15) PRIMARY KEY,
    username VARCHAR(25) UNIQUE,
    password LONGTEXT,
    email VARCHAR(255) UNIQUE,
    firstname VARCHAR(100),
    middlename VARCHAR(50) NULL,
    lastname VARCHAR(50),
    course VARCHAR(100),
    empstatus ENUM('Employee', 'Unemployed', 'Underemployed'),
    location ENUM('Domestic', 'Foreign'),
    company VARCHAR(50) NULL
);

CREATE TABLE event (
    eventid VARCHAR(20) PRIMARY KEY,
    title TEXT,
    description MEDIUMTEXT,
    category ENUM('Mass', 'Reunion', 'Thanksgiving', 'Seminar', 'Conference', 'Festival', 'Workshop', 'Other'),
    location VARCHAR(255),
    eventtime TIME,
    eventdate DATE,
    eventloc VARCHAR(255),
    publishtimestamp timestamp,
    eventphoto BLOB,
    userid VARCHAR(15),
    FOREIGN KEY (userid) REFERENCES USER(userid)
);

CREATE TABLE interestedinevent (
    eventid VARCHAR(20),
    userid VARCHAR(15),
    FOREIGN KEY (eventid) REFERENCES event(eventid),
    FOREIGN KEY (userid) REFERENCES alumni(userid),
    PRIMARY KEY (eventid, userid)
);

CREATE TABLE experience (
    xpid VARCHAR(20) PRIMARY KEY,
    title TEXT,
    body MEDIUMTEXT,
    publishtimestamp timestamp,
    userid VARCHAR(15),
    FOREIGN KEY (userid) REFERENCES alumni(userid)
);

CREATE TABLE reportedexperience (
    xpid VARCHAR(20),
    userid VARCHAR(15),
    reason ENUM('Inappropriate Post', 'Pornographic Material', 'Troll', 'Hate Speech'),
    FOREIGN KEY (xpid) REFERENCES experience(xpid),
    FOREIGN KEY (userid) REFERENCES alumni(userid),
    PRIMARY KEY (xpid, userid)
);

CREATE TABLE experienceimage (
    xpid VARCHAR(20) PRIMARY KEY,
    xpimage MEDIUMBLOB,
    FOREIGN KEY (xpid) REFERENCES experience(xpid)
);

CREATE TABLE comment (
    commid VARCHAR(30) PRIMARY KEY,
    content MEDIUMTEXT,
    publishtimestamp timestamp,
    xpid VARCHAR(20),
    userid VARCHAR(15),
    FOREIGN KEY (xpid) REFERENCES experience(xpid),
    FOREIGN KEY (userid) REFERENCES user(userid)
);

CREATE TABLE jobpost(
    jobpid VARCHAR(20) PRIMARY KEY,
    title TEXT,
    location VARCHAR(255),
    description MEDIUMTEXT,
    companyname VARCHAR(255),
    publishtimestamp timestamp,
    userid VARCHAR(15),
    FOREIGN KEY (userid) REFERENCES user(userid)
);

CREATE TABLE interestedinjobpost (
    jobpid VARCHAR(20),
    userid VARCHAR(15),
    FOREIGN KEY (jobpid) REFERENCES jobpost(jobpid),
    FOREIGN KEY (userid) REFERENCES alumni(userid),
    PRIMARY KEY (jobpid, userid)
);