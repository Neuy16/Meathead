DROP DATABASE IF EXISTS meathead_db;
CREATE DATABASE meathead_db;

USE meathead_db;

CREATE TABLE accountInfo (
    userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL
    password VARCHAR(30) NOT NULL
);

CREATE TABLE maxInfo (
    maxID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (userID) REFERENCES accountInfo(userID)
    ON DELETE SET NULL,
    maxBench INT,
    maxRepWeight INT,
    maxReps INT
);

CREATE TABLE excersiseTracking (
    excersiseID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (maxID) REFERENCES maxInfo(maxID)
    ON DELETE SET NULL,
    benchPress INT,
    tricepExtensions INT,
    chestFlies INT
);
