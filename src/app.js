const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//Define paths for expres config :)
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');



//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))


app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Alec Barba'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Alec Barba'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        help: "This is a help message",
        toStringtitle: 'Weather App',
        name: 'Alec Barba'
    })
})

app.get('/weather', (req,res)=>{
    const address= req.query.address
    let errMsg = 'You must provide an address'
    if(!address){
        return res.send({ error: errMsg})
    }
    geocode(address, (error, {latitude, longitude, location}={})=>{ //default to empty object
        if(address){
             if (error) {
                 return res.send({ error})
             }
             forecast(latitude, longitude, (error, forecastData) => {
                 if (error) {
                     return res.send({error})
                 }
                 res.send({ location, forecast:forecastData, address})
             })
        }
     })  
})

app.get('/help/*',(req,res)=>{
    res.render('404',{ 
        title: '404 Help',
        error: 'Help article not found',
        name: 'Alec Barba'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        error: 'Page not found',
        name: 'Alec Barba'
    })
})



app.listen(3000, ()=>{
    console.log('Runing on port 3000')
})