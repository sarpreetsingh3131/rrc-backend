import mongoose from 'mongoose'

import { Product, PRODUCT_SCHEMA_NAME } from '../models/product'
import { Repository } from './repository'
import { ImageService, PRODUCTS_DIR } from '../services/image-service'

export class ProductRepository extends Repository {
  constructor () {
    super(mongoose.model(PRODUCT_SCHEMA_NAME, new Product()))
    this.imageService = new ImageService(PRODUCTS_DIR)
    this.populate = 'category shape size color style weave'
    this.sort = 'name'
  }

  create (product) {
    return new Promise((resolve, reject) => {
      this.createImages(product.images)
        .then(images => { return super.create(this.product(product, images)) })
        .then(product => { return super.retrieve(product._id, this.populate, this.sort) })
        .then(product => resolve(product))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id, this.populate, this.sort)
        .then(products => {
          if (id) {
            super.update(products._id, { views: products.views + 1 }, this.populate, this.sort)
              .then(product => resolve(product))
              .catch(err => reject(err))
          }
          resolve(products)
        })
        .catch(err => reject(err))
    })
  }

  update (product) {
    return new Promise((resolve, reject) => {
      super.retrieve(product.id, this.populate, this.sort)
        .then(oldProduct => { return this.updateImages(oldProduct.images, product.images) })
        .then(images => { return super.update(product.id, this.product(product, images), this.populate, this.sort) })
        .then(product => resolve(product))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(product => this.deleteImages(product.images)
          .then(() => resolve(product)))
        .catch(err => reject(err))
    })
  }

  search (query) {
    return new Promise((resolve, reject) => {
      super.search(query, this.populate, this.sort)
        .then(products => resolve(products))
        .catch(err => reject(err))
    })
  }

  createImages (images) {
    return new Promise((resolve, reject) => {
      let promises = []
      images.map(image => promises.push(this.imageService.create(image)))
      Promise.all(promises)
        .then(images => resolve(images || []))
        .catch(err => reject(err))
    })
  }

  deleteImages (images) {
    return new Promise((resolve, reject) => {
      let promises = []
      images.map(image => promises.push(this.imageService.delete(image)))
      Promise.all(promises)
        .then(() => resolve([]))
        .catch(err => reject(err))
    })
  }

  updateImages (old, nw) {
    return new Promise((resolve, reject) => {
      if (nw.length === 0) {
        this.deleteImages(old)
          .then(images => resolve(images))
          .catch(err => reject(err))
      } else if (old.length === 0) {
        this.createImages(nw)
          .then(images => resolve(images))
          .catch(err => reject(err))
      } else {
        let newImages = []
        let oldImages = []
        nw.map(image => {
          if (image.name) {
            newImages.push(image)
          } else {
            let index = old.indexOf(image)
            if (index >= 0) {
              oldImages.push(image)
              old.splice(index, 1)
            }
          }
        })
        Promise.all([
          this.createImages(newImages),
          this.deleteImages(old)
        ])
        .then(res => {
          let images = res[0]
          oldImages.map(image => images.push(image))
          resolve(images)
        })
        .catch(err => reject(err))
      }
    })
  }

  product (product, images) {
    let p = {
      ...product,
      images: images
    }
    if (p.created) { delete p.created }
    return p
  }
}
