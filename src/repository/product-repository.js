import mongoose, { Promise } from 'mongoose'

import { Product } from '../model/product'
import { Repository } from './repository'
import { ImageHandler, PRODUCTS_DIR } from '../handler/image-handler'

export class ProductRepository extends Repository {
  constructor () {
    super(mongoose.model('product', new Product()))
    this.handler = new ImageHandler(PRODUCTS_DIR)
  }

  create (product) {
    return new Promise((resolve, reject) => {
      this.paths(product.images)
        .then(paths => { return super.create(this.product(product, paths)) })
        .then(product => resolve({ product: product }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id)
        .then(products => resolve(id ? { product: products } : { products: products }))
        .catch(err => reject(err))
    })
  }

  update (product) {
    return new Promise((resolve, reject) => {
      this.paths(product.images)
        .then(paths => { return super.update(product.id, this.product(product, paths)) })
        .then(product => resolve({ product: product }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(product => this.paths(product.images, false)
          .then(() => resolve({ product: product })))
        .catch(err => reject(err))
    })
  }

  paths (images, isCreating = true) {
    return new Promise((resolve, reject) => {
      let promises = []
      images.map(image => promises.push(isCreating ? this.handler.create(image) : this.handler.delete(image)))
      Promise.all(promises)
        .then(paths => resolve(paths || null))
        .catch(err => reject(err))
    })
  }

  product (product, paths) {
    return {
      name: product.name,
      price: product.price,
      description: product.description,
      images: paths,
      collections: product.collections,
      views: product.views,
      shape: product.shape,
      size: product.size,
      color: product.color,
      style: product.style,
      weave: product.weave
    }
  }
}
