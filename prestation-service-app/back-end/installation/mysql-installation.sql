CREATE DATABASE IF NOT EXISTS QuickHomeServices;

USE QuickHomeServices;

CREATE TABLE IF NOT EXISTS utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    date_naissance DATE,
    email VARCHAR(100) UNIQUE,
    numTel VARCHAR(20) UNIQUE,
    password VARCHAR(255),
    type ENUM('admin', 'auto-entrepreneur', 'client') DEFAULT 'client',
    numSiret VARCHAR(14) UNIQUE,
    adresse TEXT,
    activer BOOLEAN DEFAULT FALSE;
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS categorie_prestation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS sous_categorie_prestation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_categorie INT,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    prix_unitaire DECIMAL(10, 2),
    FOREIGN KEY (id_categorie) REFERENCES categorie_prestation(id)
);

CREATE TABLE IF NOT EXISTS commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prix_total DECIMAL(10, 2),
    client_email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS prestation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categorie INT,
    sous_categorie INT,
    prix_unitaire DECIMAL(10, 2),
    unite INT,
    prix_total DECIMAL(10, 2),
    client_email VARCHAR(255),
    auto_entrepreneur VARCHAR(255),
    etat ENUM('dans_panier', 'attente_attribution', 'en_cours_execution', 'faite'),
    id_commande INT,
    FOREIGN KEY (categorie) REFERENCES categorie_prestation(id),
    FOREIGN KEY (sous_categorie) REFERENCES sous_categorie_prestation(id),
    FOREIGN KEY (id_commande) REFERENCES commande(id)
);

CREATE TABLE IF NOT EXISTS prestation_dates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prestation_id INT,
    date_debut DATETIME,
    FOREIGN KEY (prestation_id) REFERENCES prestation(id)
);


CREATE TABLE IF NOT EXISTS auto_entrepreneur_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prestation_date_id INT,
    auto_entrepreneur_email VARCHAR(255),
    status ENUM('en_attente', 'selectionne', 'rejeté') DEFAULT 'en_attente',
    date_candidature DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prestation_date_id) REFERENCES prestation_dates(id)
);

