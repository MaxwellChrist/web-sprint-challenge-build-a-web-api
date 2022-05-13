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


// router.get('/:id', actionsUserId, (req, res) => {
//     res.json(res.body)
// })

router.get('/:id', (req, res) => {
    const id = req.params.id
    Actions.get(id)
    .then(result => {
        if (!result) {
            res.status(404).json({ message: "No ID action found" })
        } else {
            res.json(result) 
        }
    })
})



module.exports = router;