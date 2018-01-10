import mongoose from 'mongoose'

export class Shape extends mongoose.Schema {
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
