
DROP TABLE booking;
DROP TABLE Participate;
DROP TABLE Written;
DROP TABLE book;
DROP TABLE publisher;
DROP TABLE author;
DROP TABLE category;
DROP TABLE workshop;
DROP TABLE users;


CREATE TABLE `users`(
  `idUser` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameUser` varchar(30) NOT NULL,
  `fNameUser` varchar(30) NOT NULL,
  `password` varchar(64),
  `email` varchar(100) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `registerDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_User PRIMARY KEY (idUser),
  CONSTRAINT uniqueEmail UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `workshop`(
  `idWorkshop` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `dateWorkshop` datetime NOT NULL,
  `nbSeat` int(10) UNSIGNED,
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
  `titleBook` varchar(30) NOT NULL,
  `ISBN` VARCHAR(20),
  `summary` text,
  `srcImage` varchar(30),
  `price` float(6,2) UNSIGNED,
  `nbStock` int(10) UNSIGNED,
  `personnalizedWord` text,
  `trends` tinyint(1) DEFAULT '0',
  `idCategory` bigint(10) UNSIGNED NOT NULL,
  `idPublisher` bigint(10) UNSIGNED,
  CONSTRAINT pk_Book PRIMARY KEY (idBook),
  CONSTRAINT fk_BookCategory FOREIGN KEY (idCategory) REFERENCES category(idCategory),
  CONSTRAINT fk_BookPublisher FOREIGN KEY (idPublisher) REFERENCES Publisher(idPublisher),
  CONSTRAINT uniqueISBN UNIQUE (ISBN)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `written`(
  `idAuthor` bigint(10) UNSIGNED NOT NULL,
  `idBook` bigint(10) UNSIGNED NOT NULL,
  CONSTRAINT pk_Written PRIMARY KEY (idBook,idAuthor),
  CONSTRAINT fk_WrittenBook FOREIGN KEY (idBook) REFERENCES Book(idBook),
  CONSTRAINT fk_WrittenAuthor FOREIGN KEY (idAuthor) REFERENCES AUTHOR(idAuthor)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `participate`(
  `idWorkshop` bigint(10) UNSIGNED NOT NULL,
  `idUser` bigint(10) UNSIGNED NOT NULL,
  CONSTRAINT pk_Participate PRIMARY KEY (idWorkshop,idUser),
  CONSTRAINT fk_ParticipateWorkshop FOREIGN KEY (idWorkshop) REFERENCES Workshop(idWorkshop),
  CONSTRAINT fk_ParticipateUser FOREIGN KEY (idUser) REFERENCES users(idUser)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `booking`(
  `idBooking` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idUser` bigint(10) UNSIGNED NOT NULL,
  `idBook` bigint(10) UNSIGNED NOT NULL,
  `dateBooking` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quantity`int(10) UNSIGNED NOT NULL,
  CONSTRAINT pk_booking PRIMARY KEY (idBooking),
  CONSTRAINT fk_bookingBook FOREIGN KEY (idBook) REFERENCES book(idBook),
  CONSTRAINT fk_bookingUser FOREIGN KEY (idUser) REFERENCES users(idUser)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

