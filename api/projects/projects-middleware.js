// add middlewares here related to projects
const Projects = require('./projects-model');

function projectsLogger (req, res, next) {
    console.log(`\nThe method used was ${req.method}\nThe request was to ${req.originalUrl}`);
    next();
}

function projectsIdChecker (req, res, next) {
    const id = req.params.id
    Projects.get(id)
    .then(result => {
        if (!result) {
            res.status(404).json({ message: "No ID action found" })
        } else {
            res.json(result) 
        }
    })
    .catch(result => {
        res.status(500).json({ message: "Error retrieving ID of project" })
    })
}

function projectsValidater (req, res, next) {
    console.log(req.body)
    const name = req.body.name;
    const description = req.body.description;
    if (typeof name != "string" || name == "" || typeof description != "string" || description == "") {
        res.status(400).json({ message: "Missing name and/or description field"})
    } else {
        next();
    }
}

module.exports = {
    projectsLogger, projectsIdChecker, projectsValidater
}