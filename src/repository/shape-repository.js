import mongoose from 'mongoose'

import { Shape } from '../model/shape'
import { Repository } from './repository'

export class ShapeRepository {
  constructor () {
    this.repository = new Repository(mongoose.model('shape', new Shape()))
  }

  create (shape) {
    return new Promise((resolve, reject) => {
      this.repository.create({ name: shape.name, image: shape.image })
        .then(shape => resolve({ shape: shape }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      this.repository.retrieve(id)
        .then(shapes => resolve(id ? { shape: shapes } : { shapes: shapes }))
        .catch(err => reject(err))
    })
  }

  update (shape) {
    return new Promise((resolve, reject) => {
      this.repository.update(shape.id, { name: shape.name, image: shape.image })
        .then(shape => resolve({ shape: shape }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then(shape => resolve({ shape: shape }))
        .catch(err => reject(err))
    })
  }
}
