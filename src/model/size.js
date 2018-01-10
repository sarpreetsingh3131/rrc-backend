import mongoose from 'mongoose'

export class Size extends mongoose.Schema {
  constructor () {
    super({
      length: {
        type: Number,
        required: true,
        trim: true
      },
      width: {
        type: Number,
        required: false,
        trim: true
      }
    })
  }
}
