import mongoose from 'mongoose'

export const COLLECTION_SCHEMA_NAME = 'collection'

export class Collection extends mongoose.Schema {
  constructor () {
    super({
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      image: {
        type: String,
        required: true,
        trim: true
      }
    })
  }
}
