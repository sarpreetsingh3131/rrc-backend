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

  retrieve (id, populate, sort) {
    return new Promise((resolve, reject) => {
      this.model.find(id ? { _id: id } : {}).populate(populate).sort(sort).exec()
        .then(entities => id
          ? (entities[0] ? resolve(entities[0]) : reject(new MyError('Entity not found', 404)))
          : resolve(entities))
        .catch(err => reject(new MyError(err.message, 400)))
    })
  }

  update (id, entity, populate) {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndUpdate({ _id: id }, entity, {
        new: true,
        runValidators: true
      }).populate(populate).exec()
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

  search (query, populate, sort) {
    return new Promise((resolve, reject) => {
      this.model.find(query).populate(populate).sort(sort).exec()
        .then(entities => resolve(entities))
        .catch(err => reject(new MyError(err.message, 400)))
    })
  }
}
