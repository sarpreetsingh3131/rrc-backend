import mongoose from 'mongoose'

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
