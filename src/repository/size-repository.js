import mongoose from 'mongoose'

import { Size } from '../model/size'
import { Repository } from './repository'

export class SizeRepository extends Repository {
  constructor () {
    super(mongoose.model('size', new Size()))
  }

  create (size) {
    return new Promise((resolve, reject) => {
      super.create({ length: size.length, width: size.width })
        .then(size => resolve({ size: size }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id)
        .then(sizes => resolve(id ? { size: sizes } : { sizes: sizes }))
        .catch(err => reject(err))
    })
  }

  update (size) {
    return new Promise((resolve, reject) => {
      super.update(size.id, { length: size.length, width: size.width })
        .then(size => resolve({ size: size }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(size => resolve({ size: size }))
        .catch(err => reject(err))
    })
  }
}
