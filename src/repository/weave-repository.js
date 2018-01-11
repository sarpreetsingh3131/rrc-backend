import mongoose from 'mongoose'

import { Weave } from '../model/weave'
import { Repository } from './repository'

export class WeaveRepository extends Repository {
  constructor () {
    super(mongoose.model('weave', new Weave()))
  }

  create (weave) {
    return new Promise((resolve, reject) => {
      super.create({ name: weave.name })
        .then(weave => resolve({ weave: weave }))
        .catch(err => reject(err))
    })
  }

  retrieve (id) {
    return new Promise((resolve, reject) => {
      super.retrieve(id)
        .then(weaves => resolve(id ? { weave: weaves } : { weaves: weaves }))
        .catch(err => reject(err))
    })
  }

  update (weave) {
    return new Promise((resolve, reject) => {
      super.update(weave.id, { name: weave.name })
        .then(weave => resolve({ weave: weave }))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      super.delete(id)
        .then(weave => resolve({ weave: weave }))
        .catch(err => reject(err))
    })
  }
}
