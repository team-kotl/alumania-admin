-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2024 at 04:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `empstatus` enum('employee','unemployed','underemployed') DEFAULT NULL,
  `location` enum('Domestic','Foreign') DEFAULT NULL,
  `displaypic` mediumblob DEFAULT NULL,
  `banned` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `alumni`
--

INSERT INTO `alumni` (`userid`, `email`, `firstname`, `middlename`, `lastname`, `empstatus`, `location`, `displaypic`, `banned`) VALUES
('U001', 'seany@gmail.com', 'Sean', 'A.', 'Aromin', 'employee', 'Domestic', NULL, 0),
('U002', 'cariel@gmail.com', 'Cariel', 'G.', 'Maga', 'unemployed', 'Foreign', NULL, 0),
('U003', 'eduje@gmail.com', 'Jude', 'C.', 'Illumin', 'underemployed', 'Domestic', NULL, 0),
('U006', 'peachy@gmail.com', 'Peach', NULL, 'Encarnacion', 'employee', 'Foreign', NULL, 0),
('U007', 'presky@gmail.com', 'Earl', 'R', 'Encarnacion', 'unemployed', 'Domestic', NULL, 1),
('U008', 'gio@gmail.com', 'gio', 'H.', 'Leo', 'employee', 'Foreign', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `commid` varchar(30) NOT NULL,
  `content` mediumtext DEFAULT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `xpid` varchar(20) DEFAULT NULL,
  `userid` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`commid`, `content`, `publishtimestamp`, `xpid`, `userid`) VALUES
('C001', 'Very relatable experience!', '2024-10-21 14:17:13', 'XP002', 'U003'),
('C002', 'Thanks for sharing!', '2024-10-21 14:17:13', 'XP001', 'U002'),
('C003', 'This really helped me.', '2024-10-21 14:17:13', 'XP005', 'U001'),
('C004', 'I experienced the same.', '2024-10-21 14:17:13', 'XP004', 'U007'),
('C005', 'Great advice!', '2024-10-21 14:17:13', 'XP003', 'U006');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eventid` varchar(20) NOT NULL,
  `title` text DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `category` enum('Mass','Reunion','Thanksgiving','Seminar','Conference','Festival','Workshop','Other') DEFAULT NULL,
  `eventtime` time DEFAULT NULL,
  `eventdate` date DEFAULT NULL,
  `eventloc` varchar(255) DEFAULT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userid` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventid`, `title`, `description`, `category`, `eventtime`, `eventdate`, `eventloc`, `publishtimestamp`, `userid`) VALUES
('E001', 'Company Reunion', 'A grand reunion for alumni', 'Reunion', '18:00:00', '2025-11-25', '\r\nNewtown Plaza Hotel', '2024-10-21 14:17:13', 'U003'),
('E002', 'Alumni Mass', 'An event for alumni to gather for mass', 'Mass', '10:00:00', '2025-12-01', 'Baguio Cathedral', '2024-10-21 14:17:13', 'U002'),
('E003', 'Annual Thanksgiving', 'A time to give thanks', 'Thanksgiving', '11:00:00', '2025-11-20', 'Baguio City Hall', '2024-10-21 14:17:13', 'U001'),
('E004', 'Coding Seminar', 'A seminar on the latest IT trends', 'Seminar', '09:30:00', '2025-10-30', 'SLU Prince Bernhard Gym', '2024-10-21 14:17:13', 'U006'),
('E005', 'Tech Conference', 'Discuss innovations in technology', 'Conference', '13:00:00', '2025-11-15', 'Conference Hall', '2024-10-21 14:17:13', 'U008'),
('E006', 'Annual Festival', 'Celebrate alumni achievements', 'Festival', '17:00:00', '2025-12-15', 'Malcolm Square, Baguio', '2024-10-21 14:17:13', 'U007');

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `xpid` varchar(20) NOT NULL,
  `title` text DEFAULT NULL,
  `body` mediumtext DEFAULT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userid` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`xpid`, `title`, `body`, `publishtimestamp`, `userid`) VALUES
('XP001', 'First Job Experience', 'My first job as a software developer.', '2024-10-21 14:17:13', 'U001'),
('XP002', 'Unemployment Struggles', 'Dealing with long-term unemployment.', '2024-10-21 14:17:13', 'U002'),
('XP003', 'Moving Abroad for Work', 'My journey working abroad.', '2024-10-21 14:17:13', 'U006'),
('XP004', 'Balancing Work and Life', 'How I manage work-life balance.', '2024-10-21 14:17:13', 'U008'),
('XP005', 'Career Growth Challenges', 'Facing challenges in underemployment.', '2024-10-21 14:17:13', 'U003');

-- --------------------------------------------------------

--
-- Table structure for table `experienceimage`
--

CREATE TABLE `experienceimage` (
  `xpid` varchar(20) NOT NULL,
  `xpimage` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobpost`
--

CREATE TABLE `jobpost` (
  `jobpid` varchar(20) NOT NULL,
  `title` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `companyname` varchar(255) DEFAULT NULL,
  `publishtimestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userid` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `jobpost`
--

INSERT INTO `jobpost` (`jobpid`, `title`, `location`, `description`, `companyname`, `publishtimestamp`, `userid`) VALUES
('JP001', 'Software Developer', 'New York, USA', 'Looking for a skilled developer.', 'Tech Solutions', '2024-10-21 14:17:13', 'U004'),
('JP002', 'Marketing Manager', 'London, UK', 'We need an experienced marketing manager.', 'Marketing Corp', '2024-10-21 14:17:13', 'U009'),
('JP003', 'IT Support Specialist', 'Toronto, Canada', 'Provide tech support.', 'Help Desk Services', '2024-10-21 14:17:13', 'U005'),
('JP004', 'Data Analyst', 'Sydney, Australia', 'Analyze business data.', 'Data Insights', '2024-10-21 14:17:13', 'U008'),
('JP005', 'Web Developer', 'Berlin, Germany', 'Develop high-quality websites.', 'Web Works', '2024-10-21 14:17:13', 'U003');

-- --------------------------------------------------------

--
-- Table structure for table `jobpostimage`
--

CREATE TABLE `jobpostimage` (
  `jobpid` varchar(20) NOT NULL,
  `jobpimage` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` varchar(15) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` longtext DEFAULT NULL,
  `usertype` enum('alumni','manager','admin') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `password`, `usertype`) VALUES
('U001', 'seansheep', 'meeh', 'alumni'),
('U002', 'joyce', 'pazz', 'alumni'),
('U003', 'eduj', 'eabab', 'alumni'),
('U004', 'jae', 'cazzy', 'manager'),
('U005', 'Choy', '4321', 'admin'),
('U006', 'peach', 'hey123', 'alumni'),
('U007', 'presky', 'hey321', 'alumni'),
('U008', 'giodavanni', 'leooo', 'alumni'),
('U009', 'ace', 'ngaosi', 'manager'),
('U010', 'HarryD', '1234', 'admin');

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
-- Indexes for table `jobpost`
--
ALTER TABLE `jobpost`
  ADD PRIMARY KEY (`jobpid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `jobpostimage`
--
ALTER TABLE `jobpostimage`
  ADD PRIMARY KEY (`jobpid`);

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
  ADD CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);

--
-- Constraints for table `experienceimage`
--
ALTER TABLE `experienceimage`
  ADD CONSTRAINT `experienceimage_ibfk_1` FOREIGN KEY (`xpid`) REFERENCES `experience` (`xpid`);

--
-- Constraints for table `jobpost`
--
ALTER TABLE `jobpost`
  ADD CONSTRAINT `jobpost_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`);

--
-- Constraints for table `jobpostimage`
--
ALTER TABLE `jobpostimage`
  ADD CONSTRAINT `jobpostimage_ibfk_1` FOREIGN KEY (`jobpid`) REFERENCES `jobpost` (`jobpid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
