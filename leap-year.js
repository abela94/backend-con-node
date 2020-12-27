const { response } = require('express')
const express = require('express')
const app = express()
const { config } =  require('./config/index')

const divider = (num, divisor) => {
    return num % divisor === 0 ? true : false
}

const leapYear = (year) => {
    return ((divider(year, 4) && !divider(year, 100)) || divider(year, 400))
}

app.get('/', (req,res) => {
    res.send('Place a year after the url to check if it is a leap year')
})

app.get('/:year', (req, res) => {
    const { year } = req.params
    if (leapYear(year)) {
        res.send(`The year ${year} is a leap year`)
    }
    res.send(`The year ${year} is not a leap year`)
})

app.listen(config.port, () => {
    console.log(`Listening address http://localhost:${config.port}`)
})