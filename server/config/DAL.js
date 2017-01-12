import mongodb from 'mongodb'
import mongo from './secret/Mongo'

export default class DAL {
  constructor() {
    this.url = mongo.connection
    this.mongoClient = mongodb.MongoClient
  }

  connect() {
    return new Promise((res, rej) => {
      this.mongoClient.connect(this.url, (err, db) => {
        if (err) {
          reject(err)
        }
        resolve(db)
      }) 
    })
  }




  close(db) {
    db.close()
  }



}