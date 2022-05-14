// add middlewares here related to actions
const Actions = require('./actions-model');

function actionsLogger (req, res, next) {
    console.log(`\nThe method used was ${req.method}\nThe request was to ${req.originalUrl}`);
    next();
}

function actionsIdChecker (req, res, next) {
  const id = req.params.id
  Actions.get(id)
  .then(result => {
      if (!result) {
          res.status(404).json({ message: "No project ID found" })
      } else {
          req.params= result;
          next();
      }
  })
  .catch(result => {
      res.status(500).json({ message: "Error retrieving ID of project" })
  })
}

function actionsValidater(req, res, next) {
  const project_id = req.body.project_id;
  const description = req.body.description;
  const notes = req.body.notes;
  if (
    typeof description != "string" || description.trim() === "" || 
    typeof notes != "string" || notes.trim() === "" || 
    typeof project_id != "number" || !project_id
    ) {
    res.status(400).json({ message: "Missing description and/or note field and/or invalid project ID"})
    } else {
      next()
    }
}

module.exports = {
    actionsLogger, actionsIdChecker, actionsValidater
}