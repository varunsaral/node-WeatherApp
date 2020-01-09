const request = require('request')

const forcast = (latitude,longitude,callback) => {

const url = 'https://api.darksky.net/forecast/024cda13345335a7320c1f2a5220bf95/'+latitude +','+longitude+'?lang=en&units=si'

request({url,json : true},(error,{body}) => {
    if(error){
        callback('Unable to conncet ot internet',undefined)
    }
    else if(body.error){
        callback('wrong input',undefined)
    }
    else{
callback(undefined,body.currently.summary)
    }
})
}

module.exports = forcast