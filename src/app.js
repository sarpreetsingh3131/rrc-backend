import express from 'express'
import bodyParser from 'body-parser'
import { config } from 'dotenv'

import { DB } from './db/db'
import { BASE_URL } from './api/api'
import { CollectionController } from './controller/collection-controller'
import { ColorController } from './controller/color-controller'
import { ProductController } from './controller/product-controller'
import { ShapeController } from './controller/shape-controller'
import { SizeController } from './controller/size-controller'
import { StyleController } from './controller/style-controller'
import { WeaveController } from './controller/weave-controller'

config()

new DB().connect()
    .then(msg => {
      let app = express()
      let port = process.env.PORT || 4000

      app.use(bodyParser.json())

      app.use((req, res, next) => {
        res.type('json')
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        next()
      })

      app.use(BASE_URL,
            new CollectionController(),
            new ColorController(),
            new ProductController(),
            new ShapeController(),
            new SizeController(),
            new StyleController(),
            new WeaveController()
      )

      app.use((req, res, next) => res.status(404).send({ err: 'not found' }))
      app.use((err, req, res, next) => res.status(500).send({ err: err.message }))

      app.listen(port, () => console.log(msg, '\napp is listening on port', port))
    })
    .catch(err => console.log(err))
