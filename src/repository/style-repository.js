import mongoose from 'mongoose'

import { Style } from '../model/style'
import { Repository } from './repository'

export class ColorRepository {
  constructor () {
    this.repository = new Repository(mongoose.model('style', new Style()))
  }

  create (style) {
    return new Promise((resolve, reject) => {
      this.repository.create({ name: style.name })
        .then(style => resolve({ style: style }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      this.repository.retrieve(id)
        .then(styles => resolve(id ? { style: styles } : { styles: styles }))
        .catch(err => reject(err))
    })
  }

  update (style) {
    return new Promise((resolve, reject) => {
      this.repository.update(style.id, { style: style.name })
        .then(style => resolve({ style: style }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then(style => resolve({ style: style }))
        .catch(err => reject(err))
    })
  }
}
