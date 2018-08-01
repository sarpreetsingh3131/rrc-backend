import mongoose, { SchemaTypes } from 'mongoose'

import { CATEGORY_SCHEMA_NAME } from './category'
import { SHAPE_SCHEMA_NAME } from './shape'
import { SIZE_SCHEMA_NAME } from './size'
import { STYLE_SCHEMA_NAME } from './style'
import { WEAVE_SCHEMA_NAME } from './weave'
import { COLOR_SCHEMA_NAME } from './color'

export const PRODUCT_SCHEMA_NAME = 'product'

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
      category: {
        type: SchemaTypes.ObjectId,
        ref: CATEGORY_SCHEMA_NAME,
        required: false,
        trim: true
      },
      views: {
        type: Number,
        required: false,
        trim: true,
        default: 0
      },
      shape: {
        type: SchemaTypes.ObjectId,
        ref: SHAPE_SCHEMA_NAME,
        required: false,
        trim: true
      },
      size: {
        type: SchemaTypes.ObjectId,
        ref: SIZE_SCHEMA_NAME,
        required: false,
        trim: true
      },
      color: {
        type: SchemaTypes.ObjectId,
        ref: COLOR_SCHEMA_NAME,
        required: false,
        trim: true
      },
      style: {
        type: SchemaTypes.ObjectId,
        ref: STYLE_SCHEMA_NAME,
        required: false,
        trim: true
      },
      weave: {
        type: SchemaTypes.ObjectId,
        ref: WEAVE_SCHEMA_NAME,
        required: false,
        trim: true
      }
    })
  }
}
