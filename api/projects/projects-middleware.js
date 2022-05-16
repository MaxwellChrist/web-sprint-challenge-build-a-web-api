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
            res.status(404).json({ message: "No project ID found" })
        } else {
            req.params= result;
            next();
        }
    })
    .catch(result =>{
        res.status(500).json({ message: "Cannot complete request; no ID found"})
    })
}

function projectsValidater (req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const completed = req.body.completed;
    if (
    typeof name != "string" || name.trim() === "" || 
    typeof description != "string" || description.trim() === "" ||
    completed == null || typeof completed != "boolean")
    {
        res.status(400).json({ message: "Error with name, description, or completed field(s)" })
    } else {
        next();
    }
}

module.exports = {
    projectsLogger, projectsIdChecker, projectsValidater
}