import mongoose from 'mongoose'

import { Weave, WEAVE_SCHEMA_NAME } from '../models/weave'
import { Repository } from './repository'

export class WeaveRepository extends Repository {
  constructor () {
    super(mongoose.model(WEAVE_SCHEMA_NAME, new Weave()))
    this.populate = ''
    this.sort = 'name'
  }

  create (weave) {
    return new Promise((resolve, reject) => {
      super.create({ name: weave.name })
        .then(weave => resolve(weave))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id, this.populate, this.sort)
        .then(weaves => resolve(weaves))
        .catch(err => reject(err))
    })
  }

  update (weave) {
    return new Promise((resolve, reject) => {
      super.update(weave.id, { name: weave.name }, this.populate)
        .then(weave => resolve(weave))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(weave => resolve(weave))
        .catch(err => reject(err))
    })
  }
}
