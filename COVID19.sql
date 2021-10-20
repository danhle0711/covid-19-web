CREATE DATABASE COVID19;

CREATE TABLE USERS (
    userID INT AUTO_INCREMENT,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    DOB date,
    phoneNumber VARCHAR(100),
    email VARCHAR(100),
    username VARCHAR (100),
    password VARCHAR(100),
    primary key (userID)
);

INSERT INTO USERS VALUES (NULL, 'Danh', 'Le', '2000-01-01', '123132123', 'asdadd@gmail.com', 'danh123', 'password');
INSERT INTO USERS VALUES (NULL, 'Minh', 'Le', '2001-01-01', '123132123', '1111111@gmail.com', 'minh123', 'password123');

CREATE TABLE CHECKIN (
    checkinID INT AUTO_INCREMENT,
    userID VARCHAR(100),
    place VARCHAR(100),
    time date,
    primary key (checkinID)
);

CREATE TABLE HOTSPOTS (
    hotspotID INT AUTO_INCREMENT,
    placeID VARCHAR(100),
    primary key (hotspotID)
);

CREATE TABLE PLACES (
    placeID INT AUTO_INCREMENT,
    name VARCHAR(100),
    streetNumber INT,
    street VARCHAR(100),
    primary key (placeID)
);