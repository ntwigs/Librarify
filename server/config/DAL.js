import mongodb from 'mongodb'
import mongo from './secret/Mongo'

export default class DAL {
  constructor() {
    this.url = mongo.connectionURL
    this.mongoClient = mongodb.MongoClient
  }

  connect() {
    return new Promise((res, rej) => {
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
      collection.find({}).toArray()
        .then(result => res(result))
        .catch(err => rej(err))
    })
  }

  readOne(db, book) {
    return new Promise((res, rej) => {
      const objectID = new mongodb.ObjectId(book)
      const collection = db.collection('Books')
      collection.findOne({_id: objectID})
        .then(result => res(result))
        .catch(err => rej(err))
    })
  }

  createBook(db, title, author, image) {
    return new Promise((res, rej) => {
      const collection = db.collection('Books')
      const book = {
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

  deleteBook(db, id) {
    return new Promise((res, rej) => {
      const objectID = new mongodb.ObjectId(id)
      const collection = db.collection('Books')

      collection.deleteOne({_id: objectID})
        .then(() => res())
        .catch(err => rej(err))
    })
  }

  updateBook(db, id, author, title) {
    return new Promise((res, rej) => {
      const objectId = new mongodb.ObjectID(id)
      const collection = db.collection('Books')

      collection.updateOne(
        {_id: objectId},
        { $set: { 'author': author, 'title': title}}
      )
        .then(result => res(result))
        .catch(err => rej(err))                   
    })
  }

  bookSearch(db, string) {
    return new Promise((res, rej) => {
      const collection = db.collection('Books')
      collection.find({$or: [{'title': {$regex: string}}, {'author': {$regex: string}}]}).toArray()
        .then(result => res(result))
        .catch(err => rej(err))
    })
  }

  close(db) {
    db.close()
  }
}