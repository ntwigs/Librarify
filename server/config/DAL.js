import mongodb from 'mongodb'
import mongo from './secret/Mongo'

export default class DAL {
  constructor() {
    this.url = mongo.connectionURL
    this.mongoClient = mongodb.MongoClient
  }

  connect() {
    return new Promise((res, rej) => {
      console.log(mongo)
      this.mongoClient.connect(this.url, (err, db) => {
        if (err) {
          rej(err)
        }
        res(db)
      }) 
    })
  }

  readAll(db) {
    return new Promise((res, rej) => {
      const collection = db.collection('Books')
      
      collection.find({}).toArray((err, result) => {
        if (err) {
          rej(err)
        }
        res(result)
      }) 
    })
  }

  createBook(db, title, author, image) {
    return new Promise((res, rej) => {
      const collection = db.collection('Books')
      let book = {
        'title': title,
        'author': author,
        'image': image
      }
      collection.insert(book, (err, result) => {
        if (err) {
          rej(err)
        }
        res(result)
      })

    })
  }

  close(db) {
    db.close()
  }

}