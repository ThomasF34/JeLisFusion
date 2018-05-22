-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 16, 2018 at 03:59 PM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `KidsWorld`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `idAuthor` bigint(10) UNSIGNED NOT NULL,
  `nameAuthor` varchar(30) NOT NULL,
  `fNameAuthor` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `idBook` bigint(10) UNSIGNED NOT NULL,
  `titleBook` varchar(30) NOT NULL,
  `ISBN` varchar(20) DEFAULT NULL,
  `summary` text,
  `srcImage` varchar(30) DEFAULT NULL,
  `price` int(10) UNSIGNED DEFAULT NULL,
  `nbStock` int(10) UNSIGNED DEFAULT NULL,
  `idCategory` bigint(10) UNSIGNED NOT NULL,
  `idPublisher` bigint(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `idCategory` bigint(10) UNSIGNED NOT NULL,
  `minAge` int(10) UNSIGNED NOT NULL,
  `maxAge` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `participate`
--

CREATE TABLE `participate` (
  `idWorkshop` bigint(10) UNSIGNED NOT NULL,
  `idUser` bigint(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `publisher`
--

CREATE TABLE `publisher` (
  `idPublisher` bigint(10) UNSIGNED NOT NULL,
  `namePublisher` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUser` bigint(10) UNSIGNED NOT NULL,
  `nameUser` varchar(30) NOT NULL,
  `fNameUser` varchar(30) NOT NULL,
  `password` varchar(64) DEFAULT NULL,
  `email` varchar(320) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `registerDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `workshop`
--

CREATE TABLE `workshop` (
  `idWorkshop` bigint(10) UNSIGNED NOT NULL,
  `dateWorkshop` datetime NOT NULL,
  `nbSeat` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `written`
--

CREATE TABLE `written` (
  `idBook` bigint(10) UNSIGNED NOT NULL,
  `idAuthor` bigint(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`idAuthor`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`idBook`),
  ADD KEY `fk_BookCategory` (`idCategory`),
  ADD KEY `fk_BookPublisher` (`idPublisher`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`idCategory`);

--
-- Indexes for table `participate`
--
ALTER TABLE `participate`
  ADD PRIMARY KEY (`idWorkshop`,`idUser`),
  ADD KEY `fk_ParticipateUser` (`idUser`);

--
-- Indexes for table `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`idPublisher`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- Indexes for table `workshop`
--
ALTER TABLE `workshop`
  ADD PRIMARY KEY (`idWorkshop`);

--
-- Indexes for table `written`
--
ALTER TABLE `written`
  ADD PRIMARY KEY (`idBook`,`idAuthor`),
  ADD KEY `fk_WrittenAuthor` (`idAuthor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `idAuthor` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `idBook` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `idCategory` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `publisher`
--
ALTER TABLE `publisher`
  MODIFY `idPublisher` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `workshop`
--
ALTER TABLE `workshop`
  MODIFY `idWorkshop` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `fk_BookCategory` FOREIGN KEY (`idCategory`) REFERENCES `category` (`idCategory`),
  ADD CONSTRAINT `fk_BookPublisher` FOREIGN KEY (`idPublisher`) REFERENCES `Publisher` (`idPublisher`);

--
-- Constraints for table `participate`
--
ALTER TABLE `participate`
  ADD CONSTRAINT `fk_ParticipateUser` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`),
  ADD CONSTRAINT `fk_ParticipateWorkshop` FOREIGN KEY (`idWorkshop`) REFERENCES `Workshop` (`idWorkshop`);

--
-- Constraints for table `written`
--
ALTER TABLE `written`
  ADD CONSTRAINT `fk_WrittenAuthor` FOREIGN KEY (`idAuthor`) REFERENCES `AUTHOR` (`idAuthor`),
  ADD CONSTRAINT `fk_WrittenBook` FOREIGN KEY (`idBook`) REFERENCES `Book` (`idBook`);
