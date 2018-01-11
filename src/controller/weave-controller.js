import express from 'express'

import { Controller } from './controller'
import { CREATE_WEAVE, RETRIEVE_WEAVE, RETRIEVE_WEAVES, UPDATE_WEAVE, DELETE_WEAVE } from '../api/api'
import { WeaveRepository } from '../repository/weave-repository'

export class CollorController extends express.Router {
  constructor () {
    super()
    this.controller = new Controller(new WeaveRepository())

    this.route(CREATE_WEAVE).post((req, res) => this.controller.create(req, res))

    this.route(RETRIEVE_WEAVE).get((req, res) => this.controller.retrieve(req, res))

    this.route(RETRIEVE_WEAVES).get((req, res) => this.controller.retrieve(req, res))

    this.route(UPDATE_WEAVE).put((req, res) => this.controller.update(req, res))

    this.route(DELETE_WEAVE).delete((req, res) => this.controller.delete(req, res))
  }
}
