import mongoose from 'mongoose'

import { ShopInfo, SHOP_INFO_SCHEMA_NAME } from '../models/shop-info'
import { Repository } from './repository'

export class ShopInfoRepository extends Repository {
  constructor () {
    super(mongoose.model(SHOP_INFO_SCHEMA_NAME, new ShopInfo()))
    this.populate = ''
    this.sort = ''
  }

  create (shopInfo) {
    return new Promise((resolve, reject) => {
      super.create({
        name: shopInfo.name,
        address: shopInfo.address,
        phones: shopInfo.phones,
        email: shopInfo.email
      })
        .then(shop => resolve(shop))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id, this.populate, this.sort)
        .then(shop => resolve(shop[0]))
        .catch(err => reject(err))
    })
  }

  update (shopInfo) {
    return new Promise((resolve, reject) => {
      super.update(shopInfo.id, {
        name: shopInfo.name,
        address: shopInfo.address,
        phones: shopInfo.phones,
        email: shopInfo.email
      }, this.populate)
        .then(shop => resolve(shop))
        .catch(err => reject(err))
    })
  }
}
