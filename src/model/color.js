import mongoose from 'mongoose'

export const COLOR_SCHEMA_NAME = 'color'

export class Color extends mongoose.Schema {
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
