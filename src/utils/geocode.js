const request = require('postman-request')

const geocode = (address, callback)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+ ".json?access_token=pk.eyJ1IjoiYWxla2J1cmJ1IiwiYSI6ImNrajFuZjNyNDFzY3MycG15bmU1ZXd1dXUifQ.25mpxz82xTuaYPhns3xchQ&limit=1"

    request({url, json: true}, (error, {body})=>{
        error? (callback('unable to connect to location services.', undefined))
        : (body.features.length === 0)? (callback('Unable to find location. Try another search', undefined)) 
        : callback(undefined, {
            latitude:  body.features[0].center[1],
            longitude: body.features[0].center[0],
            location:  body.features[0].place_name

        })
    })

}


module.exports = geocode