DROP DATABASE IF EXISTS meathead_db;
CREATE DATABASE meathead_db;

USE meathead_db;

CREATE TABLE accountInfo (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL
    password VARCHAR(30) NOT NULL
);

CREATE TABLE maxInfo (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (maxID) REFERENCES accountInfo(id)
    ON DELETE SET NULL,
    maxBench INT,
    maxRepWeight INT,
    maxReps INT
);

CREATE TABLE excersiseTracking (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (excersiseID) REFERENCES maxInfo(id)
    ON DELETE SET NULL,
    benchPress INT,
    tricepExtensions INT,
    chestFlies INT
);
