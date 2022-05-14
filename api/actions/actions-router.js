
// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { actionsLogger, actionsIdChecker, actionsValidater } = require('./actions-middlware');

const router = express.Router();
router.use(actionsLogger)

router.get('/', (req, res) => {
    Actions.get()
    .then(result => {
        res.json(result)
    })
    .catch(result => {
        res.status(500).json({ message: "Error completing request to get actions"})
    })
})

router.get('/:id', actionsIdChecker, (req, res) => {
    res.json(req.params)
})

router.post('/', actionsValidater, (req, res) => {
    Actions.insert(req.body)
    .then(result => {
        res.json(result)
    })
    .catch(result => {
        res.status(500).json({ message: "Error completing request to post actions"})
    })
})

router.put('/:id', actionsIdChecker, actionsValidater, (req, res) => {
    const completed = req.body.completed;
    if (completed == null || typeof completed != "boolean") {
        res.status(400).json({ message: "Missing completed field"})
    } else {
        Actions.update(req.params.id, req.body)
        .then(result => {
            res.json(result)
        })   
        .catch(result => {
            res.status(500).json({ message: ""})
        }) 
    }
})

router.delete('/:id', actionsIdChecker, (req, res) => {
    Actions.remove(req.params.id)
    .then(result => {
        res.json(result)
    })
    .catch(result =>{
        res.status(500).json({ message: "Cannot complete delete request; no ID found"})
    })
})

module.exports = router;