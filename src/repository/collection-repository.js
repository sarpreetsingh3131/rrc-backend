import mongoose from 'mongoose'

import { Collection } from '../model/collection'
import { Repository } from './repository'

export class CollectionRepository {
  constructor () {
    this.repository = new Repository(mongoose.model('collection', new Collection()))
  }

  create (collection) {
    return new Promise((resolve, reject) => {
      this.repository.create({ name: collection.name, image: collection.image })
        .then(collection => resolve({ collection: collection }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      this.repository.retrieve(id)
        .then(collections => resolve(id ? { collection: collections } : { collections: collections }))
        .catch(err => reject(err))
    })
  }

  update (collection) {
    return new Promise((resolve, reject) => {
      this.repository.update(collection.id, { name: collection.name, image: collection.image })
        .then(collection => resolve({ collection: collection }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then(collection => resolve({ collection: collection }))
        .catch(err => reject(err))
    })
  }
}
