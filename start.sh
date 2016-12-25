#!/bin/sh

echo 'Initializing Server'
cd server
echo 'Installing dependencies'
npm install
echo 'Dependencies installed'
echo 'Creating DB file with Tables'

sqlite3 config/secret/DerTest <<EOS
	CREATE TABLE Books(
		book_id Integer Unique Primary Key Not Null,
		book_title Text Not Null,
		book_cover Text Not Null
	);
	CREATE TABLE Authors(
		book_id Integer Unique Primary Key Not Null,
		author_name Text Not Null
	);
	CREATE TABLE BooksAuthors(
		ba_id Integer Unique Primary Key,
		book_id Integer,
		author_id Integer
	);
EOS

echo 'DB done'
cd ..
echo 'Server initialized'
echo 'Initializing Client'
cd client
npm install
cd ..
echo 'Client initialized'
echo 'DONE.'
