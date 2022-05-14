
// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { actionsLogger, actionsIdChecker, actionsValidater } = require('./actions-middlware');

const router = express.Router();
router.use(actionsLogger)

router.get('/', (req, res) => {
    console.log(`the request is : ${req.body}`)
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

//npm i, reset database => use these commands on knex migrate:latest && knex seed:run

module.exports = router;