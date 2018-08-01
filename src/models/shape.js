import mongoose from 'mongoose'

export const SHAPE_SCHEMA_NAME = 'shape'

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
