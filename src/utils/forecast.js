const request = require('postman-request')
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=ad0f199ec35a73811eb89e0062bdb50d&query='+encodeURIComponent(latitude)+','+longitude;
    request({url, json: true, },(error, {body})=>{
        error? (callback('Unable to connect to weather service', undefined))
        : (body.error)? (callback(body.error.type + ". "+ body.error.info, undefined)) 
        : callback(undefined, body.current.weather_descriptions +". It is currently "+body.current.temperature+" degrees celcius out. It feels like "+body.current.feelslike+" degrees out")
    })

    
}

module.exports = forecast;