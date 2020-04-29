const dateService = require('../dateService')

const getLocation = async(parameters) => {
    let city = ""
    let country = ""
    const locationEntry = parameters.location
    const fields = locationEntry[locationEntry.kind].fields

    if (fields != undefined) {
        city = fields.city[fields.city.kind].trim() + fields.island[fields.island.kind].trim()
        country = fields.country[fields.country.kind].trim()
    } else {
        country = "Mexico"
    }

    let location = {}
    location.city = city
    location.country = country
    location = await dateService.translateLocation(location, 'es', 'en')

    return location
}

module.exports = {
    getLocation
}