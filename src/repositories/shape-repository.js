import mongoose from 'mongoose'

import { Shape, SHAPE_SCHEMA_NAME } from '../models/shape'
import { Repository } from './repository'

export class ShapeRepository extends Repository {
  constructor () {
    super(mongoose.model(SHAPE_SCHEMA_NAME, new Shape()))
    this.populate = ''
    this.sort = 'name'
  }

  create (shape) {
    return new Promise((resolve, reject) => {
      super.create({ name: shape.name })
        .then(shape => resolve(shape))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id, this.populate, this.sort)
        .then(shapes => resolve(shapes))
        .catch(err => reject(err))
    })
  }

  update (shape) {
    return new Promise((resolve, reject) => {
      super.update(shape.id, { name: shape.name }, this.populate)
        .then(shape => resolve(shape))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(shape => resolve(shape))
        .catch(err => reject(err))
    })
  }
}
