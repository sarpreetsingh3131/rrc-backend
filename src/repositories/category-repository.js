import mongoose from 'mongoose'

import { Category, CATEGORY_SCHEMA_NAME } from '../models/category'
import { Repository } from './repository'

export class CategoryRepository extends Repository {
  constructor () {
    super(mongoose.model(CATEGORY_SCHEMA_NAME, new Category()))
    this.populate = ''
    this.sort = 'name'
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
      super.retrieve(id, this.populate, this.sort)
        .then(collections => resolve(collections))
        .catch(err => reject(err))
    })
  }

  update (collection) {
    return new Promise((resolve, reject) => {
      super.update(collection.id, { name: collection.name }, this.populate)
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
