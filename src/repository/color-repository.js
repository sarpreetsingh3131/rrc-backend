import mongoose from 'mongoose'

import { Color } from '../model/color'
import { Repository } from './repository'

export class ColorRepository {
  constructor () {
    this.repository = new Repository(mongoose.model('color', new Color()))
  }

  create (color) {
    return new Promise((resolve, reject) => {
      this.repository.create({ name: color.name, image: color.image })
        .then(color => resolve({ color: color }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      this.repository.retrieve(id)
        .then(colors => resolve(id ? { color: colors } : { colors: colors }))
        .catch(err => reject(err))
    })
  }

  update (color) {
    return new Promise((resolve, reject) => {
      this.repository.update(color.id, { name: color.name, image: color.image })
        .then(color => resolve({ color: color }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then(color => resolve({ color: color }))
        .catch(err => reject(err))
    })
  }
}
