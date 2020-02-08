const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup static dir to serve
app.use(express.static(publicDirectoryPath))

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ryan Tucker'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ryan Tucker'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send( {
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send( {
                    error
                })
            }
            res.send( {
                forecast:forecastData,
                location,
                address: req.query.address})
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send( {
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me!',
        name: 'Ryan Tucker'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404: Page Not Found',
        extra: 'Help article does not exist'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404: Page Not Found',
        extra: 'Get Out Of Here!!!'
    })
})

app.listen(port, () => {
    console.log('Server started!')
})