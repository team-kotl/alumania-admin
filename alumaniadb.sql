CREATE DATABASE  IF NOT EXISTS `alumaniadb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `alumaniadb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: alumaniadb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `albumid` varchar(20) NOT NULL,
  `title` text NOT NULL,
  `coverphoto` mediumblob NOT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `ownerid` varchar(20) NOT NULL,
  PRIMARY KEY (`albumid`),
  KEY `ownerid` (`ownerid`),
  CONSTRAINT `album_ibfk_1` FOREIGN KEY (`ownerid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albumexperience`
--

DROP TABLE IF EXISTS `albumexperience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albumexperience` (
  `albumid` varchar(20) NOT NULL,
  `xpid` varchar(20) NOT NULL,
  PRIMARY KEY (`albumid`,`xpid`),
  KEY `xpid` (`xpid`),
  CONSTRAINT `albumexperience_ibfk_1` FOREIGN KEY (`albumid`) REFERENCES `album` (`albumid`),
  CONSTRAINT `albumexperience_ibfk_2` FOREIGN KEY (`xpid`) REFERENCES `experience` (`xpid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albumexperience`
--

LOCK TABLES `albumexperience` WRITE;
/*!40000 ALTER TABLE `albumexperience` DISABLE KEYS */;
/*!40000 ALTER TABLE `albumexperience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumni`
--

DROP TABLE IF EXISTS `alumni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumni` (
  `userid` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) NOT NULL,
  `course` varchar(100) NOT NULL,
  `empstatus` enum('Employee','Unemployed','Underemployed') NOT NULL,
  `location` enum('Domestic','Foreign') NOT NULL,
  `company` varchar(50) DEFAULT NULL,
  `displaypic` mediumblob DEFAULT NULL,
  `diploma` mediumblob DEFAULT NULL,
  `banned` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `alumni_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumni`
--

LOCK TABLES `alumni` WRITE;
/*!40000 ALTER TABLE `alumni` DISABLE KEYS */;
INSERT INTO `alumni` VALUES ('U001','shaundoe@example.com','Shaun','A.','Sheep','Computer Science','Employee','Domestic','Tech Solutions',NULL,NULL,0),('U002','joysce.smith@example.com','Joyce',NULL,'Smith','Business Administration','Unemployed','Domestic',NULL,NULL,NULL,0),('U003','judelyn.jones@example.com','Judelyn','B.','Jones','Graphic Design','Underemployed','Foreign','Creative Agency',NULL,NULL,0),('U004','jae.brown@example.com','Jae',NULL,'Brown','Mechanical Engineering','Employee','Domestic','Engineering Corp.',NULL,NULL,1),('U005','choyy.white@example.com','Nikko',NULL,'White','Physics','Unemployed','Foreign',NULL,NULL,NULL,0),('U006','skiers.green@example.com','Earl','C.','Green','Information Technology','Employee','Domestic','Innovatech',NULL,NULL,0),('U007','cayel.davis@example.com','Camily',NULL,'Davis','Nursing','Underemployed','Foreign','Global Health Services',NULL,NULL,0),('U008','yukiro.miller@example.com','Farry','D.','Miller','Electrical Engineering','Employee','Domestic','ElectroTech Inc.',NULL,NULL,0);
/*!40000 ALTER TABLE `alumni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applicant`
--

DROP TABLE IF EXISTS `applicant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicant` (
  `applicantid` varchar(15) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` longtext NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) NOT NULL,
  `course` varchar(100) NOT NULL,
  `empstatus` enum('Employee','Unemployed','Underemployed') NOT NULL,
  `location` enum('Domestic','Foreign') NOT NULL,
  `company` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`applicantid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicant`
--

LOCK TABLES `applicant` WRITE;
/*!40000 ALTER TABLE `applicant` DISABLE KEYS */;
INSERT INTO `applicant` (`applicantid`, `username`, `password`, `email`, `firstname`, `middlename`, `lastname`, `course`, `empstatus`, `location`, `company`) VALUES ('app001', 'shaunny', '456', 'shaun@gmail.com', 'Shaun', NULL, 'Aromin', 'BSIT', 'Unemployed', 'Domestic', NULL), ('app002', 'jude', 'dow', 'judedow@gmail.com', 'Jude', NULL, 'Dow', 'BSMMA', 'Employee', 'Foreign', 'Harvard'), ('app003', 'earl', 'mari', 'mariahgmail.com', 'Mariah', NULL, 'Earl', 'BSCS', 'Employee', 'Domestic', 'Converge');
/*!40000 ALTER TABLE `applicant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `commid` varchar(30) NOT NULL,
  `content` mediumtext NOT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `xpid` varchar(20) NOT NULL,
  `userid` varchar(15) NOT NULL,
  PRIMARY KEY (`commid`),
  KEY `xpid` (`xpid`),
  KEY `userid` (`userid`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`xpid`) REFERENCES `experience` (`xpid`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES ('C001','Great work on the web applications! Really impressive!','2024-01-15 20:00:00','XP001','U002'),('C002','Your marketing strategies are very effective!','2023-06-20 18:15:00','XP002','U003'),('C003','The mechanical systems you designed are innovative.','2024-02-05 22:20:00','XP003','U004'),('C004','Thank you for your care during my recovery!','2023-11-25 16:00:00','XP004','U001'),('C005','Excited to see your designs for electrical systems!','2024-04-10 21:50:00','XP005','U006');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `eventid` varchar(20) NOT NULL,
  `title` text NOT NULL,
  `description` mediumtext NOT NULL,
  `category` enum('Seminar','Thanksgiving','Festival','Reunion','Campus','Job Fair','Other') NOT NULL,
  `eventtime` time NOT NULL,
  `eventdate` date NOT NULL,
  `eventloc` varchar(255) NOT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `eventphoto` blob NOT NULL,
  `userid` varchar(15) NOT NULL,
  PRIMARY KEY (`eventid`),
  KEY `userid` (`userid`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES ('E001','Company Reunion','A grand reunion for alumni','Reunion','18:00:00','2025-11-25','Loakan Airport, Baguio','2024-10-23 14:30:35','','U003'),('E002','Alumni Mass','An event for alumni to gather for mass','Seminar','10:00:00','2025-12-01','Baguio Cathedral','2024-10-23 14:30:40','','U002'),('E003','Annual Thanksgiving','A time to give thanks','Thanksgiving','11:00:00','2025-11-20','Baguio City Hall','2024-10-23 14:30:44','','U001'),('E004','Coding Seminar','A seminar on the latest IT trends','Seminar','09:30:00','2025-10-30','SLU Prince Bernhard Gym','2024-10-23 14:30:49','','U006'),('E005','Tech Conference','Discuss innovations in technology','Seminar','13:00:00','2025-11-15','Conference Hall','2024-10-23 14:30:54','','U008'),('E006','Annual Festival','Celebrate alumni achievements','Festival','17:00:00','2025-12-15','Malcolm Square, Baguio','2024-10-23 14:30:59','','U007'),('E007','Bisaya Monke Parte','Mag-uban kita sa usa ka makalingaw ug buhi nga Bisaya Monkey Party, usa ka espesyal nga selebrasyon puno sa kusog, katawa, ug lokal nga kultura! Kini nga kalihokan gipasiugda sa kalingawan ug pagka-curious sa mga unggoy, ug mahimong usa ka gabii nga puno sa kalipay ug dili malimtan nga mga higayon, nga puno sa Bisaya nga musika, lingaw, ug mga dula.','Festival','12:00:00','2030-12-12','Burat, Samar','2024-10-23 14:32:59','','7777');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `xpid` varchar(20) NOT NULL,
  `title` text NOT NULL,
  `body` mediumtext NOT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `userid` varchar(15) NOT NULL,
  PRIMARY KEY (`xpid`),
  KEY `userid` (`userid`),
  CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `alumni` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES ('XP001','Software Developer','Developed and maintained web applications using JavaScript and React.','2024-01-14 18:00:00','U001'),('XP002','Marketing Intern','Assisted in creating marketing campaigns and managing social media accounts.','2023-06-19 17:30:00','U002'),('XP003','Mechanical Engineer','Worked on product design and development for mechanical systems.','2024-02-04 16:45:00','U004'),('XP004','Nursing Assistant','Assisted nurses in patient care and daily activities.','2023-11-24 15:00:00','U007'),('XP005','Electrical Engineer Intern','Assisted in designing electrical systems for new products.','2024-04-09 18:30:00','U008');
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experienceimage`
--

DROP TABLE IF EXISTS `experienceimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experienceimage` (
  `xpid` varchar(20) NOT NULL,
  `xpimage` mediumblob NOT NULL,
  PRIMARY KEY (`xpid`),
  CONSTRAINT `experienceimage_ibfk_1` FOREIGN KEY (`xpid`) REFERENCES `experience` (`xpid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experienceimage`
--

LOCK TABLES `experienceimage` WRITE;
/*!40000 ALTER TABLE `experienceimage` DISABLE KEYS */;
/*!40000 ALTER TABLE `experienceimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencelike`
--

DROP TABLE IF EXISTS `experiencelike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiencelike` (
  `xpid` varchar(20) NOT NULL,
  `userid` varchar(20) NOT NULL,
  `liketimestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`xpid`,`userid`),
  KEY `userid` (`userid`),
  CONSTRAINT `experiencelike_ibfk_1` FOREIGN KEY (`xpid`) REFERENCES `experience` (`xpid`),
  CONSTRAINT `experiencelike_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `alumni` (`userid`),
  CONSTRAINT `experiencelike_ibfk_3` FOREIGN KEY (`xpid`) REFERENCES `experience` (`xpid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencelike`
--

LOCK TABLES `experiencelike` WRITE;
/*!40000 ALTER TABLE `experiencelike` DISABLE KEYS */;
/*!40000 ALTER TABLE `experiencelike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interestedinevent`
--

DROP TABLE IF EXISTS `interestedinevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interestedinevent` (
  `eventid` varchar(20) NOT NULL,
  `userid` varchar(15) NOT NULL,
  PRIMARY KEY (`eventid`,`userid`),
  KEY `userid` (`userid`),
  CONSTRAINT `interestedinevent_ibfk_1` FOREIGN KEY (`eventid`) REFERENCES `event` (`eventid`),
  CONSTRAINT `interestedinevent_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `alumni` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interestedinevent`
--

LOCK TABLES `interestedinevent` WRITE;
/*!40000 ALTER TABLE `interestedinevent` DISABLE KEYS */;
INSERT INTO `interestedinevent` VALUES ('E001','U001'),('E002','U002'),('E003','U004'),('E004','U006'),('E005','U003'),('E006','U007');
/*!40000 ALTER TABLE `interestedinevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interestedinjobpost`
--

DROP TABLE IF EXISTS `interestedinjobpost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interestedinjobpost` (
  `jobpid` varchar(20) NOT NULL,
  `userid` varchar(15) NOT NULL,
  PRIMARY KEY (`jobpid`,`userid`),
  KEY `userid` (`userid`),
  CONSTRAINT `interestedinjobpost_ibfk_1` FOREIGN KEY (`jobpid`) REFERENCES `jobpost` (`jobpid`),
  CONSTRAINT `interestedinjobpost_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `alumni` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interestedinjobpost`
--

LOCK TABLES `interestedinjobpost` WRITE;
/*!40000 ALTER TABLE `interestedinjobpost` DISABLE KEYS */;
INSERT INTO `interestedinjobpost` VALUES ('JP001','U001'),('JP002','U002'),('JP003','U004'),('JP004','U007'),('JP005','U008');
/*!40000 ALTER TABLE `interestedinjobpost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpost`
--

DROP TABLE IF EXISTS `jobpost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpost` (
  `jobpid` varchar(20) NOT NULL,
  `title` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `companyname` varchar(255) NOT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `userid` varchar(15) NOT NULL,
  PRIMARY KEY (`jobpid`),
  KEY `userid` (`userid`),
  CONSTRAINT `jobpost_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpost`
--

LOCK TABLES `jobpost` WRITE;
/*!40000 ALTER TABLE `jobpost` DISABLE KEYS */;
INSERT INTO `jobpost` VALUES ('JP001','Software Developer','New York, USA','Looking for a skilled developer.','Tech Solutions','2024-10-20 22:17:13','U004'),('JP002','Marketing Manager','London, UK','We need an experienced marketing manager.','Marketing Corp','2024-10-10 22:17:13','U008'),('JP003','IT Support Specialist','Toronto, Canada','Provide tech support.','Help Desk Services','2024-10-20 18:17:13','U005'),('JP004','Data Analyst','Sydney, Australia','Analyze business data.','Data Insights','2024-10-30 22:17:13','U008'),('JP005','Web Developer','Berlin, Germany','Develop high-quality websites.','Web Works','2024-09-30 22:17:13','U005'),('JP006','Web Developer (Cebuano Bilingual)','Burat, Samar','Ang Kusabot nagapangita og Web Developer nga adunay kaalam sa pagdesinyo ug pag-develop sa mga modernong website ug web applications. Ang imong trabaho mao ang pag-develop sa mga websites nga responsive, user-friendly, ug mobarug sumala sa mga panginahanglan sa negosyo.','Kusabot','2024-10-23 13:43:26','7777');
/*!40000 ALTER TABLE `jobpost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` varchar(15) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` longtext NOT NULL,
  `usertype` enum('Alumni','Manager','Admin') NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('7777','admin','admin','Admin'),('U001','shaun','meeh','Alumni'),('U002','joyce','pazzword','Alumni'),('U003','judelyn','eabab','Alumni'),('U004','jae','cazzy','Manager'),('U005','choyoyoy','4321','Manager'),('U006','peeachybee','hey123','Alumni'),('U007','cayeli','joyce','Alumni'),('U008','yukiro','admin','Manager');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-22  0:32:40
