-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2019 at 04:12 PM
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
  `client_phone` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `packages_t`
--

CREATE TABLE `packages_t` (
  `package_id` int(11) NOT NULL,
  `resort_id` int(11) DEFAULT NULL,
  `package_detail` varchar(500) NOT NULL,
  `package_price` int(11) NOT NULL,
  `package_from` varchar(500) NOT NULL,
  `package_to` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reservations_t`
--

CREATE TABLE `reservations_t` (
  `package_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `resorts_t`
--

CREATE TABLE `resorts_t` (
  `resort_id` int(11) NOT NULL,
  `resort_name` varchar(100) NOT NULL,
  `resort_location` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients_t`
--
ALTER TABLE `clients_t`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `packages_t`
--
ALTER TABLE `packages_t`
  ADD PRIMARY KEY (`package_id`);

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
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `packages_t`
--
ALTER TABLE `packages_t`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `resorts_t`
--
ALTER TABLE `resorts_t`
  MODIFY `resort_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
