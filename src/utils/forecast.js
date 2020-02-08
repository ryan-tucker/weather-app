const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/13a18be37c03208b1b5344dda1e759f7/' + latitude +',' + longitude

    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.' , undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees outside. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast