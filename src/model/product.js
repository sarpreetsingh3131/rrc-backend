import mongoose from 'mongoose'

export class Product extends mongoose.Schema {
  constructor () {
    super({
      name: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      images: {
        type: Array,
        required: true,
        trim: true
      },
      collections: {
        type: Array,
        required: true,
        trim: true
      },
      views: {
        type: Number,
        required: false,
        trim: true,
        default: 0
      },
      shape: {
        type: String,
        required: false,
        trim: true,
        default: 'none'
      },
      size: {
        length: {
          type: Number,
          required: false,
          trim: true,
          default: 0
        },
        width: {
          type: Number,
          required: false,
          trim: true,
          default: 0
        }
      },
      color: {
        type: String,
        required: false,
        trim: true,
        default: 'none'
      },
      style: {
        type: String,
        required: false,
        trim: true,
        default: 'none'
      },
      weave: {
        type: String,
        required: false,
        trim: true,
        default: 'none'
      }
    })
  }
}
