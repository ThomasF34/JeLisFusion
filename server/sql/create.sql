DROP TABLE IF EXISTS participate;
DROP TABLE IF EXISTS written;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS publisher;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS workshop;
DROP TABLE IF EXISTS users;


CREATE TABLE `users`(
  `idUser` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameUser` varchar(30) NOT NULL,
  `fNameUser` varchar(30) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(100) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `registerDate` datetime NOT NULL,
  CONSTRAINT pk_User PRIMARY KEY (idUser),
  CONSTRAINT uniqueEmail UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `workshop`(
  `idWorkshop` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `titleWorkshop` varchar(300) NOT NULL,
  `dateWorkshop` datetime NOT NULL,
  `nbSeat` int(3) UNSIGNED,
  `price` int(3) UNSIGNED,
  `minAge` int(3) UNSIGNED,
  `maxAge` int(3) UNSIGNED,
  `description` text,
  `nameAnimator` varchar(30),
  CONSTRAINT pk_Workshop PRIMARY KEY (idWorkshop)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `category`(
  `idCategory` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameCategory` varchar(20) NOT NULL,
  CONSTRAINT pk_Cate PRIMARY KEY (idCategory)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `author`(
  `idAuthor` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameAuthor` VARCHAR(30) NOT NULL,
  `fNameAuthor` VARCHAR(30) NOT NULL,
  CONSTRAINT pk_Author PRIMARY KEY (idAuthor)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `publisher`(
  `idPublisher` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `namePublisher` varchar(30) NOT NULL,
  CONSTRAINT pk_Publisher PRIMARY KEY (idPublisher)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `book`(
  `idBook` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `titleBook` varchar(200) NOT NULL,
  `ISBN` VARCHAR(20),
  `summary` text,
  `price` float(6,2) UNSIGNED,
  `nbStock` int(10) UNSIGNED,
  `personnalizedWord` text,
  `trends` tinyint(1) DEFAULT '0',
  `idCategory` bigint(10) UNSIGNED NOT NULL,
  `idPublisher` bigint(10) UNSIGNED,
  CONSTRAINT pk_Book PRIMARY KEY (idBook),
  CONSTRAINT fk_BookCategory FOREIGN KEY (idCategory) REFERENCES category(idCategory),
  CONSTRAINT fk_BookPublisher FOREIGN KEY (idPublisher) REFERENCES publisher(idPublisher),
  CONSTRAINT uniqueISBN UNIQUE (ISBN)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `written`(
  `idAuthor` bigint(10) UNSIGNED NOT NULL,
  `idBook` bigint(10) UNSIGNED NOT NULL,
  CONSTRAINT pk_Written PRIMARY KEY (idBook,idAuthor),
  CONSTRAINT fk_WrittenBook FOREIGN KEY (idBook) REFERENCES book(idBook),
  CONSTRAINT fk_WrittenAuthor FOREIGN KEY (idAuthor) REFERENCES author(idAuthor)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `participate`(
  `idWorkshop` bigint(10) UNSIGNED NOT NULL,
  `idUser` bigint(10) UNSIGNED NOT NULL,
  `nbSeat` int(3) UNSIGNED NOT NULL,
  `dateReservation` datetime,
  CONSTRAINT pk_Participate PRIMARY KEY (idWorkshop,idUser),
  CONSTRAINT fk_ParticipateWorkshop FOREIGN KEY (idWorkshop) REFERENCES workshop(idWorkshop),
  CONSTRAINT fk_ParticipateUser FOREIGN KEY (idUser) REFERENCES users(idUser)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TRIGGER defaultDateUser BEFORE INSERT
ON users FOR EACH ROW
BEGIN
  SET NEW.registerDate = SYSDATE();
end;

CREATE TRIGGER defaultDateParticipate BEFORE INSERT
ON participate FOR EACH ROW
BEGIN
  SET NEW.dateReservation = SYSDATE();
end;
