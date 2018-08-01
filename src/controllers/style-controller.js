import express from 'express'

import { Controller } from './controller'
import { CREATE_STYLE, RETRIEVE_STYLE, RETRIEVE_STYLES, UPDATE_STYLE, DELETE_STYLE } from '../api/api'
import { StyleRepository } from '../repositories/style-repository'

export class StyleController extends express.Router {
  constructor () {
    super()

    this.controller = new Controller(new StyleRepository())

    this.route(CREATE_STYLE).post((req, res) => this.controller.create(req, res))

    this.route(RETRIEVE_STYLE).get((req, res) => this.controller.retrieve(req, res))

    this.route(RETRIEVE_STYLES).get((req, res) => this.controller.retrieve(req, res))

    this.route(UPDATE_STYLE).put((req, res) => this.controller.update(req, res))

    this.route(DELETE_STYLE).delete((req, res) => this.controller.delete(req, res))
  }
}
