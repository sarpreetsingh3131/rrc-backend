import express from 'express'

import { Controller } from './controller'
import { CREATE_SHOP_INFO, RETRIEVE_SHOP_INFO, UPDATE_SHOP_INFO } from '../api/api'
import { ShopInfoRepository } from '../repositories/shop-info-repository'

export class ShopInfoController extends express.Router {
  constructor () {
    super()

    this.controller = new Controller(new ShopInfoRepository())

    this.route(CREATE_SHOP_INFO).post((req, res) => this.controller.create(req, res))

    this.route(RETRIEVE_SHOP_INFO).get((req, res) => this.controller.retrieve(req, res))

    this.route(UPDATE_SHOP_INFO).put((req, res) => this.controller.update(req, res))
  }
}
