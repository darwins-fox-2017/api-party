'use strict'
const express = require('express')
const router = express.Router()
const controllers = require('../controllers/api-party')

router.get('/index', function (req, res) {
  res.render('index')
})

router.get('/:song', controllers.apiSpotifyYoutube)
module.exports = router
