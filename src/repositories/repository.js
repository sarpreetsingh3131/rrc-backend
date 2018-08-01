import mongoose from 'mongoose'

import { MyError } from '../error/my-error'

export class Repository {
  constructor (model) {
    mongoose.Promise = global.Promise
    this.model = model
  }

  create (entity) {
    return new Promise((resolve, reject) => {
      this.model.init()
        .then(() => { return this.model.create(entity) })
        .then(entity => resolve(entity))
        .catch(err => reject(new MyError(err.message, 400)))
    })
  }

  retrieve (id, populate = '') {
    return new Promise((resolve, reject) => {
      this.model.find(id ? { _id: id } : {}).populate(populate).sort('name').exec()
        .then(entities => id ? (entities[0] ? resolve(entities[0]) : reject(new MyError('Entity not found', 404)))
          : resolve(entities))
        .catch(err => reject(new MyError(err.message, 400)))
    })
  }

  update (id, entity) {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndUpdate({ _id: id }, entity, {
        new: true,
        runValidators: true
      }).exec()
        .then(entity => entity ? resolve(entity) : reject(new MyError('Entity not found', 404)))
        .catch(err => reject(new MyError(err.message, 400)))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndRemove({ _id: id }).exec()
        .then(entity => entity ? resolve(entity) : reject(new MyError('Entity not found', 404)))
        .catch(err => reject(new MyError(err.message, 400)))
    })
  }
}
