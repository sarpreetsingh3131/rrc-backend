import express from 'express'

import { Controller } from './controller'
import { CREATE_CATEGORY, RETRIEVE_CATEGORY, RETRIEVE_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY } from '../api/api'
import { CategoryRepository } from '../repositories/category-repository'

export class CategoryController extends express.Router {
  constructor () {
    super()

    this.controller = new Controller(new CategoryRepository())

    this.route(CREATE_CATEGORY).post((req, res) => this.controller.create(req, res))

    this.route(RETRIEVE_CATEGORY).get((req, res) => this.controller.retrieve(req, res))

    this.route(RETRIEVE_CATEGORIES).get((req, res) => this.controller.retrieve(req, res))

    this.route(UPDATE_CATEGORY).put((req, res) => this.controller.update(req, res))

    this.route(DELETE_CATEGORY).delete((req, res) => this.controller.delete(req, res))
  }
}
