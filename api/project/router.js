// build your `/api/projects` router here
const express = require("express")

const router = express.Router();
const Project = require("./model")

router.post("/", (req, res, next) => {
    Project.postProject(req.body)
    .then(result => {
        res.json(result)
    }).catch(err => {
        next(err);
    })
})

router.get("/", (req, res, next) => {
    Project.getProject()
    .then(result => {
        res.json(result)
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
