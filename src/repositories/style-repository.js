import mongoose from 'mongoose'

import { Style, STYLE_SCHEMA_NAME } from '../models/style'
import { Repository } from './repository'

export class StyleRepository extends Repository {
  constructor () {
    super(mongoose.model(STYLE_SCHEMA_NAME, new Style()))
    this.populate = ''
    this.sort = 'name'
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
      super.retrieve(id, this.populate, this.sort)
        .then(styles => resolve(styles))
        .catch(err => reject(err))
    })
  }

  update (style) {
    return new Promise((resolve, reject) => {
      super.update(style.id, { style: style.name }, this.populate)
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
