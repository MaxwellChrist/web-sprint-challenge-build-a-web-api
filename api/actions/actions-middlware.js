// add middlewares here related to actions
const Actions = require('./actions-model');

function actionsLogger (req, res, next) {
    console.log(`\nThe method used was ${req.method}\nThe request was to ${req.originalUrl}`);
    next();
}

function actionsUserId(req, res, next) {
    id = req.params.id
    Actions.get(id)
    .then(result => {
      if (id) {
        req.project = result;
        next();
      } else {
        res.status(404).json({ message: "Action ID not found" })
        return;
      }
    })
  }

module.exports = {
    actionsLogger, actionsUserId
}