import express from 'express'

import { Controller } from './controller'
import { CREATE_SIZE, RETRIEVE_SIZE, RETRIEVE_SIZES, UPDATE_SIZE, DELETE_SIZE } from '../api/api'
import { SizeRepository } from '../repository/shape-repository'

export class SizeController extends express.Router {
  constructor () {
    super()
    this.controller = new Controller(new SizeRepository())

    this.route(CREATE_SIZE).post((req, res) => this.controller.create(req, res))

    this.route(RETRIEVE_SIZE).get((req, res) => this.controller.retrieve(req, res))

    this.route(RETRIEVE_SIZES).get((req, res) => this.controller.retrieve(req, res))

    this.route(UPDATE_SIZE).put((req, res) => this.controller.update(req, res))

    this.route(DELETE_SIZE).delete((req, res) => this.controller.delete(req, res))
  }
}
