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
    location.city = city
    location.country = country
    location = await locationService.translateLocation(location, 'es', 'en')

    return location
}

const getListName = (parameters) => {
    const listType = parameters.listType
    const listName = listType[listType.kind]
    return listName.trim()
}

const getListItem = (parameters) => {
    let listItem = parameters.any
    listItem = listItem[listItem.kind]
    return listItem = listItem.trim()
}

const getAny = (parameters) => {
    let anyItem = parameters.any
    anyItem = anyItem[anyItem.kind]
    return anyItem.trim()
}

const getSpotifyArtist = (parameters) => {
    let artistItem = parameters['music-artist']
    artistItem = artistItem[artistItem.kind]
    return artistItem.trim()
}

module.exports = {
    getLocation,
    getListName,
    getListItem,
    getAny,
    getSpotifyArtist
}