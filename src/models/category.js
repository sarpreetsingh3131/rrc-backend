import mongoose from 'mongoose'

export const CATEGORY_SCHEMA_NAME = 'category'

export class Category extends mongoose.Schema {
  constructor () {
    super({
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true
      }
    })
  }
}
