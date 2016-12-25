#!/bin/sh

echo 'Initializing Import'

sqlite3  config/secret/Library <<EOS
	INSERT INTO Authors (author_name) VALUES ("Douglas Crockford"),
						 ("David Flanagan"),
						 ("Marijn Haverbeke"),
						 ("Juho Vepsäläinen"),
						 ("Emily A. Vander"),
						 ("David M. Beazley"),
						 ("Mark Lutz"),
						 ("Stephen G. Kochan"),
						 ("Alan R. Feuer"),
						 ("Johannes Stein"),
						 ("Freddy Rangel"),
						 ("Ian Chursky"),
						 ("Alan Beaulieu"),
						 ("Anthony Malinaro"),
						 ("Kristina Chodorow");

	INSERT INTO Books (book_title, book_cover) VALUES ("Javascript: The Good Parts"	"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqp3qNyCRz25MZt7_jZ2DkcLR1b8KjMotN-4thKDetwtqtzUwfc0_y0ELo"),
							  ("JavaScript: The Definitive Guide", "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT0fDAJE8Y_WLC0OUmShzJSUQGLuasl-Q9_WZEJ2qjZ7T9Vnkd2aHlQWQ"),
							  ("Eloquent JavaScript", "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSP59zPOJZsg3RQBBOKpg5_IkgGu046w53JwX_tnL6iVdfpxxoxaM3FGfm6"),
							  ("SurviveJS: React", "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRSWuHrHqDaTXHkEDo7j8PpoZZqIMng8TswsJMhQ2iP2uyuUMW-8BUneho"),
							  ("JavaScript for Dummies", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGrr2QveGNH9WNQse11OrBtT8NNekPqygjt3KdHrK6Tyyqj4Lbj5-r4w"),
							  ("Python Essential Reference", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3v1DSLCg5KhQk1s4KG6kP01ItuzYhPn_e_UFHiFJ5f5qUj20ZhToDqxE"),
							  ("Learning Python", "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTxNiAw-qiYB1GpZYc20MqR37auiwUTjCjfhhCJiLfnStUOZ3wLIvTGCW0"),
							  ("Programming in C (3rd Edition)", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MtuHhuy0vvEesfp8aSqng4tc0k1Umt4ZydnNV1aGH4QFuPv37mrXbec"),
							  ("The C Puzzle Book","https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQpe21HBSNx4A48xLlQ5hx5TapRBwpXySS5DSTrt97SluntFMe9p1P5eQ"),
							  ("ReactJS Cookbook", "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQy3tjXnrSrCwho1JtSdtBIsq_hkVoJdbnsol8FaDSpzPlKV7wIkDJMONDQ"),
							  ("React Under The Hood", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTKtrSg02k0rpqhuoihVbCBN1k0YnuXY2PV2YjByQrq51xbIoBr2FWVVA"),
							  ("Effective React", "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTsAPxJeWUvdhSKxZuRh117lgfz9F-Td3n8Yxen3GgVeJ9Mj2gzMVrfwLbv"),
							  ("Learning SQL", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Yj5Tk8e_uJXY2o9nNpD9FM2pYazI4LLV9AH50OVPIxxO8AjXuq0A03o"),
							  ("SQL Cookbook", "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSnomDidhowgmnTj8mTbsc6eh2LqFg8VA67g_aJKZAjsPDknU-Ynen5eec"),
							  ("MongoDB: The Definitive Guide", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2gH-s_19HiVMdNKqanWaToHCCadBO6iwAX7qvxpAfZQPuZB-Wb_GLyc8");

	INSERT INTO BooksAuthors (book_id, author_id) VALUES ("1", "1"),
							     ("2", "2"),
							     ("3", "3"),
							     ("4", "4"),
							     ("5", "5"),
							     ("6", "6"),
							     ("7", "7"),
							     ("10", "9"),
							     ("11", "10"),
							     ("12", "11"),
							     ("13", "12"),
							     ("14", "13"),
							     ("15", "14"),
							     ("16", "15"),
							     ("17", "16");
EOS

echo 'Import Done.'
