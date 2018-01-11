import express from 'express'

import { Controller } from './controller'
import { CREATE_COLLECTION, RETRIEVE_COLLECTION, RETRIEVE_COLLECTIONS, UPDATE_COLLECTION, DELETE_COLLECTION } from '../api/api'
import { CollectionRepository } from '../repository/collection-repository'

export class CollectionController extends express.Router {
  constructor () {
    super()
    this.controller = new Controller(new CollectionRepository())

    this.route(CREATE_COLLECTION).post((req, res) => this.controller.create(req, res))

    this.route(RETRIEVE_COLLECTION).get((req, res) => this.controller.retrieve(req, res))

    this.route(RETRIEVE_COLLECTIONS).get((req, res) => this.controller.retrieve(req, res))

    this.route(UPDATE_COLLECTION).put((req, res) => this.controller.update(req, res))

    this.route(DELETE_COLLECTION).delete((req, res) => this.controller.delete(req, res))
  }
}
