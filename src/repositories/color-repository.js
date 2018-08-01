import mongoose from 'mongoose'

import { Color, COLOR_SCHEMA_NAME } from '../models/color'
import { Repository } from './repository'

export class ColorRepository extends Repository {
  constructor () {
    super(mongoose.model(COLOR_SCHEMA_NAME, new Color()))
  }

  create (color) {
    return new Promise((resolve, reject) => {
      super.create({ name: color.name })
        .then(color => resolve(color))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id)
        .then(colors => resolve(id ? colors[0] : colors))
        .catch(err => reject(err))
    })
  }

  update (color) {
    return new Promise((resolve, reject) => {
      super.update(color.id, { name: color.name })
        .then(color => resolve(color))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(color => resolve(color))
        .catch(err => reject(err))
    })
  }
}
