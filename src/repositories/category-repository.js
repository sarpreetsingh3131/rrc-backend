import mongoose from 'mongoose'

import { Category, CATEGORY_SCHEMA_NAME } from '../models/category'
import { Repository } from './repository'

export class CategoryRepository extends Repository {
  constructor () {
    super(mongoose.model(CATEGORY_SCHEMA_NAME, new Category()))
  }

  create (collection) {
    return new Promise((resolve, reject) => {
      super.create({ name: collection.name })
        .then(collection => resolve(collection))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id)
        .then(collections => resolve(id ? collections[0] : collections))
        .catch(err => reject(err))
    })
  }

  update (collection) {
    return new Promise((resolve, reject) => {
      super.update(collection.id, { name: collection.name })
        .then(collection => resolve(collection))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(collection => resolve(collection))
        .catch(err => reject(err))
    })
  }
}
