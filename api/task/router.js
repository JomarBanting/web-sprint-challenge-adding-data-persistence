// build your `/api/tasks` router here
const express = require("express");

const router = express.Router();
const Task = require("./model");

router.post("/", (req, res, next) => {
    Task.postTask(req.body)
        .then(data => {
            res.json(data)
        }).catch(err => {
            next(err);
        })
})

router.get("/", (req, res, next) => {
    Task.getTasks()
    .then(data => {
        res.json(data);
    }).catch(err => {
        next(err);
    })
})


router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router;