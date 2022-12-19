-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 19, 2022 at 08:51 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `creazione`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_no` varchar(40) NOT NULL,
  `ifsc_code` varchar(40) NOT NULL,
  `bank` varchar(100) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL COMMENT '1-customer 2- associate 3-employee',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `account_no`, `ifsc_code`, `bank`, `user_id`, `user_type`, `status`) VALUES
(1, '999999', 'qkqkqkkqaaooa', 'qkkqkqk', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `phone`, `email`, `image`, `pass`, `status`) VALUES
(2, 'Super Admin', '88888', 'admin@crzn.com', 'nadnadadh', '$2b$10$sK9nPs4C4WIbvkSJ5ZTBIuEsVZGvZMwRwDxhvd3eYyR3kLj570U62', 1),
(3, 'uuuu', '999999999', 'uuuu00', 'nnn00', '666600', 2);

-- --------------------------------------------------------

--
-- Table structure for table `associate`
--

DROP TABLE IF EXISTS `associate`;
CREATE TABLE IF NOT EXISTS `associate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `gender` tinyint(4) NOT NULL COMMENT '0-male 1-female 2-others',
  `email` varchar(80) NOT NULL,
  `commission_rate` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL COMMENT '0-admin anyid-employee id',
  `phone` varchar(15) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `pass` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-active 0-not active',
  `referral_key` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `referral_key` (`referral_key`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `associate`
--

INSERT INTO `associate` (`id`, `name`, `gender`, `email`, `commission_rate`, `employee_id`, `phone`, `balance`, `pass`, `image`, `status`, `referral_key`) VALUES
(1, 'Gour Halder', 1, 'gour12@gmail.com', 5, 1, '9823415678', 0, '$2b$10$hITq2vpVC9nh/B/0238u7.oiPRo6kZq1ksAVye.eH8t5WpM.FUp8C', 'cc5a2ea4f0ab2981113f70e34e3d8cff__1671170846364.jpg', 1, '23');

-- --------------------------------------------------------

--
-- Table structure for table `associate_payments`
--

DROP TABLE IF EXISTS `associate_payments`;
CREATE TABLE IF NOT EXISTS `associate_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `associate_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `account_no` varchar(50) NOT NULL,
  `ifsc_code` varchar(50) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `reference_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `gender` tinyint(4) NOT NULL COMMENT '0-male 1-female 2-others',
  `email` varchar(80) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `referred_by` varchar(20) DEFAULT NULL,
  `pass` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-active 0-not active',
  `referral_key` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `referral_key` (`referral_key`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `gender`, `email`, `phone`, `balance`, `referred_by`, `pass`, `image`, `status`, `referral_key`) VALUES
(1, 'Bilash Halder', 1, 'ibilash1@gmail.com', '9987654325', 0, '12', '$2b$10$r.XcnukxGlhhqfhU4fo/AeghbVnFt40iGRLvVyuHr7WLQmrQdK6IS', 'b16e407218c05a5afcebeea41ecdbe1c__1671170717835.jpg', 1, 'ppppp');

-- --------------------------------------------------------

--
-- Table structure for table `deposit`
--

DROP TABLE IF EXISTS `deposit`;
CREATE TABLE IF NOT EXISTS `deposit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mode` int(11) NOT NULL COMMENT '1-offline 2-upi 3-others',
  `doc` varchar(100) NOT NULL,
  `reference` varchar(50) NOT NULL,
  `remarks` varchar(400) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0-pending 1-success 2-reject',
  `amount` double NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
CREATE TABLE IF NOT EXISTS `designation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `title`) VALUES
(1, 'WEB DEVELOPER'),
(2, 'WEB DESIGNER'),
(3, 'SALES');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `gender` tinyint(4) NOT NULL COMMENT '0-male 1-female 2-others',
  `email` varchar(80) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `pass` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-active 0-not active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `gender`, `email`, `phone`, `balance`, `pass`, `image`, `status`) VALUES
(1, 'Dipankar Khan', 0, 'dip96@gmail.com', '9593456723', 0, '$2b$10$P9JxkIp/kvvZx4.LzJr49efs3WYrqDgMrS8zd8R.bDPHbL6GbhqkS', '7d56806e675a892e5055ed43ba21dbbb__1671169319847.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee_info`
--

DROP TABLE IF EXISTS `employee_info`;
CREATE TABLE IF NOT EXISTS `employee_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `designation_id` int(11) NOT NULL,
  `salary_id` int(11) NOT NULL,
  `leave_id` int(11) DEFAULT NULL,
  `dob` date NOT NULL,
  `report_to` int(11) DEFAULT NULL,
  `joining_date` date NOT NULL,
  `acceptance_file` varchar(100) DEFAULT NULL,
  `id_card` tinyint(1) DEFAULT NULL,
  `last_payment` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

DROP TABLE IF EXISTS `holidays`;
CREATE TABLE IF NOT EXISTS `holidays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `h_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`id`, `title`, `h_date`) VALUES
(1, 'CRISTMASS DAY', '2022-12-25');

-- --------------------------------------------------------

--
-- Table structure for table `investment`
--

DROP TABLE IF EXISTS `investment`;
CREATE TABLE IF NOT EXISTS `investment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `user_type` int(11) NOT NULL DEFAULT '1' COMMENT '1-customer 2-associate 3-Employee',
  `ammount` float NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roi` float NOT NULL DEFAULT '5',
  `nominee_id` int(11) NOT NULL,
  `account_no` varchar(40) NOT NULL,
  `payment_id` varchar(100) DEFAULT NULL,
  `agreement_file` varchar(100) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-pending 1-Active 2-withdraw 3-close',
  `withdrw_req_time` datetime DEFAULT NULL,
  `is_send` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-Not send 1-send',
  `referral_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `kyc`
--

DROP TABLE IF EXISTS `kyc`;
CREATE TABLE IF NOT EXISTS `kyc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adhar_no` varchar(20) NOT NULL,
  `pan_no` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `adhar_verified` tinyint(1) NOT NULL,
  `pan_verified` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kyc`
--

INSERT INTO `kyc` (`id`, `adhar_no`, `pan_no`, `address`, `adhar_verified`, `pan_verified`, `user_id`, `user_type`) VALUES
(1, '9270 4236 7580', 'CNIPK2345B', 'JELERHAT', 1, 1, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `leave_application`
--

DROP TABLE IF EXISTS `leave_application`;
CREATE TABLE IF NOT EXISTS `leave_application` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `total_days` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0-pending 1-accepted 2-rejected',
  `application_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `leave_category`
--

DROP TABLE IF EXISTS `leave_category`;
CREATE TABLE IF NOT EXISTS `leave_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `annual` int(11) DEFAULT NULL,
  `casual` int(11) DEFAULT NULL,
  `sick` int(11) DEFAULT NULL,
  `maternity` int(11) DEFAULT NULL,
  `bereavement` int(11) DEFAULT NULL,
  `others` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leave_category`
--

INSERT INTO `leave_category` (`id`, `annual`, `casual`, `sick`, `maternity`, `bereavement`, `others`) VALUES
(1, 12, 2, 5, 5, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `leave_remain`
--

DROP TABLE IF EXISTS `leave_remain`;
CREATE TABLE IF NOT EXISTS `leave_remain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `annual` int(11) NOT NULL,
  `casual` int(11) NOT NULL,
  `sick` int(11) NOT NULL,
  `maternity` int(11) NOT NULL,
  `bereavement` int(11) NOT NULL,
  `others` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `nominee`
--

DROP TABLE IF EXISTS `nominee`;
CREATE TABLE IF NOT EXISTS `nominee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL COMMENT '1-customer 2-associate',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_mode` varchar(50) NOT NULL COMMENT '1-offline 2-online 3-others',
  `transaction_id` varchar(40) NOT NULL,
  `ammount` double NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT ' 0-failed 1-success 2-pending',
  `to_account` varchar(40) DEFAULT NULL,
  `from_account` varchar(40) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payout`
--

DROP TABLE IF EXISTS `payout`;
CREATE TABLE IF NOT EXISTS `payout` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invesment_id` int(11) NOT NULL,
  `account_no` varchar(30) NOT NULL,
  `ifsc_code` varchar(30) NOT NULL,
  `amount` float NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  `transaction_id` varchar(30) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-sucess 0-failed 2-pending 1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `qualification`
--

DROP TABLE IF EXISTS `qualification`;
CREATE TABLE IF NOT EXISTS `qualification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `degree_name` varchar(100) NOT NULL,
  `year_of_pass` int(11) NOT NULL,
  `degree_from` varchar(100) NOT NULL,
  `marks` float NOT NULL,
  `document_url` varchar(100) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
CREATE TABLE IF NOT EXISTS `request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `subject` varchar(1000) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `remarks` varchar(600) DEFAULT NULL,
  `request_type` int(11) DEFAULT NULL COMMENT '1-contact us 2-BA 3-CSP',
  `status` int(11) DEFAULT '0' COMMENT '0-pending 1-complete',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `name`, `subject`, `message`, `email`, `phone`, `remarks`, `request_type`, `status`) VALUES
(1, 'mmmmmmmm', 'mmmmmmmmmm', 'mmmmmmm', 'mmmmmmm', '11111', '111kkkqkkqkq', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

DROP TABLE IF EXISTS `salary`;
CREATE TABLE IF NOT EXISTS `salary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `basic` float NOT NULL DEFAULT '0',
  `hra` float NOT NULL DEFAULT '0',
  `conveyance` float NOT NULL DEFAULT '0',
  `medical` float NOT NULL DEFAULT '0',
  `special` float NOT NULL DEFAULT '0',
  `pf` float NOT NULL DEFAULT '0',
  `insurance` float NOT NULL DEFAULT '0',
  `tax` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `basic`, `hra`, `conveyance`, `medical`, `special`, `pf`, `insurance`, `tax`) VALUES
(1, 100.89, 10000, 100, 100, 1000, 100, 100, 100),
(2, 25000, 200, 400, 200, 1000, 399, 0, 400),
(4, 100, 10000, 100, 100, 1000, 100, 100, 100);

-- --------------------------------------------------------

--
-- Table structure for table `salary_credit`
--

DROP TABLE IF EXISTS `salary_credit`;
CREATE TABLE IF NOT EXISTS `salary_credit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `account_no` varchar(50) NOT NULL,
  `ifsc_code` varchar(50) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `amount` float NOT NULL,
  `status` int(11) NOT NULL,
  `transaction_id` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `withdrawal`
--

DROP TABLE IF EXISTS `withdrawal`;
CREATE TABLE IF NOT EXISTS `withdrawal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `account` varchar(50) NOT NULL,
  `ifsc_code` varchar(50) NOT NULL,
  `reference_id` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `request_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `withdrawal_request`
--

DROP TABLE IF EXISTS `withdrawal_request`;
CREATE TABLE IF NOT EXISTS `withdrawal_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `account` varchar(50) NOT NULL,
  `ifsc_code` varchar(50) NOT NULL,
  `reference_id` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `request_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `work_report`
--

DROP TABLE IF EXISTS `work_report`;
CREATE TABLE IF NOT EXISTS `work_report` (
  `report_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `report_date` date DEFAULT NULL,
  `start_time` varchar(50) DEFAULT NULL,
  `report_to` int(11) DEFAULT NULL,
  `submit_time` time DEFAULT NULL,
  `report` varchar(1000) DEFAULT NULL,
  `document_url` varchar(100) DEFAULT NULL,
  `login_location` varchar(200) DEFAULT NULL,
  `logout_location` varchar(200) DEFAULT NULL,
  `reject_for` varchar(200) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '2' COMMENT '1-accept 0-reject 2-pending 3-submitted',
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
