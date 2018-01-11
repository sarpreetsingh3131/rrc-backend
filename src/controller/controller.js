export class Controller {
  constructor (repository) {
    this.repository = repository
  }

  create (req, res) {
    this.repository.create(req.body)
      .then(result => res.status(201).send(result))
      .catch(err => res.status(err.status || 500).send({ err: err.message }))
  }

  retrieve (req, res) {
    this.repository.retrieve(req.params.id)
      .then(result => res.status(200).send(result))
      .catch(err => res.status(err.status || 500).send({ err: err.message }))
  }

  update (req, res) {
    this.repository.update(req.body)
      .then(result => res.status(200).send(result))
      .catch(err => res.status(err.status || 500).send({ err: err.message }))
  }

  delete (req, res) {
    this.repository.delete(req.params.id)
      .then(result => res.status(200).send(result))
      .catch(err => res.status(err.status || 500).send({ err: err.message }))
  }
}
