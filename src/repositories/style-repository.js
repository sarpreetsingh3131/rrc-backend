import mongoose from 'mongoose'

import { Style, STYLE_SCHEMA_NAME } from '../models/style'
import { Repository } from './repository'

export class StyleRepository extends Repository {
  constructor () {
    super(mongoose.model(STYLE_SCHEMA_NAME, new Style()))
  }

  create (style) {
    return new Promise((resolve, reject) => {
      super.create({ name: style.name })
        .then(style => resolve(style))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id)
        .then(styles => resolve(id ? styles[0] : styles))
        .catch(err => reject(err))
    })
  }

  update (style) {
    return new Promise((resolve, reject) => {
      super.update(style.id, { style: style.name })
        .then(style => resolve(style))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(style => resolve(style))
        .catch(err => reject(err))
    })
  }
}
