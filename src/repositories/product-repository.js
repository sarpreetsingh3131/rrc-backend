import mongoose from 'mongoose'

import { Product, PRODUCT_SCHEMA_NAME } from '../models/product'
import { Repository } from './repository'
import { ImageService, PRODUCTS_DIR } from '../services/image-service'

export class ProductRepository extends Repository {
  constructor () {
    super(mongoose.model(PRODUCT_SCHEMA_NAME, new Product()))
    this.imageService = new ImageService(PRODUCTS_DIR)
  }

  create (product) {
    return new Promise((resolve, reject) => {
      super.create(product)
        .then(product => resolve(product))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id, 'category shape size color style weave')
        .then(products => resolve(id ? products[0] : products))
        .catch(err => reject(err))
    })
  }

  update (product) {
    return new Promise((resolve, reject) => {
      super.update(product.id, product)
        .then(product => resolve(product))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(product => resolve(product))
        .catch(err => reject(err))
    })
  }

  paths (images, isCreating = true) {
    return new Promise((resolve, reject) => {
      let promises = []
      images.map(image => promises.push(isCreating ? this.imageService.create(image) : this.imageService.delete(image)))
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
      category: product.category,
      views: product.views,
      shape: product.shape,
      size: product.size,
      color: product.color,
      style: product.style,
      weave: product.weave
    }
  }
}
