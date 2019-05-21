-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 21, 2019 at 01:30 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resort`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients_t`
--

DROP TABLE IF EXISTS `clients_t`;
CREATE TABLE IF NOT EXISTS `clients_t` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(500) CHARACTER SET latin1 NOT NULL,
  `client_password` varchar(200) CHARACTER SET latin1 NOT NULL,
  `client_phone` int(11) NOT NULL,
  `client_email` varchar(200) CHARACTER SET latin1 NOT NULL,
  `client_isVerified` bit(1) DEFAULT b'0',
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `clients_t`
--

INSERT INTO `clients_t` (`client_id`, `client_name`, `client_password`, `client_phone`, `client_email`, `client_isVerified`) VALUES
(6, 'robert khayat', '123', 3060933, 'robert.g.khayat@gmail.com', b'0'),
(7, 'kevin boghossian', '456', 3060933, 'kevin.boghossian@gmail.com', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `images_t`
--

DROP TABLE IF EXISTS `images_t`;
CREATE TABLE IF NOT EXISTS `images_t` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `package_id` int(11) NOT NULL,
  `image_name` varchar(500) NOT NULL,
  `image_path` varchar(500) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `package_id` (`package_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images_t`
--

INSERT INTO `images_t` (`image_id`, `package_id`, `image_name`, `image_path`) VALUES
(1, 7, '613147.jpg', 'C:\\Users\\user\\AppData\\Roaming\\NetBeans\\8.0.2\\config\\GF_4.1\\domain1\\tmpfiles\\613147.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `packages_t`
--

DROP TABLE IF EXISTS `packages_t`;
CREATE TABLE IF NOT EXISTS `packages_t` (
  `package_id` int(11) NOT NULL AUTO_INCREMENT,
  `package_name` varchar(200) NOT NULL DEFAULT 'unknown',
  `resort_id` int(11) DEFAULT NULL,
  `package_detail` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `package_price` int(11) NOT NULL,
  `package_from` date DEFAULT '1990-01-01',
  `package_to` date DEFAULT '3000-01-01',
  `package_capacity` int(11) NOT NULL DEFAULT '1',
  `package_isReserved` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`package_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `packages_t`
--

INSERT INTO `packages_t` (`package_id`, `package_name`, `resort_id`, `package_detail`, `package_price`, `package_from`, `package_to`, `package_capacity`, `package_isReserved`) VALUES
(1, '\0unknown', 1, 'a la montagne a cheval ', 200, '1990-01-01', '3000-01-01', 1, b'0'),
(2, '\0Weekend', 1, 'well well', 100, '1990-01-01', '3000-01-01', 2, b'0'),
(3, 'test', 1, 'lalala', 200, '1990-01-01', '3000-01-01', 2, b'0'),
(4, 'test2', 1, 'lalala', 200, '1990-01-01', '3000-01-01', 2, b'0'),
(5, 'le bon test', 1, 'ceci est un bon test', 200, '1990-01-01', '3000-01-01', 0, b'0'),
(6, 'final test', 1, 'this is hopefully the last test', 400, '1990-01-01', '3000-01-01', 0, b'0'),
(7, 'qwer', 1, 'this is hahah', 300, '2019-05-27', '2019-05-31', 20, b'0'),
(8, 'alo?', 1, 'Hello World', 101, '2000-01-01', '2001-01-01', 5, b'0'),
(9, 'alo?!?', 1, 'Hello World', 101, '2000-01-01', '2001-01-01', 5, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `reservations_t`
--

DROP TABLE IF EXISTS `reservations_t`;
CREATE TABLE IF NOT EXISTS `reservations_t` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `package_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `resort_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `fk_clients_t_reservations_t` (`client_id`),
  KEY `fk_resorts_t_reservations_t` (`resort_id`),
  KEY `fk_packages_t_reservations_t` (`package_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reservations_t`
--

INSERT INTO `reservations_t` (`reservation_id`, `package_id`, `client_id`, `resort_id`, `quantity`) VALUES
(1, 1, 6, 1, 2),
(2, 1, 7, 1, 2),
(3, 1, 6, 1, 2),
(4, 1, 7, 1, 2),
(5, 1, 7, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `resorts_t`
--

DROP TABLE IF EXISTS `resorts_t`;
CREATE TABLE IF NOT EXISTS `resorts_t` (
  `resort_id` int(11) NOT NULL AUTO_INCREMENT,
  `resort_name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `resort_password` varchar(200) CHARACTER SET latin1 NOT NULL,
  `resort_location` varchar(100) CHARACTER SET latin1 NOT NULL,
  `resort_category` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`resort_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `resorts_t`
--

INSERT INTO `resorts_t` (`resort_id`, `resort_name`, `resort_password`, `resort_location`, `resort_category`) VALUES
(1, 'CookieResort', '123', 'Beit Chabeb', 'Mountains'),
(3, 'laklouk', '123', 'laklouk', 'Mountains');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `images_t`
--
ALTER TABLE `images_t`
  ADD CONSTRAINT `fk_packages_t_images_t` FOREIGN KEY (`package_id`) REFERENCES `packages_t` (`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `reservations_t`
--
ALTER TABLE `reservations_t`
  ADD CONSTRAINT `fk_clients_t_reservations_t` FOREIGN KEY (`client_id`) REFERENCES `clients_t` (`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_packages_t_reservations_t` FOREIGN KEY (`package_id`) REFERENCES `packages_t` (`package_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_resorts_t_reservations_t` FOREIGN KEY (`resort_id`) REFERENCES `resorts_t` (`resort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
