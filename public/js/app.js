console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchUrl = 'http://localhost:3000/weather?address=' + search.value

  messageOne.textContent = 'loading message... '
  // This is client side javascript accessing the url/api - it does NOT refresh the page!
  fetch(searchUrl).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        // console.log(data.error)
      } else {
        messageOne.textContent = data.foundWeatherSentence
        // console.log(data.foundLocation)
        // console.log(data.foundWeatherSentence)
      }
    })
  })
})
