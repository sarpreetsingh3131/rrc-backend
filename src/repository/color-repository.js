import mongoose from 'mongoose'

import { Color } from '../model/color'
import { Repository } from './repository'
import { ImageHandler, COLORS_DIR } from '../handler/image-handler'

export class ColorRepository extends Repository {
  constructor () {
    super(mongoose.model('color', new Color()))
    this.handler = new ImageHandler(COLORS_DIR)
  }

  create (color) {
    return new Promise((resolve, reject) => {
      this.handler.create(color.image)
        .then(path => { return super.create({ name: color.name, image: path }) })
        .then(color => resolve({ color: color }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id)
        .then(colors => resolve(id ? { color: colors } : { colors: colors }))
        .catch(err => reject(err))
    })
  }

  update (color) {
    return new Promise((resolve, reject) => {
      this.handler.create(color.image)
        .then(path => { return super.update(color.id, { name: color.name, image: path }) })
        .then(color => resolve({ color: color }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(color => this.handler.delete(color.image)
          .then(() => resolve({ color: color })))
        .catch(err => reject(err))
    })
  }
}
