const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// Construct an express app
const app = express()
const port = process.env.PORT || 3000 // Environment Variable used by Heroku, otherwise 3000 (locally)

// Define paths for Express configs
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // integrates the handlebar (hbs) package installed via npm
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve from
app.use(express.static(publicPath))

// console.log(__dirname) // '__dirname' is a protected static variable in node
// console.log(publicPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'CJ Montano'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'CJ Montano',
    description: 'This page helps you!'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'CJ Montano',
    description: 'a robot'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must supply location'
    })
  }

  geocode(req.query.address, (error, { foundLocation, foundLatitude, foundLongitude } = {}) => {
    if (error) {
      // console.log(error)
      res.send({
        error: error
      })
    } else {
      // Next line leverages ES6 Object Destructuring - MUST USE THE SAME VARIABLE NAME as in the function definition unless renamed 'name: newName'
      // Also, '= {}' is a default constructor that safeguards us in case we try to desctructure something undefined (i.e. not an object)
      // forecast(foundLongitude, foundLatitude, (error, { foundTemperature: temp, foundDescription: desc, foundFeelslike: feels, foundWeatherSentence } = {}) => {
      forecast(foundLongitude, foundLatitude, (error, forecastData) => {
        if (error) {
          // console.log(error)
          res.send({
            error: error
          })
        } else {
          // construct the 'weather sentence' here because you have access to 'foundLocation' here (but not inside forecast())
          const tmpStr = 'It is currently ' + forecastData.temperature + ' degrees Fahrenheit in ' + foundLocation + ' and ' + forecastData.weather_descriptions[0] + '; it feels like ' + forecastData.feelslike
          res.send({
            queryLocation: req.query.address,
            foundLocation,
            foundWeatherSentence: tmpStr
          })

          // Below, the weather sentence is sent in the deconstructed callback object (per commented forecast line above)
          // You must also change code to send that object from forecast (also commented out there)
          /* res.send({
            queryLocation: req.query.address,
            foundLocation,
            foundWeatherSentence,
            foundTemperature: temp,
            foundFeelsLike: feels
          }) */
        }
      })
    }
  })
})

app.get('/products', (req, res) => {
  // next line search for (non) existence of a search term in url query string
  if (!req.query.search) {
    return res.send({ // Must add return statement, otherwise res.send is called twice (2 responses for 1 request), resulting in error
      error: 'you must provide a search term'
    })
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404 (error)',
    name: 'CJ Montano',
    errorMsg: 'Help article not found'
  })
})

// Error match must be the last registered 'get', since it matches everything
app.get('*', (req, res) => {
  res.render('error', {
    title: '404 (error)',
    name: 'CJ Montano',
    errorMsg: '404 Error (not found)'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
