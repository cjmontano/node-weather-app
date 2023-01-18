const request = require('request')

const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const accessKey = 'access_token=pk.eyJ1IjoiY21vbnRhbm84IiwiYSI6ImNrN25ndDhlbjBlNTcza3E4YWtqb3htNTEifQ.SDSizsA55OCmEgoSIap9Ww'

const geocode = (location, callbackFx) => {
  const url = baseUrl + encodeURIComponent(location) + '.json?' + accessKey
  // Next line levages ES6 Object Property Shorthand 'url' instead of 'url: url' because it has the same name
  request({ url, json: true }, (error, response) => {
    // console.log('url:', url)
    if (error) {
      // console.error('geocode() error:', error) // Print the error if one occurred
      callbackFx(error, undefined)
    } else if (response.body.features.length === 0) {
      // console.error('geocode() error: location not found')
      callbackFx('Location not found, try another search', undefined)
    } else {
      const currData = response.body.features[0]
      /*
      console.log('Location:', response.body.features[0].place_name) // Print the response status code if a response was received
      console.log('Latitude:', response.body.features[0].center[0]) // Print the response status code if a response was received
      console.log('Longitude:', response.body.features[0].center[1]) // Print the response status code if a response was received
      */
      // Next line leverages ES6 Object Destructuring - MUST BE THE SAME VARIABLE NAME as in the callback function definition as the place it gets called back
      callbackFx(undefined, {
        foundLocation: currData.place_name,
        foundLatitude: currData.center[0],
        foundLongitude: currData.center[1]
      })
    }
  })
}

module.exports = geocode
