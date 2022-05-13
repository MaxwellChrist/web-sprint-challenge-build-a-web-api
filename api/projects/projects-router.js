// Write your "projects" router here!

const express = require('express');
const Projects = require('./projects-model');
const { projectsLogger } = require('./projects-middleware');

const router = express.Router();
router.use(projectsLogger)

// router.get('/', projectsLogger, (req, res) => {
//     console.log(`${req.body.projects}\n${req.body.p}`)
//     Projects.get()
//     .then(result => {
//         if (result) {
//             res.json([]);
//         } else {
//             res.json(req.query)
//         }
//     })
// })

router.get('/', (req, res) => {
    console.log(`the request is : ${req.body}`)
    Projects.get()
    .then(result => {
        res.json(result)
    })

})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Projects.get(id)
    .then(result => {
        if (!result) {
            res.status(404).json({ message: "No ID action found" })
        } else {
            res.json(result) 
        }
    })
})

module.exports = router;