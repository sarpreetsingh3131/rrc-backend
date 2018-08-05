import fs from 'fs'
import path from 'path'
import { Buffer } from 'buffer'

import { MyError } from '../error/my-error'

const IMG_DIR = path.resolve(__dirname, process.env.NODE_ENV ? '../' : '../../', 'public/assets/uploads')
const DELETE_PATH = path.resolve(__dirname, process.env.NODE_ENV ? '../' : '../../', 'public')
export const PRODUCTS_DIR = path.resolve(IMG_DIR, 'products')

export class ImageService {
  constructor (directory) {
    this.directory = directory
  }

  create (image) {
    return new Promise((resolve, reject) => {
      this.validate(image)
        .then(image => resolve(this.writeImage(image.data.replace(/^data:image\/\w+;base64,/, ''), image.name, image.size)))
        .catch(err => reject(new MyError(err.message, 400)))
    })
  }

  delete (filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(DELETE_PATH, filePath), (err) => err ? reject(new MyError(err.message, 500)) : resolve())
    })
  }

  validate (image) {
    return new Promise((resolve, reject) => {
      (image.data.length > 1 && image.name.length > 1) ? resolve(image) : reject(new MyError('Invalid image', 400))
    })
  }

  writeImage (data, name, size) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.directory + '/' + name, Buffer.alloc(size, data, 'base64'), (err) =>
        err ? reject(new MyError(err.message, 400)) : resolve(this.directory.split('public')[1] + '/' + name))
    })
  }
}
