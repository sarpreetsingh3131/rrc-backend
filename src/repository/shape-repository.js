import mongoose from 'mongoose'

import { Shape, SHAPE_SCHEMA_NAME } from '../model/shape'
import { Repository } from './repository'
import { ImageHandler, SHAPES_DIR } from '../handler/image-handler'

export class ShapeRepository extends Repository {
  constructor () {
    super(mongoose.model(SHAPE_SCHEMA_NAME, new Shape()))
    this.handler = new ImageHandler(SHAPES_DIR)
  }

  create (shape) {
    return new Promise((resolve, reject) => {
      this.handler.create(shape.image)
        .then(path => { return super.create({ name: shape.name, image: path }) })
        .then(shape => resolve({ shape: shape }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id)
        .then(shapes => resolve(id ? { shape: shapes } : { shapes: shapes }))
        .catch(err => reject(err))
    })
  }

  update (shape) {
    return new Promise((resolve, reject) => {
      this.handler.create(shape.image)
        .then(path => { return super.update(shape.id, { name: shape.name, image: path }) })
        .then(shape => resolve({ shape: shape }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(shape => this.handler.delete(shape.image)
          .then(() => resolve({ shape: shape })))
        .catch(err => reject(err))
    })
  }
}
