import mongoose from 'mongoose'

export class DB {
  constructor () {
    mongoose.Promise = global.Promise
    this.uri = 'mongodb://localhost:27017/RRC'
  }

  connect () {
    return new Promise((resolve, reject) => {
      mongoose.connect(this.uri, { useMongoClient: true })
        .then(() => resolve('connected to DB'))
        .catch(() => reject(new Error('cannot connect to DB')))
    })
  }
}
