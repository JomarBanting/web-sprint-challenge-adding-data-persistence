// build your `/api/resources` router here
const express = require('express')

const router = express.Router();
const Resource = require("./model")

router.get("/", (req, res, next) => {
    Resource.getResources()
    .then(data => {
        res.json(data)
    }).catch(err => {
        next(err)
    })
})


router.post("/", (req, res, next) => {
    Resource.postResources(req.body)
    .then(data => {
        res.json(data)
    }).catch(err => {
        next(err)
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

  module.exports = router;