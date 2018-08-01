import mongoose from 'mongoose'

export const SIZE_SCHEMA_NAME = 'size'

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
        required: true,
        trim: true
      }
    })
  }
}
