const request = require('postman-request')
// Goal: Add new data to forecast

//update the forcaste to include new data
//commit changes
//push to github and deploy to Heroku
//test


const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=ad0f199ec35a73811eb89e0062bdb50d&query='+encodeURIComponent(latitude)+','+longitude;
    request({url, json: true, },(error, {body})=>{
        error? (callback('Unable to connect to weather service', undefined))
        : (body.error)? (callback(body.error.type + ". "+ body.error.info, undefined)) 
        : callback(undefined, body.current.weather_descriptions +". It is currently "+body.current.temperature+" degrees celcius out. It feels like "+body.current.feelslike+" degrees out. "+ "There is currently a precipitation of: "+ body.current.precip+"%")
    })

    
}

module.exports = forecast;