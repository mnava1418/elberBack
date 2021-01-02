const locationService = require('../locationService')

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
    location.city = city.toUpperCase()
    location.country = country.toUpperCase()
    location = await locationService.translateLocation(location, 'es', 'en')

    return location
}

const getAny = (parameters) => {
    return getCustomParameter(parameters, 'any')
}

const getCustomParameter = (parameters, type) => {
    let item = parameters[type]
    item = item[item.kind]
    return item.trim()
}

module.exports = {
    getLocation,
    getAny,
    getCustomParameter
}