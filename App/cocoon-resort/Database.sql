-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2019 at 12:29 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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

CREATE TABLE `clients_t` (
  `client_id` int(11) NOT NULL,
  `client_name` varchar(500) NOT NULL,
  `client_password` varchar(200) NOT NULL,
  `client_phone` int(11) NOT NULL,
  `client_email` varchar(200) NOT NULL,
  `client_isVerified` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients_t`
--

INSERT INTO `clients_t` (`client_id`, `client_name`, `client_password`, `client_phone`, `client_email`, `client_isVerified`) VALUES
(6, 'robert khayat', '123', 3060933, 'robert.g.khayat@gmail.com', b'0'),
(7, 'kevin boghossian', '123', 3060933, 'kevin.boghossians@gmail.com', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `packages_t`
--

CREATE TABLE `packages_t` (
  `package_id` int(11) NOT NULL,
  `package_name` varchar(200) NOT NULL DEFAULT 'unknown',
  `resort_id` int(11) DEFAULT NULL,
  `package_detail` varchar(500) DEFAULT NULL,
  `package_price` int(11) NOT NULL,
  `package_from` varchar(500) NOT NULL,
  `package_to` varchar(500) DEFAULT NULL,
  `package_guests` int(11) NOT NULL DEFAULT '1',
  `package_image` varchar(200) NOT NULL DEFAULT '/default',
  `package_isReserved` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `packages_t`
--

INSERT INTO `packages_t` (`package_id`, `package_name`, `resort_id`, `package_detail`, `package_price`, `package_from`, `package_to`, `package_guests`, `package_image`, `package_isReserved`) VALUES
(1, 'unknown', 1, 'a la montagne a cheval', 200, '', '', 1, '', b'0'),
(2, 'Weekend', 1, 'well well', 100, '', '', 2, '/default', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `reservations_t`
--

CREATE TABLE `reservations_t` (
  `reservation_id` int(11) NOT NULL,
  `package_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `resort_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `reservation_from` varchar(200) DEFAULT NULL,
  `reservation_to` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservations_t`
--

INSERT INTO `reservations_t` (`reservation_id`, `package_id`, `client_id`, `resort_id`, `quantity`, `reservation_from`, `reservation_to`) VALUES
(1, 1, 6, 1, 2, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `resorts_t`
--

CREATE TABLE `resorts_t` (
  `resort_id` int(11) NOT NULL,
  `resort_name` varchar(100) NOT NULL,
  `resort_password` varchar(200) NOT NULL,
  `resort_location` varchar(100) NOT NULL,
  `resort_category` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `resorts_t`
--

INSERT INTO `resorts_t` (`resort_id`, `resort_name`, `resort_password`, `resort_location`, `resort_category`) VALUES
(1, 'CookieResort', '123', 'Beit Chabeb', 'Mountains'),
(3, 'laklouk', '123', 'laklouk', 'Mountains');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients_t`
--
ALTER TABLE `clients_t`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `client_email` (`client_email`);

--
-- Indexes for table `packages_t`
--
ALTER TABLE `packages_t`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `reservations_t`
--
ALTER TABLE `reservations_t`
  ADD PRIMARY KEY (`reservation_id`);

--
-- Indexes for table `resorts_t`
--
ALTER TABLE `resorts_t`
  ADD PRIMARY KEY (`resort_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients_t`
--
ALTER TABLE `clients_t`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `packages_t`
--
ALTER TABLE `packages_t`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `reservations_t`
--
ALTER TABLE `reservations_t`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `resorts_t`
--
ALTER TABLE `resorts_t`
  MODIFY `resort_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
