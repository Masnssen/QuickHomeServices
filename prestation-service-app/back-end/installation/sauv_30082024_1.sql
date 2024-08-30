-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: QuickHomeServices
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

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
-- Table structure for table `categorie_prestation`
--

DROP TABLE IF EXISTS `categorie_prestation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorie_prestation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie_prestation`
--

LOCK TABLES `categorie_prestation` WRITE;
/*!40000 ALTER TABLE `categorie_prestation` DISABLE KEYS */;
INSERT INTO `categorie_prestation` VALUES (1,'Aide Ménagère','Services de ménage et entretien de la maison'),(2,'Garde d’Enfants','Services de garde d’enfants à domicile'),(3,'Assistance aux Personnes Âgées','Services d’aide aux personnes âgées ou dépendantes'),(4,'Jardinage et Bricolage','Services de jardinage et petits travaux de bricolage'),(5,'Soutien Scolaire','Services de soutien scolaire et d’accompagnement éducatif'),(6,'teste','Teste catégorie modified aussi'),(7,'Auther ','auther modified');
/*!40000 ALTER TABLE `categorie_prestation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commande`
--

DROP TABLE IF EXISTS `commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prix_total` decimal(10,2) DEFAULT NULL,
  `client_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commande`
--

LOCK TABLES `commande` WRITE;
/*!40000 ALTER TABLE `commande` DISABLE KEYS */;
/*!40000 ALTER TABLE `commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestation`
--

DROP TABLE IF EXISTS `prestation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categorie` int DEFAULT NULL,
  `sous_categorie` int DEFAULT NULL,
  `prix_unitaire` decimal(10,2) DEFAULT NULL,
  `unite` int DEFAULT NULL,
  `prix_total` decimal(10,2) DEFAULT NULL,
  `client_email` varchar(255) DEFAULT NULL,
  `auto_entrepreneur` varchar(255) DEFAULT NULL,
  `etat` enum('dans_panier','attente_attribution','en_cours_execution','faite') DEFAULT NULL,
  `id_commande` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categorie` (`categorie`),
  KEY `sous_categorie` (`sous_categorie`),
  KEY `id_commande` (`id_commande`),
  CONSTRAINT `prestation_ibfk_1` FOREIGN KEY (`categorie`) REFERENCES `categorie_prestation` (`id`),
  CONSTRAINT `prestation_ibfk_2` FOREIGN KEY (`sous_categorie`) REFERENCES `sous_categorie_prestation` (`id`),
  CONSTRAINT `prestation_ibfk_3` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestation`
--

LOCK TABLES `prestation` WRITE;
/*!40000 ALTER TABLE `prestation` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sous_categorie_prestation`
--

DROP TABLE IF EXISTS `sous_categorie_prestation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sous_categorie_prestation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_categorie` int DEFAULT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text,
  `prix_unitaire` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categorie` (`id_categorie`),
  CONSTRAINT `sous_categorie_prestation_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie_prestation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sous_categorie_prestation`
--

LOCK TABLES `sous_categorie_prestation` WRITE;
/*!40000 ALTER TABLE `sous_categorie_prestation` DISABLE KEYS */;
INSERT INTO `sous_categorie_prestation` VALUES (1,1,'Nettoyage de la maison','Nettoyage complet de la maison',15.00),(2,1,'Repassage','Repassage du linge à domicile',12.00),(3,1,'Lessive','Prise en charge de la lessive à domicile',10.00),(4,1,'Cuisine','Préparation des repas à domicile',18.00),(5,1,'Courses','Réalisation des courses à domicile',8.00),(6,2,'Garde d’enfants ponctuelle','Garde d’enfants ponctuelle à domicile',20.00),(7,2,'Garde d’enfants régulière','Garde d’enfants régulière à domicile',18.00),(8,2,'Accompagnement à l’école','Accompagnement et retour de l’école',15.00),(9,2,'Activités extra-scolaires','Encadrement des activités extra-scolaires',22.00),(10,2,'Aide aux devoirs','Assistance aux devoirs et études à domicile',17.00),(11,3,'Aide à la toilette','Assistance pour la toilette des personnes âgées',25.00),(12,3,'Préparation des repas','Préparation de repas équilibrés à domicile',20.00),(13,3,'Compagnie et conversation','Compagnie et assistance sociale',15.00),(14,3,'Aide à la mobilité','Assistance pour les déplacements et exercices physiques',30.00),(15,3,'Gestion des médicaments','Assistance pour la gestion des médicaments et des rendez-vous médicaux',18.00),(16,4,'Entretien du jardin','Tonte de pelouse, taille de haies et entretien général du jardin',25.00),(17,4,'Plantation','Plantation de fleurs, arbres et arbustes',20.00),(18,4,'Petits travaux de bricolage','Réparations mineures et aménagements divers',30.00),(19,4,'Nettoyage de terrasse','Nettoyage et entretien des terrasses et balcons',15.00),(20,4,'Peinture','Travaux de peinture intérieure et extérieure',35.00),(21,5,'Mathématiques','Cours de soutien en mathématiques à domicile',25.00),(22,5,'Sciences','Cours de soutien en sciences à domicile',25.00),(23,5,'Langues étrangères','Cours de soutien en langues étrangères (anglais, espagnol, etc.)',20.00),(24,5,'Français','Cours de soutien en français et littérature',22.00),(25,5,'Préparation aux examens','Aide à la préparation des examens et concours',30.00),(29,1,'Teste','Teste',50.00);
/*!40000 ALTER TABLE `sous_categorie_prestation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `numTel` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` enum('admin','auto-entrepreneur','client') DEFAULT 'client',
  `numSiret` varchar(14) DEFAULT NULL,
  `adresse` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `activer` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `numTel` (`numTel`),
  UNIQUE KEY `numSiret` (`numSiret`),
  UNIQUE KEY `numTel_2` (`numTel`),
  UNIQUE KEY `numSiret_2` (`numSiret`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'Massinissa','TIGHILT','2000-08-14','masnssen@gmail.com','0752223704','$2b$12$HLOG/VsF0f.RBqUrirIRm.aPe5UwFe92uisbyPr3SHoTt/hhPvojG','client','123456789','11 RUE GIROUIX, 92500 RUEIL-MALMAISON','2024-08-27 11:53:20',1),(23,'Dupont','Jean','1980-05-15','jean.dupont@example.com','0601020301','','client',NULL,'10 Rue des Fleurs, Paris','2024-08-27 13:00:01',1),(24,'M','Sophie','1990-08-22','sophie.martin@example.com','0601020302','','auto-entrepreneur','12345678901234','15 Boulevard Saint-Germain, Paris','2024-08-27 13:00:01',1),(25,'Durand','Paul','1975-12-05','paul.durand@example.com','0601020303','','client',NULL,'20 Rue de Rivoli, Paris','2024-08-27 13:00:01',1),(26,'Lemoine','Marie','1985-02-18','marie.lemoine@example.com','0601020304','','auto-entrepreneur','23456789012345','25 Avenue de la République, Paris','2024-08-27 13:00:01',1),(27,'Moreau','Luc','1992-07-30','luc.moreau@example.com','0601020305','','client',NULL,'30 Rue de la Paix, Paris','2024-08-27 13:00:01',1),(28,'Lemoine','Claire','1988-04-11','claire.lemoine@example.com','0601020306','','auto-entrepreneur','34567890123456','35 Rue des Rosiers, Paris','2024-08-27 13:00:01',1),(29,'Petit','Pierre','1978-11-23','pierre.petit@example.com','0601020307','','client',NULL,'40 Rue des Écoles, Paris','2024-08-27 13:00:01',1),(30,'Bernard','Julie','1995-06-14','julie.bernard@example.com','0601020308','','auto-entrepreneur','45678901234567','45 Avenue du Général Leclerc, Paris','2024-08-27 13:00:01',1),(31,'Rousseau','François','1982-03-29','francois.rousseau@example.com','0601020309','','client',NULL,'50 Rue de la Gare, Paris','2024-08-27 13:00:01',1),(32,'Garnier','Isabelle','1989-09-04','isabelle.garnier@example.com','0601020310','','auto-entrepreneur','56789012345678','55 Boulevard du Montparnasse, Paris','2024-08-27 13:00:01',0),(33,'Dumont','Jean-Claude','1973-10-21','jean-claude.dumont@example.com','0601020311','','client',NULL,'60 Rue de la Liberté, Paris','2024-08-27 13:00:01',1),(34,'Collet','Nathalie','1994-01-10','nathalie.collet@example.com','0601020312','','auto-entrepreneur','67890123456789','65 Rue des Champs-Élysées, Paris','2024-08-27 13:00:01',0),(35,'Girard','Michel','1981-07-19','michel.girard@example.com','0601020313','','client',NULL,'70 Rue du Faubourg Saint-Antoine, Paris','2024-08-27 13:00:01',1),(36,'Fournier','Monique','1979-11-12','monique.fournier@example.com','0601020314','','auto-entrepreneur','78901234567890','75 Avenue de la Bourdonnerie, Paris','2024-08-27 13:00:01',1),(37,'Blanc','Éric','1993-02-26','eric.blanc@example.com','0601020315','','client',NULL,'80 Rue de la République, Paris','2024-08-27 13:00:01',0),(38,'Boucher','Anne','1986-12-09','anne.boucher@example.com','0601020316','','auto-entrepreneur','89012345678901','85 Boulevard de la Madeleine, Paris','2024-08-27 13:00:01',1),(39,'Gautier','Alain','1984-04-30','alain.gautier@example.com','0601020317','','client',NULL,'90 Rue du Bac, Paris','2024-08-27 13:00:01',0),(40,'Chauvin','Sylvie','1991-08-14','sylvie.chauvin@example.com','0601020318','','auto-entrepreneur','90123456789012','95 Avenue Victor Hugo, Paris','2024-08-27 13:00:01',1),(41,'Renard','André','1987-03-06','andre.renard@example.com','0601020319','','client',NULL,'100 Rue de Vaugirard, Paris','2024-08-27 13:00:01',1),(42,'Delaunay','Isabelle','1972-09-21','isabelle.delaunay@example.com','0601020320','','auto-entrepreneur','01234567890123','105 Rue du Cherche-Midi, Paris','2024-08-27 13:00:01',0);
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-30 17:43:51
