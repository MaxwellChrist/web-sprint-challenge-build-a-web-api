const express = require('express');
const Projects = require('./projects-model');
const { projectsLogger, projectsIdChecker, projectsValidater } = require('./projects-middleware');

const router = express.Router();
router.use(projectsLogger)

router.get('/', (req, res) => {
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

router.get('/:id', projectsIdChecker, (req, res) => {
    res.json(req.params);
})

router.post('/', projectsValidater, (req, res) => {
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

router.delete('/:id', projectsIdChecker, (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
    .then(result =>{
        res.json(result)
    })
    .catch(result =>{
        res.status(500).json({ message: "Cannot complete delete request; no ID found"})
    })
})

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    Projects.getProjectActions(id)
    .then(result => {
        res.json(result)
    })
    .catch(result => {
        res.status(500).json({ message: "Cannot complete get request; no project action found"})
    })
})

module.exports = router;