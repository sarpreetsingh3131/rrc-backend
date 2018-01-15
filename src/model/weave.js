import mongoose from 'mongoose'

export const WEAVE_SCHEMA_NAME = 'weave'

export class Weave extends mongoose.Schema {
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
