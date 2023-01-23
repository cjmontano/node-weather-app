const request = require('request')

const baseUrl = 'http://api.weatherstack.com/current?access_key=d86e4eef6d75528024bde4e42230c998&units=f&query='

const forecast = (lat, lon, callbackFx) => {
  const url = baseUrl + lat + ',' + lon
  request({ url: url, json: true }, (error, response) => {
    // console.log('url:', url)
    if (error) {
      // console.error('location_temp() error:', error) // Print the error if one occurred
      callbackFx('location_temp() error: ' + error, undefined)
    } else if (response.body.error) {
      // console.error('location_temp() error: location not found', response.body.error)
      callbackFx('location_temp() error: location not found', undefined)
    } else {
      // callbackFx(undefined, response.body.current)

      // Use the next block of code if you want to assemble a weather sentence insie of forecast
      const currentData = response.body.current
      const retStr = 'Right now (' + currentData.observation_time + ' UTC), it is ' + currentData.temperature + ' degrees Fahrenheit in ' + 'and ' + currentData.weather_descriptions[0] + '; it feels like ' + currentData.feelslike
      console.log(retStr)
      callbackFx(undefined, {
        foundTemperature: currentData.temperature,
        foundDescription: currentData.weather_descriptions[0],
        foundFeelslike: currentData.feelslike,
        foundWeatherSentence: retStr
      })
    }
  })
}

module.exports = forecast
