-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: udyoga
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Insurance`
--

DROP TABLE IF EXISTS `Insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Insurance` (
  `insurance_id` int NOT NULL AUTO_INCREMENT,
  `tasker_profile_id` int NOT NULL,
  `insurance_type` varchar(255) NOT NULL,
  `coverage_amount` decimal(10,2) NOT NULL,
  `enrollment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `claim_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`insurance_id`),
  KEY `tasker_profile_id` (`tasker_profile_id`),
  CONSTRAINT `Insurance_ibfk_1` FOREIGN KEY (`tasker_profile_id`) REFERENCES `TaskerProfile` (`tasker_profile_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ProvideService`
--

DROP TABLE IF EXISTS `ProvideService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProvideService` (
  `provide_service_id` int NOT NULL AUTO_INCREMENT,
  `tasker_profile_id` int DEFAULT NULL,
  `service_id` int DEFAULT NULL,
  `experience` int NOT NULL,
  `hourly_rate` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`provide_service_id`),
  KEY `fk_tasker_profile` (`tasker_profile_id`),
  KEY `fk_service` (`service_id`),
  CONSTRAINT `fk_service` FOREIGN KEY (`service_id`) REFERENCES `Service` (`service_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tasker_profile` FOREIGN KEY (`tasker_profile_id`) REFERENCES `TaskerProfile` (`tasker_profile_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `Service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Service` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TaskerProfile`
--

DROP TABLE IF EXISTS `TaskerProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TaskerProfile` (
  `tasker_profile_id` int NOT NULL AUTO_INCREMENT,
  `id` int DEFAULT NULL,
  `bio` text,
  `area` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `availability_status` tinyint DEFAULT '1',
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ratings` int DEFAULT NULL,
  PRIMARY KEY (`tasker_profile_id`),
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `tasker_id` int NOT NULL,
  `user_id` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `partial_amount` decimal(10,2) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `total_hours` int NOT NULL,
  `task_status` enum('COMPLETED','PENDING','CANCELLED') NOT NULL DEFAULT 'PENDING',
  PRIMARY KEY (`booking_id`),
  KEY `tasker_id` (`tasker_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`tasker_id`) REFERENCES `TaskerProfile` (`tasker_profile_id`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `apply_cancellation_policy` BEFORE UPDATE ON `booking` FOR EACH ROW BEGIN
    -- Declare local variables at the beginning of the BEGIN block
    DECLARE hours_until_start INT DEFAULT 0;
    DECLARE penalty_amount DECIMAL(10, 2) DEFAULT 0;

    -- Only proceed if task_status is being updated to 'CANCELLED'
    IF NEW.task_status = 'CANCELLED' THEN
        -- Calculate hours until the booking's start date and time
        SET hours_until_start = TIMESTAMPDIFF(HOUR, NOW(), NEW.start_date);

        -- Determine the penalty amount based on hours until start
        IF hours_until_start > 48 THEN
            SET penalty_amount = NEW.partial_amount * 0.10;
        ELSEIF hours_until_start > 24 THEN
            SET penalty_amount = NEW.partial_amount * 0.30;
		ELSEIF hours_until_start > 2 THEN
            SET penalty_amount = NEW.partial_amount * 0.50;
        ELSEIF hours_until_start <= 2 THEN
            SET penalty_amount = NEW.partial_amount;
        END IF;

        -- Deduct the calculated penalty amount from the partial_amount
        SET NEW.partial_amount = NEW.partial_amount - penalty_amount;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `age` int NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-19 10:59:53


-- !Functions */;

CREATE DEFINER=`root`@`localhost` FUNCTION `calculate_remaining_amount`(b_id INT) RETURNS decimal(10,2)
    READS SQL DATA
BEGIN
    DECLARE total_amo DECIMAL(10, 2);
    DECLARE partial_amo DECIMAL(10, 2);
    DECLARE remaining_amount DECIMAL(10, 2);

    -- Get the total amount and partial amount from the booking table
    SELECT total_amount, partial_amount INTO total_amo, partial_amo
    FROM booking
    WHERE booking_id = b_id;

    -- Calculate the remaining amount
    SET remaining_amount = total_amo - partial_amo;

    RETURN remaining_amount;
END

-- Triggers


DELIMITER //

CREATE TRIGGER apply_cancellation_policy
BEFORE UPDATE ON booking
FOR EACH ROW
BEGIN
    -- Declare local variables
    DECLARE hours_until_start INT DEFAULT 0;
    DECLARE penalty_amount DECIMAL(10, 2) DEFAULT 0;

    -- Only apply logic if task_status is being updated to 'CANCELED'
    IF NEW.task_status = 'CANCELED' THEN
        -- Calculate hours until the booking's start date and time
        SET hours_until_start = TIMESTAMPDIFF(HOUR, NOW(), CONCAT(NEW.start_date, ' ', NEW.start_time));

        -- Determine the penalty amount based on the hours until start
        IF hours_until_start > 48 THEN
            SET penalty_amount = NEW.partial_amount * 0.10; -- 10% penalty
        ELSEIF hours_until_start > 24 THEN
            SET penalty_amount = NEW.partial_amount * 0.30; -- 30% penalty
        ELSEIF hours_until_start <= 2 THEN
            SET penalty_amount = NEW.partial_amount; -- 100% penalty
        END IF;

        -- Deduct the calculated penalty amount from the partial_amount
        SET NEW.partial_amount = NEW.partial_amount - penalty_amount;
    END IF;
END //

DELIMITER ;



