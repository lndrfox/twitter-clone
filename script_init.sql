CREATE DATABASE IF NOT EXISTS twitternj;

DROP TABLE IF EXISTS twitternj.reactions;
DROP TABLE IF EXISTS twitternj.retweet;
DROP TABLE IF EXISTS twitternj.retweet_cite;
DROP TABLE IF EXISTS twitternj.messages;
DROP TABLE IF EXISTS twitternj.users;



CREATE TABLE twitternj.users(

	login nvarchar(50) PRIMARY KEY,
	password nvarchar(60) NOT NULL,
	description nvarchar(200) NOT NULL DEFAULT "",
	profile_pic text NOT NULL DEFAULT "default",
	cover_pic text NOT NULL DEFAULT "default",
	date_inscription date NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE twitternj.retweet_cite(
	id_cite INT PRIMARY KEY AUTO_INCREMENT,
	id_message INT NOT NULL,
	login_user nvarchar(50) NOT NULL,
	id_message_citation INT NOT NULL
);

ALTER TABLE twitternj.retweet_cite ADD CONSTRAINT
	FK_cite_message_id FOREIGN KEY (id_message)
	REFERENCES messages(id_message)
	ON DELETE CASCADE
	ON UPDATE CASCADE;

ALTER TABLE twitternj.retweet_cite ADD CONSTRAINT
	FK_cite_login_user FOREIGN KEY (login_user)
	REFERENCES users(login)
	ON DELETE CASCADE
	ON UPDATE CASCADE;