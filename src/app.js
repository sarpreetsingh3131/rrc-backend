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
    let port = process.env.PORT || 4000

    app.use(bodyParser.json({ limit: '500mb' }))
    app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))
    app.use(morgan('common', {
      stream: fs.createWriteStream(path.join(__dirname, '..', 'access.log'), {flags: 'a'})
    }))

    app.use((req, res, next) => {
      res.type('json')
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, HEAD')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

      switch (req.method) {
        case 'PUT':
        case 'POST':
        case 'DELETE':
          req.path === BASE_URL + LOG_IN ? next() : verify(req.body.token, process.env.SECRET,
            (err, decoded) => (err || decoded.username !== process.env.USERNAME)
              ? res.status(403).send({ message: err.message || 'Invalid token' }) : next()
          )
          break
        default:
          next()
      }
    })

    app.use(BASE_URL + LOG_IN, (req, res) => {
      req.method === 'OPTIONS' ? res.status(200).send()
        : (req.body.username === process.env.USERNAME && req.body.password === process.env.PASSWORD)
          ? res.status(200).send({ token: sign({ username: req.body.username }, process.env.SECRET, { expiresIn: '1d' }) })
          : res.status(401).send({ message: 'Invalid credentials' })
    })

    app.use(BASE_URL + VALIDATE_TOKEN, (req, res) => {
      if (req.method === 'OPTIONS') res.status(200).send()
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
    app.use((err, req, res, next) => res.status(500).send({ message: err.message }))

    app.listen(port, () => console.log(msg, '\napp is listening on port', port))
  })
  .catch(err => console.log(err))
