import mongoose from 'mongoose'

export const SHOP_INFO_SCHEMA_NAME = 'shop-info'

export class ShopInfo extends mongoose.Schema {
  constructor () {
    super({
      name: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        type: String,
        required: true,
        trim: true
      },
      phones: {
        type: Array,
        required: true
      },
      email: {
        type: String,
        required: true,
        trim: true
      }
    })
  }
}
