import mongoose from 'mongoose'

import { Size, SIZE_SCHEMA_NAME } from '../models/size'
import { Repository } from './repository'

export class SizeRepository extends Repository {
  constructor () {
    super(mongoose.model(SIZE_SCHEMA_NAME, new Size()))
  }

  create (size) {
    return new Promise((resolve, reject) => {
      super.create({
        length: size.length,
        width: size.width
      })
        .then(size => resolve(size))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id)
        .then(sizes => resolve(id ? sizes[0] : sizes))
        .catch(err => reject(err))
    })
  }

  update (size) {
    return new Promise((resolve, reject) => {
      super.update(size.id, {
        length: size.length,
        width: size.width
      })
        .then(size => resolve(size))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(size => resolve(size))
        .catch(err => reject(err))
    })
  }
}
