import express from 'express'

import { Controller } from './controller'
import { CREATE_PRODUCT, RETRIEVE_PRODUCT, RETRIEVE_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT } from '../api/api'
import { ProductRepository } from '../repository/product-repository'

export class ProductController extends express.Router {
  constructor () {
    super()
    this.controller = new Controller(new ProductRepository())

    this.route(CREATE_PRODUCT).post((req, res) => this.controller.create(req, res))

    this.route(RETRIEVE_PRODUCT).get((req, res) => this.controller.retrieve(req, res))

    this.route(RETRIEVE_PRODUCTS).get((req, res) => this.controller.retrieve(req, res))

    this.route(UPDATE_PRODUCT).put((req, res) => this.controller.update(req, res))

    this.route(DELETE_PRODUCT).delete((req, res) => this.controller.delete(req, res))
  }
}
