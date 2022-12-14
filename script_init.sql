CREATE DATABASE IF NOT EXISTS twitternj;

DROP TABLE IF EXISTS twitternj.reactions;
DROP TABLE IF EXISTS twitternj.retweet;
DROP TABLE IF EXISTS twitternj.messages;
DROP TABLE IF EXISTS twitternj.abonnements;
DROP TABLE IF EXISTS twitternj.users;
DROP TABLE IF EXISTS twitternj.commentaires;



CREATE TABLE twitternj.users(

	login nvarchar(50) PRIMARY KEY,
	t_name nvarchar(50) NOT NULL,
	password nvarchar(60) NOT NULL,
	description nvarchar(200) NOT NULL DEFAULT "",
	profile_pic text NOT NULL DEFAULT "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=170667a&w=0&h=zP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU=",
	cover_pic text NOT NULL DEFAULT "https://media.istockphoto.com/photos/texture-of-blue-paper-picture-id945663596?k=6&m=945663596&s=612x612&w=0&h=Tl7ZKKzERt5_WtEcUwp9yZKDjQZev15RTZ0a85WkUbs=",
	date_inscription date NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE twitternj.abonnements(
	login_suivi nvarchar(50),
	login_suiveur nvarchar(50),
	PRIMARY KEY(login_suivi, login_suiveur)
);

ALTER TABLE twitternj.abonnements ADD CONSTRAINT
	FK_login_suivi FOREIGN KEY (login_suivi)
	REFERENCES users(login)
	ON DELETE CASCADE
	ON UPDATE CASCADE;


ALTER TABLE twitternj.abonnements ADD CONSTRAINT
	FK_login_suiveur FOREIGN KEY (login_suiveur)
	REFERENCES users(login)
	ON DELETE CASCADE
	ON UPDATE CASCADE;

CREATE TABLE twitternj.messages(
	id_message INT PRIMARY KEY AUTO_INCREMENT,
	login_poster nvarchar(50) NOT NULL,
	content nvarchar(280) NOT NULL,
	date_message datetime NOT NULL DEFAULT NOW()
);

ALTER TABLE twitternj.messages ADD CONSTRAINT
	FK_message_poster_login FOREIGN KEY (login_poster)
	REFERENCES users(login)
	ON DELETE CASCADE
	ON UPDATE CASCADE;

CREATE TABLE twitternj.reactions(
	id_message INT,
	login_user nvarchar(50),
	reaction varchar(1) NOT NULL,
	PRIMARY KEY(id_message,login_user),
	CHECK (reaction ='l' OR reaction ='d')

);

ALTER TABLE twitternj.reactions ADD CONSTRAINT
	FK_reaction_message_id FOREIGN KEY (id_message)
	REFERENCES messages(id_message)
	ON DELETE CASCADE;

ALTER TABLE twitternj.reactions ADD CONSTRAINT
	FK_reaction_login_user FOREIGN KEY (login_user)
	REFERENCES users(login)
	ON DELETE CASCADE
	ON UPDATE CASCADE;

CREATE TABLE twitternj.retweet(
	id_message INT,
	login_user nvarchar(50),
	date_retweet datetime NOT NULL DEFAULT NOW(),
	PRIMARY KEY(id_message,login_user)
);

ALTER TABLE twitternj.retweet ADD CONSTRAINT
	FK_retweet_message_id FOREIGN KEY (id_message)
	REFERENCES messages(id_message)
	ON DELETE CASCADE;

ALTER TABLE twitternj.retweet ADD CONSTRAINT
	FK_retweet_login_user FOREIGN KEY (login_user)
	REFERENCES users(login)
	ON DELETE CASCADE
	ON UPDATE CASCADE;

CREATE TABLE twitternj.commentaires(
	id_commentaire INT PRIMARY KEY AUTO_INCREMENT,
	id_message INT NOT NULL,
	login nvarchar(50) NOT NULL,
	content nvarchar(280) NOT NULL,
	date_commentaire datetime NOT NULL DEFAULT NOW()
);

ALTER TABLE twitternj.commentaires ADD CONSTRAINT
	FK_commentaires_message_id FOREIGN KEY (id_message)
	REFERENCES messages(id_message)
	ON DELETE CASCADE;

ALTER TABLE twitternj.commentaires ADD CONSTRAINT
	FK_commentaires_login FOREIGN KEY (login)
	REFERENCES users(login)
	ON DELETE CASCADE
	ON UPDATE CASCADE;
	
USE twitternj;

LOAD DATA LOCAL INFILE './data/users.txt' 
INTO TABLE users
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE './data/abonnements.txt' 
INTO TABLE abonnements
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE './data/messages.txt' 
INTO TABLE messages
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE './data/reactions.txt' 
INTO TABLE reactions
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE './data/retweet.txt' 
INTO TABLE retweet
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE './data/commentaires.txt' 
INTO TABLE commentaires
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n';

CREATE USER twitternj@localhost IDENTIFIED BY 'Access_data1';

GRANT ALL PRIVILEGES ON twitternj . * TO twitternj@localhost;

FLUSH PRIVILEGES;


