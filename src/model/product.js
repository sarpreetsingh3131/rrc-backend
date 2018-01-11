import mongoose from 'mongoose'

import { Shape } from './shape'
import { Size } from './size'
import { Color } from './color'
import { Style } from './style'
import { Weave } from './weave'

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
      views: {
        type: Number,
        required: false,
        trim: true
      },
      shape: {
        type: Shape,
        required: false,
        trim: true
      },
      size: {
        type: Size,
        required: false,
        trim: true
      },
      color: {
        type: Color,
        required: false,
        trim: true
      },
      images: {
        type: Array,
        required: true,
        trim: true
      },
      style: {
        type: Style,
        required: false,
        trim: true
      },
      collections: {
        type: Array,
        required: true,
        trim: true
      },
      weave: {
        type: Weave,
        required: false,
        trim: true
      }
    })
  }
}
