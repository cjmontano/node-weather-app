// import fetch from 'node-fetch' // necessary because 'fetch' call below does not come out of the box with node

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // const searchUrl = 'http://localhost:3000/weather?address=' + search.value

  messageTwo.textContent = ''
  messageOne.textContent = 'loading message... '
  // This is client side javascript accessing the url/api - it does NOT refresh the page!
  // fetch(searchUrl).then((response) => {
  fetch('/weather?address=' + search.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        // console.log(data.error)
      } else {
        messageOne.textContent = data.foundLocation
        messageTwo.textContent = data.foundWeatherSentence
        // console.log(data.foundLocation)
        // console.log(data.foundWeatherSentence)
      }
    })
  })
})
