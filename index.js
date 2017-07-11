#!/usr/bin/env node

const app = require('express')()
const request = require('request')
const port = 2677
const { green, grey } = require('chalk')

const alwaysJson = (req, res, next) => {
  req.headers['content-type'] = 'application/json'
  next()
}

// Consider that everyhing is JSON
app.use(alwaysJson)

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.all('*', (req, res) => {
  var { url, method, body, headers } = req

  if (typeof body === 'string' && body[0] === '{') {
    body = JSON.parse(body)
  }

  url = url.slice(1)


  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', '*')

  const options = { url, method }
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    if (body) options.body = JSON.stringify(body)
  } else {
    body = null
  }

  console.log(grey(new Date().toISOString()), method, url, body || '')

  request(options, function (err, resp, body2) {
    if (err) {
      res.send(err)
    } else {
      res.send(body2)
    }
  })
})

app.listen(port, () => console.log(green(`Started on port ${port}`)))
