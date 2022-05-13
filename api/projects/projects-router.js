// Write your "projects" router here!

const express = require('express');
const Projects = require('./projects-model');
const { projectsLogger, projectsIdChecker, projectsValidater } = require('./projects-middleware');

const router = express.Router();
router.use(projectsLogger)

router.get('/', (req, res) => {
    console.log(`the request is : ${req.body}`)
    Projects.get()
    .then(result => {
        if (result.length == 0) {
            res.json([]);
        } else {
            res.json(result)
        }
    })
    .catch(result => {
        res.status(500).json({ message: "Error retrieving projects" })
    })
})

// router.get('/:id', (req, res) => {
//     const id = req.params.id
//     Projects.get(id)
//     .then(result => {
//         if (!result) {
//             res.status(404).json({ message: "No ID action found" })
//         } else {
//             res.json(result) 
//         }
//     })
// })

// router.get('/:id', projectsIdChecker, (req, res) => {
//     console.log(req.params);
//     req.body = req.params;
//     res.json(req.body);
// })

router.get('/:id', projectsIdChecker, (req, res) => {
    res.json(req.params);
})


router.post('/', projectsValidater, (req, res) => {
    console.log(req.body);
    Projects.insert(req.body)
    .then(result => {
        res.json(result)
    })
    .catch(result => {
        res.status(500).json({ message: "Error creating new project" })
    })
})

router.put('/:id', projectsIdChecker, projectsValidater, (req, res) => {
    const completed = req.body.completed;
    if (completed == null) {
        res.status(400).json({ message: "Missing name and/or description field"})
    } else {
        const projectsUpdate = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        }
        Projects.update(req.params.id, projectsUpdate)
        .then(result => {
            res.json(result)
        })
        .catch(result => {
            res.status(500).json({ message: "Error updating project" })
        })
    }
})

module.exports = router;