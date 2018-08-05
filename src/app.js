import express from 'express'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
import morgan from 'morgan'
import { sign, verify } from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

import { DB } from './db/db'
import { BASE_URL, LOG_IN, VALIDATE_TOKEN } from './api/api'
import { CategoryController } from './controllers/category-controller'
import { ColorController } from './controllers/color-controller'
import { ProductController } from './controllers/product-controller'
import { ShapeController } from './controllers/shape-controller'
import { SizeController } from './controllers/size-controller'
import { StyleController } from './controllers/style-controller'
import { WeaveController } from './controllers/weave-controller'
import { ShopInfoController } from './controllers/shop-info-controller'

config()

new DB().connect()
  .then(msg => {
    let app = express()

    let port = process.env.NODE_ENV ? process.env.PORT : 3000

    app.use(bodyParser.json({ limit: '500mb' }))

    app.use(morgan('common', {
      stream: fs.createWriteStream(path.resolve(__dirname, '../access.log'), {flags: 'a'})
    }))

    app.use(express.static(path.resolve(__dirname, '../public')))

    app.use((req, res, next) => {
      res.type('json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      next()
    })

    app.use((req, res, next) => {
      switch (req.method) {
        case 'PUT':
        case 'POST':
        case 'DELETE':
          req.path === BASE_URL + LOG_IN
            ? next()
            : verify(req.body.token, process.env.SECRET, (err, decoded) =>
              (err || decoded.username !== process.env.USERNAME)
              ? res.status(403).send({ message: err ? err.message : 'Invalid token' })
              : next()
            )
          break
        default:
          next()
      }
    })

    app.use(BASE_URL + LOG_IN, (req, res) => {
      req.method === 'OPTIONS'
        ? res.status(200).send()
        : (req.body.username === process.env.USERNAME && req.body.password === process.env.PASSWORD)
          ? res.status(200).send({ token: sign({ username: req.body.username }, process.env.SECRET, { expiresIn: '1h' }) })
          : res.status(401).send({ message: 'Invalid credentials' })
    })

    app.use(BASE_URL + VALIDATE_TOKEN, (req, res) => {
      req.method === 'OPTIONS'
      ? res.status(200).send()
      : verify(req.body.token, process.env.SECRET, (err, decoded) =>
          (err || decoded.username !== process.env.USERNAME)
          ? res.status(403).send({ message: err.message || 'Invalid token' })
          : res.status(200).send({ message: 'Valid token' })
        )
    })

    app.use(BASE_URL,
      new ShopInfoController(),
      new CategoryController(),
      new ColorController(),
      new ProductController(),
      new ShapeController(),
      new SizeController(),
      new StyleController(),
      new WeaveController()
    )

    app.use((req, res, next) => res.status(404).send({ message: 'URL not found' }))
    app.use((req, res, next) => res.status(500).send({ message: 'Internal Server Error' }))

    app.listen(port, () => console.log(msg, '\nserver is listening on port', port))
  })
  .catch(err => console.log(err))
