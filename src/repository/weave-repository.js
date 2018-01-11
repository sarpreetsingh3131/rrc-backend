import mongoose from 'mongoose'

import { Weave } from '../model/weave'
import { Repository } from './repository'

export class ColorRepository {
  constructor () {
    this.repository = new Repository(mongoose.model('weave', new Weave()))
  }

  create (weave) {
    return new Promise((resolve, reject) => {
      this.repository.create({ name: weave.name })
        .then(weave => resolve({ weave: weave }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      this.repository.retrieve(id)
        .then(weaves => resolve(id ? { weave: weaves } : { weaves: weaves }))
        .catch(err => reject(err))
    })
  }

  update (weave) {
    return new Promise((resolve, reject) => {
      this.repository.update(weave.id, { name: weave.name })
        .then(weave => resolve({ weave: weave }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then(weave => resolve({ weave: weave }))
        .catch(err => reject(err))
    })
  }
}
