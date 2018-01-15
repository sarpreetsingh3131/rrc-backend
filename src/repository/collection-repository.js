import mongoose from 'mongoose'

import { Collection, COLLECTION_SCHEMA_NAME } from '../model/collection'
import { Repository } from './repository'
import { ImageHandler, COLLECTIONS_DIR } from '../handler/image-handler'

export class CollectionRepository extends Repository {
  constructor () {
    super(mongoose.model(COLLECTION_SCHEMA_NAME, new Collection()))
    this.handler = new ImageHandler(COLLECTIONS_DIR)
  }

  create (collection) {
    return new Promise((resolve, reject) => {
      this.handler.create(collection.image)
        .then(path => { return super.create({ name: collection.name, image: path }) })
        .then(collection => resolve({ collection: collection }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id)
        .then(collections => resolve(id ? { collection: collections } : { collections: collections }))
        .catch(err => reject(err))
    })
  }

  update (collection) {
    return new Promise((resolve, reject) => {
      this.handler.create(collection.image)
        .then(path => super.update(collection.id, { name: collection.name, image: path }))
        .then(collection => resolve({ collection: collection }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(collection => this.handler.delete(collection.image)
          .then(() => resolve({ collection: collection })))
        .catch(err => reject(err))
    })
  }
}
