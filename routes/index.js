'use strict'
const express = require('express')
const router = express.Router()
const controllers = require('../controllers/api-party')

router.get('/:song', controllers.apiSpotifyYoutube)

module.exports = router
