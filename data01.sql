-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table data01.admin: ~1 rows (approximately)
INSERT INTO `admin` (`id`, `username`, `password`) VALUES
	(1, 'adminTrainer', '0619235338');

-- Dumping data for table data01.articles: ~0 rows (approximately)

-- Dumping data for table data01.contacts: ~7 rows (approximately)
INSERT INTO `contacts` (`id`, `name`, `email`, `message`, `created_at`) VALUES
	(1, 'piyathat', 'aeindy@gmail.com', 'ขอรายงานปัญหา', '2025-02-07 10:38:51'),
	(2, 'piyathat', 'aeindy@gmail.com', 'ขอรายงานปัญหา', '2025-02-07 10:38:59'),
	(3, 'piyathat', 'aeindy@gmail.com', 'ขอรายงานปัญหา', '2025-02-07 10:39:02'),
	(4, 'piyathat', 'aeindy@gmail.com', 'ขอรายงานปัญหา', '2025-02-07 10:42:55'),
	(5, 'piyathat', 'aeindy@gmail.com', 'test', '2025-02-07 10:43:32'),
	(6, 'piyathat', 'aeindy@gmail.com', 'qwerwrwrweww', '2025-02-07 11:25:28'),
	(7, 'arearrrrr', 'fIFA@gmail.com', 'sorry teacher ผมพยายามสุดแล้ว', '2025-02-07 13:10:36');

-- Dumping data for table data01.reports: ~8 rows (approximately)
INSERT INTO `reports` (`id`, `video_id`, `reason`, `email`, `created_at`) VALUES
	(1, 1, 'test', 'aeindy@gmail.com', '2025-02-07 11:06:31'),
	(2, 1, 'test', 'aeindy@gmail.com', '2025-02-07 11:06:37'),
	(3, 1, 'test3', 'aeindy@gmail.com', '2025-02-07 11:10:55'),
	(4, 1, 'qwe', 'aeindy@gmail.com', '2025-02-07 11:15:04'),
	(5, 1, 'weqewqe', 'aeindy@gmail.com', '2025-02-07 11:28:35'),
	(6, 2, 'wefwffw', 'aeindy@gmail.com', '2025-02-07 11:29:15'),
	(7, 4, 'awdadaadaawd', 'aeindy@gmail.com', '2025-02-07 12:21:26'),
	(8, 1, 'ง่ายไป', 'aeindy@gmail.com', '2025-02-07 13:11:37');

-- Dumping data for table data01.users: ~17 rows (approximately)
INSERT INTO `users` (`id`, `username`, `password`) VALUES
	(1, 'ae', '1234'),
	(2, 'aaa', '12345'),
	(3, 'sada', '3456'),
	(4, 'wow', 'wow'),
	(5, 'toey', '55555'),
	(6, 'rt', '3456'),
	(7, 'www', '123'),
	(8, 'we', '123'),
	(9, 'ny', '1234'),
	(10, 'ahh', '555'),
	(11, 'aeindy', '12345'),
	(12, 'namtoey', '1234'),
	(13, 'pinkky', '1234'),
	(14, 'ass', '1122'),
	(15, 'ccc', 'ccc'),
	(16, 'kantima', '1234'),
	(17, 'arm', '5567');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
