import mongoose from 'mongoose'

export class DB {
  constructor () {
    mongoose.Promise = global.Promise
  }

  connect () {
    return new Promise((resolve, reject) => {
      mongoose.connect(process.env.DB_URI, { useMongoClient: true })
        .then(() => resolve('connected to DB'))
        .catch(() => reject(new Error('cannot connect to DB')))
    })
  }
}
