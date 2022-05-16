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
}

function actionsValidater(req, res, next) {
  const project_id = req.body.project_id;
  const description = req.body.description;
  const notes = req.body.notes;
  const completed = req.body.completed;
  if (
  typeof description != "string" || description.trim() === "" || 
  typeof notes != "string" || notes.trim() === "" || 
  typeof project_id != "number" || !project_id ||
  completed == null || typeof completed != "boolean"
  ) {
    res.status(400).json({ message: "Error with description, note field, project ID or completed field(s)" })
  } else {
      next()
  }
}

module.exports = {
    actionsLogger, actionsIdChecker, actionsValidater
}