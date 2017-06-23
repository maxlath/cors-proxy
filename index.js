#!/usr/bin/env node

const app = require('express')()
const request = require('request')
const port = 2677
const { green, grey } = require('chalk')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.all('*', (req, res) => {
  var { url, method, body, headers } = req

  url = url.slice(1)


  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
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
