import mongoose from 'mongoose'

export const SIZE_SCHEMA_NAME = 'size'

export class Size extends mongoose.Schema {
  constructor () {
    super({
      length: {
        type: String,
        required: true,
        trim: true
      },
      width: {
        type: String,
        required: true,
        trim: true
      },
      unit: {
        type: String,
        required: true,
        trim: true
      }
    })
  }
}
