// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { actionsLogger, actionsUserId } = require('./actions-middlware');

const router = express.Router();
router.use(actionsLogger)

router.get('/', (req, res) => {
    console.log(`the request is : ${req.body}`)
    Actions.get()
    .then(result => {
        res.json(result)
    })

})


router.get('/:id', actionsUserId, (req, res) => {
    res.json(res.body)
})


module.exports = router;