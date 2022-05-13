// Write your "projects" router here!

const express = require('express');
const Projects = require('./projects-model');
const { projectsLogger } = require('./projects-middleware');

const router = express.Router();

router.get('/', projectsLogger, (req, res) => {
    console.log(`${req.body.projects}\n${req.body.p}`)
    Projects.get()
    .then(result => {
        if (result) {
            res.json([]);
        } else {
            res.json(req.query)
        }
    })
})

module.exports = router;