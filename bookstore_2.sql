-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 08:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `ISBN` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL COMMENT 'category:\r\nthriller\r\naction\r\ndrama\r\ncrime\r\ncomic\r\nscientific',
  `image_url` varchar(255) NOT NULL,
  `rack_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `ISBN`, `title`, `author`, `subject`, `image_url`, `rack_number`) VALUES
(1, 150610, 'good doctor', 'omar', 'horror', 'asdadas', 23),
(5, 516465, 'black adam', 'omark', 'comedy', 'oathh', 10),
(6, 156421, '\"spiderman\"', '\"john\"', '\"comic\"', '1682706124247.jpg', 6),
(7, 156424, '\"xmen\"', '\"ahmed\"', '\"comic\"', '1682706163206.jpg', 6),
(8, 156424, '\"famous\"', '\"sameul\"', '\"comic\"', '1682706255271.jpg', 6),
(9, 156424, '\"famous\"', '\"sameul\"', '\"comic\"', '1682870227434.jpg', 6),
(10, 156424, '\"famous\"', '\"sameul\"', '\"comic\"', '1682977605565.jpg', 6),
(11, 123455, 'loader', 'omar', 'Action', '1683326054642.png', 58),
(12, 281392, 'lord of the 9 rings', 'omarr', 'action', '1683326356632.jpg', 10);

-- --------------------------------------------------------

--
-- Table structure for table `borrow_limit`
--

CREATE TABLE `borrow_limit` (
  `id` int(11) NOT NULL,
  `maxLimit` int(11) NOT NULL DEFAULT 3,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrow_limit`
--

INSERT INTO `borrow_limit` (`id`, `maxLimit`, `user_id`) VALUES
(4, 3, 43),
(5, 3, 44);

-- --------------------------------------------------------

--
-- Table structure for table `pending_user`
--

CREATE TABLE `pending_user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requested_book`
--

CREATE TABLE `requested_book` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `bookid` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `ret_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requested_book`
--

INSERT INTO `requested_book` (`id`, `userid`, `bookid`, `status`, `ret_date`) VALUES
(15, 39, 1, 'pending', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1 -> active\r\n0- in-active',
  `type` varchar(255) NOT NULL COMMENT '1- librarian\r\n2- normal',
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `phone`, `status`, `type`, `token`) VALUES
(39, 'omar kahled', 'omar@gmail.com', '12345678', '01118116517', 1, 'librarian', '520d8e5e880254ea31d7dd1fda14bcb6'),
(43, 'omar khaled ', 'omaar2121@gmail.com', '$2b$10$kWphPZxE.12ca/fAdPnLX.fFTBZQf9IVWKhj1KQs/mKpXo5hsd86i', '01118116511', 1, 'normal', '6dbbbb8e357710b8540004d134f8204a'),
(44, 'omar ahmed ', 'omaaar2a1231@gmail.com', '$2b$10$UOJoPFrXVLbaS9L0niHEq.FrwufVZspoEs1eyuFbBunoBh4Vi3Y42', '01118116511', 1, 'normal', '7e485a763322a09e06f4e772ba65ed3e');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrow_limit`
--
ALTER TABLE `borrow_limit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_const` (`user_id`);

--
-- Indexes for table `pending_user`
--
ALTER TABLE `pending_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requested_book`
--
ALTER TABLE `requested_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_foriegn_id` (`userid`),
  ADD KEY `book_constr_id` (`bookid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `borrow_limit`
--
ALTER TABLE `borrow_limit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pending_user`
--
ALTER TABLE `pending_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `requested_book`
--
ALTER TABLE `requested_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `borrow_limit`
--
ALTER TABLE `borrow_limit`
  ADD CONSTRAINT `user_id_const` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `requested_book`
--
ALTER TABLE `requested_book`
  ADD CONSTRAINT `book_constr_id` FOREIGN KEY (`bookid`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_foriegn_id` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
