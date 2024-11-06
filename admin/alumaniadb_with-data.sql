-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2024 at 05:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alumaniadb`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumni`
--

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
  `banned` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `alumni`
--

INSERT INTO `alumni` (`userid`, `email`, `firstname`, `middlename`, `lastname`, `course`, `empstatus`, `location`, `company`, `displaypic`, `diploma`, `banned`) VALUES
('U001', 'shaundoe@example.com', 'Shaun', 'A.', 'Sheep', 'Computer Science', 'Employee', 'Domestic', 'Tech Solutions', NULL, NULL, 0),
('U002', 'joysce.smith@example.com', 'Joyce', NULL, 'Smith', 'Business Administration', 'Unemployed', 'Domestic', NULL, NULL, NULL, 0),
('U003', 'judelyn.jones@example.com', 'Judelyn', 'B.', 'Jones', 'Graphic Design', 'Underemployed', 'Foreign', 'Creative Agency', NULL, NULL, 0),
('U004', 'jae.brown@example.com', 'Jae', NULL, 'Brown', 'Mechanical Engineering', 'Employee', 'Domestic', 'Engineering Corp.', NULL, NULL, 1),
('U005', 'choyy.white@example.com', 'Nikko', NULL, 'White', 'Physics', 'Unemployed', 'Foreign', NULL, NULL, NULL, 0),
('U006', 'skiers.green@example.com', 'Earl', 'C.', 'Green', 'Information Technology', 'Employee', 'Domestic', 'Innovatech', NULL, NULL, 0),
('U007', 'cayel.davis@example.com', 'Camily', NULL, 'Davis', 'Nursing', 'Underemployed', 'Foreign', 'Global Health Services', NULL, NULL, 0),
('U008', 'yukiro.miller@example.com', 'Farry', 'D.', 'Miller', 'Electrical Engineering', 'Employee', 'Domestic', 'ElectroTech Inc.', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
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
  `company` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `commid` varchar(30) NOT NULL,
  `content` mediumtext NOT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `xpid` varchar(20) NOT NULL,
  `userid` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`commid`, `content`, `publishtimestamp`, `xpid`, `userid`) VALUES
('C001', 'Great work on the web applications! Really impressive!', '2024-01-15 20:00:00', 'XP001', 'U002'),
('C002', 'Your marketing strategies are very effective!', '2023-06-20 18:15:00', 'XP002', 'U003'),
('C003', 'The mechanical systems you designed are innovative.', '2024-02-05 22:20:00', 'XP003', 'U004'),
('C004', 'Thank you for your care during my recovery!', '2023-11-25 16:00:00', 'XP004', 'U001'),
('C005', 'Excited to see your designs for electrical systems!', '2024-04-10 21:50:00', 'XP005', 'U006');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eventid` varchar(20) NOT NULL,
  `title` text NOT NULL,
  `description` mediumtext NOT NULL,
  `category` enum('Seminar','Thanksgiving','Festival','Reunion') NOT NULL,
  `eventtime` time NOT NULL,
  `eventdate` date NOT NULL,
  `eventloc` varchar(255) NOT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `eventphoto` blob NOT NULL,
  `userid` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventid`, `title`, `description`, `category`, `eventtime`, `eventdate`, `eventloc`, `publishtimestamp`, `eventphoto`, `userid`) VALUES
('E001', 'Company Reunion', 'A grand reunion for alumni', 'Reunion', '18:00:00', '2025-11-25', 'Loakan Airport, Baguio', '2024-10-23 14:30:35', NULL, 'U003'),
('E002', 'Alumni Mass', 'An event for alumni to gather for mass', 'Seminar', '10:00:00', '2025-12-01', 'Baguio Cathedral', '2024-10-23 14:30:40', NULL, 'U002'),
('E003', 'Annual Thanksgiving', 'A time to give thanks', 'Thanksgiving', '11:00:00', '2025-11-20', 'Baguio City Hall', '2024-10-23 14:30:44', NULL, 'U001'),
('E004', 'Coding Seminar', 'A seminar on the latest IT trends', 'Seminar', '09:30:00', '2025-10-30', 'SLU Prince Bernhard Gym', '2024-10-23 14:30:49', NULL, 'U006'),
('E005', 'Tech Conference', 'Discuss innovations in technology', 'Seminar', '13:00:00', '2025-11-15', 'Conference Hall', '2024-10-23 14:30:54', NULL, 'U008'),
('E006', 'Annual Festival', 'Celebrate alumni achievements', 'Festival', '17:00:00', '2025-12-15', 'Malcolm Square, Baguio', '2024-10-23 14:30:59', NULL, 'U007'),
('E007', 'Bisaya Monke Parte', 'Mag-uban kita sa usa ka makalingaw ug buhi nga Bisaya Monkey Party, usa ka espesyal nga selebrasyon puno sa kusog, katawa, ug lokal nga kultura! Kini nga kalihokan gipasiugda sa kalingawan ug pagka-curious sa mga unggoy, ug mahimong usa ka gabii nga puno sa kalipay ug dili malimtan nga mga higayon, nga puno sa Bisaya nga musika, lingaw, ug mga dula.', 'Festival', '12:00:00', '2030-12-12', 'Burat, Samar', '2024-10-23 14:32:59', NULL, '7777');

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `xpid` varchar(20) NOT NULL,
  `title` text NOT NULL,
  `body` mediumtext NOT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `userid` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`xpid`, `title`, `body`, `publishtimestamp`, `userid`) VALUES
('XP001', 'Software Developer', 'Developed and maintained web applications using JavaScript and React.', '2024-01-14 18:00:00', 'U001'),
('XP002', 'Marketing Intern', 'Assisted in creating marketing campaigns and managing social media accounts.', '2023-06-19 17:30:00', 'U002'),
('XP003', 'Mechanical Engineer', 'Worked on product design and development for mechanical systems.', '2024-02-04 16:45:00', 'U004'),
('XP004', 'Nursing Assistant', 'Assisted nurses in patient care and daily activities.', '2023-11-24 15:00:00', 'U007'),
('XP005', 'Electrical Engineer Intern', 'Assisted in designing electrical systems for new products.', '2024-04-09 18:30:00', 'U008');

-- --------------------------------------------------------

--
-- Table structure for table `experienceimage`
--

CREATE TABLE `experienceimage` (
  `xpid` varchar(20) NOT NULL,
  `xpimage` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `interestedinevent`
--

CREATE TABLE `interestedinevent` (
  `eventid` varchar(20) NOT NULL,
  `userid` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `interestedinevent`
--

INSERT INTO `interestedinevent` (`eventid`, `userid`) VALUES
('E001', 'U001'),
('E002', 'U002'),
('E003', 'U004'),
('E004', 'U006'),
('E005', 'U003'),
('E006', 'U007');

-- --------------------------------------------------------

--
-- Table structure for table `interestedinjobpost`
--

CREATE TABLE `interestedinjobpost` (
  `jobpid` varchar(20) NOT NULL,
  `userid` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `interestedinjobpost`
--

INSERT INTO `interestedinjobpost` (`jobpid`, `userid`) VALUES
('JP001', 'U001'),
('JP002', 'U002'),
('JP003', 'U004'),
('JP004', 'U007'),
('JP005', 'U008');

-- --------------------------------------------------------

--
-- Table structure for table `jobpost`
--

CREATE TABLE `jobpost` (
  `jobpid` varchar(20) NOT NULL,
  `title` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `companyname` varchar(255) NOT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `userid` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `jobpost`
--

INSERT INTO `jobpost` (`jobpid`, `title`, `location`, `description`, `companyname`, `publishtimestamp`, `userid`) VALUES
('JP001', 'Software Developer', 'New York, USA', 'Looking for a skilled developer.', 'Tech Solutions', '2024-10-20 22:17:13', 'U004'),
('JP002', 'Marketing Manager', 'London, UK', 'We need an experienced marketing manager.', 'Marketing Corp', '2024-10-10 22:17:13', 'U008'),
('JP003', 'IT Support Specialist', 'Toronto, Canada', 'Provide tech support.', 'Help Desk Services', '2024-10-20 18:17:13', 'U005'),
('JP004', 'Data Analyst', 'Sydney, Australia', 'Analyze business data.', 'Data Insights', '2024-10-30 22:17:13', 'U008'),
('JP005', 'Web Developer', 'Berlin, Germany', 'Develop high-quality websites.', 'Web Works', '2024-09-30 22:17:13', 'U005'),
('JP006', 'Web Developer (Cebuano Bilingual)', 'Burat, Samar', 'Ang Kusabot nagapangita og Web Developer nga adunay kaalam sa pagdesinyo ug pag-develop sa mga modernong website ug web applications. Ang imong trabaho mao ang pag-develop sa mga websites nga responsive, user-friendly, ug mobarug sumala sa mga panginahanglan sa negosyo.', 'Kusabot', '2024-10-23 13:43:26', '7777');

-- --------------------------------------------------------

--
-- Table structure for table `reportedexperience`
--

CREATE TABLE `reportedexperience` (
  `xpid` varchar(20) NOT NULL,
  `userid` varchar(15) NOT NULL,
  `reason` enum('Inappropriate Post','Pornographic Material','Troll','Hate Speech') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `reportedexperience`
--

INSERT INTO `reportedexperience` (`xpid`, `userid`, `reason`) VALUES
('XP001', 'U002', 'Inappropriate Post'),
('XP002', 'U006', 'Pornographic Material'),
('XP003', 'U005', 'Hate Speech'),
('XP004', 'U001', 'Troll'),
('XP005', 'U007', 'Inappropriate Post');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` varchar(15) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` longtext NOT NULL,
  `usertype` enum('Alumni','Manager','Admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `password`, `usertype`) VALUES
('7777', 'admin', 'admin', 'Admin'),
('U001', 'shaun', 'meeh', 'Alumni'),
('U002', 'joyce', 'pazzword', 'Alumni'),
('U003', 'judelyn', 'eabab', 'Alumni'),
('U004', 'jae', 'cazzy', 'Manager'),
('U005', 'choyoyoy', '4321', 'Manager'),
('U006', 'peeachybee', 'hey123', 'Alumni'),
('U007', 'cayeli', 'joyce', 'Alumni'),
('U008', 'yukiro', 'admin', 'Manager');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumni`
--
ALTER TABLE `alumni`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`applicantid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`commid`),
  ADD KEY `xpid` (`xpid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eventid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`xpid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `experienceimage`
--
ALTER TABLE `experienceimage`
  ADD PRIMARY KEY (`xpid`);

--
-- Indexes for table `interestedinevent`
--
ALTER TABLE `interestedinevent`
  ADD PRIMARY KEY (`eventid`,`userid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `interestedinjobpost`
--
ALTER TABLE `interestedinjobpost`
  ADD PRIMARY KEY (`jobpid`,`userid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `jobpost`
--
ALTER TABLE `jobpost`
  ADD PRIMARY KEY (`jobpid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `reportedexperience`
--
ALTER TABLE `reportedexperience`
  ADD PRIMARY KEY (`xpid`,`userid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alumni`
--
ALTER TABLE `alumni`
  ADD CONSTRAINT `alumni_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`xpid`) REFERENCES `experience` (`xpid`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);

--
-- Constraints for table `experience`
--
ALTER TABLE `experience`
  ADD CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `alumni` (`userid`);

--
-- Constraints for table `experienceimage`
--
ALTER TABLE `experienceimage`
  ADD CONSTRAINT `experienceimage_ibfk_1` FOREIGN KEY (`xpid`) REFERENCES `experience` (`xpid`);

--
-- Constraints for table `interestedinevent`
--
ALTER TABLE `interestedinevent`
  ADD CONSTRAINT `interestedinevent_ibfk_1` FOREIGN KEY (`eventid`) REFERENCES `event` (`eventid`),
  ADD CONSTRAINT `interestedinevent_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `alumni` (`userid`);

--
-- Constraints for table `interestedinjobpost`
--
ALTER TABLE `interestedinjobpost`
  ADD CONSTRAINT `interestedinjobpost_ibfk_1` FOREIGN KEY (`jobpid`) REFERENCES `jobpost` (`jobpid`),
  ADD CONSTRAINT `interestedinjobpost_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `alumni` (`userid`);

--
-- Constraints for table `jobpost`
--
ALTER TABLE `jobpost`
  ADD CONSTRAINT `jobpost_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);

--
-- Constraints for table `reportedexperience`
--
ALTER TABLE `reportedexperience`
  ADD CONSTRAINT `reportedexperience_ibfk_1` FOREIGN KEY (`xpid`) REFERENCES `experience` (`xpid`),
  ADD CONSTRAINT `reportedexperience_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `alumni` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
