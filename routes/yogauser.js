const express = require('express')

const {
    createYogaUser,
    getUsers,
    getUser
} = require('../controllers/yogauserControllers')

const router = express.Router()

router.get('/', getUsers)


router.get('/:id', getUser)


router.post('/',createYogaUser)


module.exports = router