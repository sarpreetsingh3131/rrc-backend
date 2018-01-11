import express from 'express'

import { Controller } from './controller'
import { CREATE_COLOR, RETRIEVE_COLOR, RETRIEVE_COLORS, UPDATE_COLOR, DELETE_COLOR } from '../api/api'
import { ColorRepository } from '../repository/color-repository'

export class CollorController extends express.Router {
  constructor () {
    super()
    this.controller = new Controller(new ColorRepository())

    this.route(CREATE_COLOR).post((req, res) => this.controller.create(req, res))

    this.route(RETRIEVE_COLOR).get((req, res) => this.controller.retrieve(req, res))

    this.route(RETRIEVE_COLORS).get((req, res) => this.controller.retrieve(req, res))

    this.route(UPDATE_COLOR).put((req, res) => this.controller.update(req, res))

    this.route(DELETE_COLOR).delete((req, res) => this.controller.delete(req, res))
  }
}
