CREATE DATABASE IF NOT EXISTS twitternj;

DROP TABLE IF EXISTS twitternj.users;
DROP TABLE IF EXISTS twitternj.messages;

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
	date_message date NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE twitternj.messages ADD CONSTRAINT
	FK_message_poster_login FOREIGN KEY (login_poster)
	REFERENCES users(login)
	ON DELETE CASCADE;