const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message_1')
const message_2 = document.querySelector('#message_2')
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    message_1.textContent = 'Loading ...'
    message_2.textContent = ''
    fetch('http://localhost:3000/weather?address='+address).then((response) => {
    
    response.json().then((data) => {
        if(data.error){
           return message_1.textContent = data.error
            
        }

        message_1.textContent = data.location
        message_2.textContent = data.weather
       
      
    })
})
})
