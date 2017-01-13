import mongodb from 'mongodb'
import mongo from './config/secret/Mongo'

(() => {
  const url = mongo.connectionURL
  const mongoClient = mongodb.MongoClient

  mongoClient.connect(url, (err, db) => {
    if (err) {
      return
    }

    const collection = db.collection('Books')

    const books = [
      {
        title: 'Javascript: The Good Parts',
        author: 'Douglas Crockford',
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRqp3qNyCRz25MZt7_jZ2DkcLR1b8KjMotN-4thKDetwtqtzUwfc0_y0ELo'
      },
      {
        title: 'JavaScript: The Definitive Guide',
        author: 'David Flanagan',
        image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT0fDAJE8Y_WLC0OUmShzJSUQGLuasl-Q9_WZEJ2qjZ7T9Vnkd2aHlQWQ'
      },
      {
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSP59zPOJZsg3RQBBOKpg5_IkgGu046w53JwX_tnL6iVdfpxxoxaM3FGfm6'
      },
      {
        title: 'SurviveJS: React',
        author: 'Juho Vepsäläinen',
        image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRSWuHrHqDaTXHkEDo7j8PpoZZqIMng8TswsJMhQ2iP2uyuUMW-8BUneho'
      },
      {
        title: 'JavaScript for Dummies',
        author: 'Emily A. Vander',
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGrr2QveGNH9WNQse11OrBtT8NNekPqygjt3KdHrK6Tyyqj4Lbj5-r4w'
      },
      {
        title: 'Python Essential Reference',
        author: 'David M. Beazley',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3v1DSLCg5KhQk1s4KG6kP01ItuzYhPn_e_UFHiFJ5f5qUj20ZhToDqxE'
      },
      {
        title: 'Learning Python',
        author: 'Mark Lutz',
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTxNiAw-qiYB1GpZYc20MqR37auiwUTjCjfhhCJiLfnStUOZ3wLIvTGCW0'
      },
      {
        title: 'Programming in C (3rd Edition)',
        author: 'Stephen G. Kochan',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MtuHhuy0vvEesfp8aSqng4tc0k1Umt4ZydnNV1aGH4QFuPv37mrXbec'
      },
      {
        title: 'The C Puzzle Book',
        author: 'Alan R. Feuer',
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQpe21HBSNx4A48xLlQ5hx5TapRBwpXySS5DSTrt97SluntFMe9p1P5eQ'
      },
      {
        title: 'ReactJS Cookbook',
        author: 'Johannes Stein',
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQy3tjXnrSrCwho1JtSdtBIsq_hkVoJdbnsol8FaDSpzPlKV7wIkDJMONDQ'
      },
      {
        title: 'React Under The Hood',
        author: 'Freddy Rangel',
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTKtrSg02k0rpqhuoihVbCBN1k0YnuXY2PV2YjByQrq51xbIoBr2FWVVA'
      },
      {
        title: 'Effective React',
        author: 'Ian Chursky',
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTsAPxJeWUvdhSKxZuRh117lgfz9F-Td3n8Yxen3GgVeJ9Mj2gzMVrfwLbv'
      },
      {
        title: 'Learning SQL',
        author: 'Alan Beaulieu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Yj5Tk8e_uJXY2o9nNpD9FM2pYazI4LLV9AH50OVPIxxO8AjXuq0A03o'
      },
      {
        title: 'SQL Cookbook',
        author: 'Anthony Malinaro',
        image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSnomDidhowgmnTj8mTbsc6eh2LqFg8VA67g_aJKZAjsPDknU-Ynen5eec'
      },
      {
        title: 'MongoDB: The Definitive Guide',
        author: 'Kristina Chodorow',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2gH-s_19HiVMdNKqanWaToHCCadBO6iwAX7qvxpAfZQPuZB-Wb_GLyc8'
      }
    ]

    collection.insertMany(books)
    .then(() => process.exit())

  })
})()