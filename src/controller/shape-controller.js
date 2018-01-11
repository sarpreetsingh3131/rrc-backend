import express from 'express'

import { Controller } from './controller'
import { CREATE_SHAPE, RETRIEVE_SHAPE, RETRIEVE_SHAPES, UPDATE_SHAPE, DELETE_SHAPE } from '../api/api'
import { ShapeRepository } from '../repository/shape-repository'

export class ShapeController extends express.Router {
  constructor () {
    super()
    this.controller = new Controller(new ShapeRepository())

    this.route(CREATE_SHAPE).post((req, res) => this.controller.create(req, res))

    this.route(RETRIEVE_SHAPE).get((req, res) => this.controller.retrieve(req, res))

    this.route(RETRIEVE_SHAPES).get((req, res) => this.controller.retrieve(req, res))

    this.route(UPDATE_SHAPE).put((req, res) => this.controller.update(req, res))

    this.route(DELETE_SHAPE).delete((req, res) => this.controller.delete(req, res))
  }
}
