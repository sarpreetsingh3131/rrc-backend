import mongoose from 'mongoose'

export const STYLE_SCHEMA_NAME = 'style'

export class Style extends mongoose.Schema {
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
