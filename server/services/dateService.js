const citiesTZ = require('city-timezones')
const moment = require('moment-timezone')
const countries = require('countries-list').countries
const utilityServices = require('./utilityService')

const getTime = async(location) => {
    let originalCity = location.city
    let originalCountry = location.country
    let country = await translateLocation(originalCountry, 'es', 'en')
    let city = originalCity

    city = city.toUpperCase()
    country = country.toUpperCase()
    
    if(city == "" && country != ""){
        city = getCapital(country)
        city = await translateLocation(city, 'es', 'en')
    } else {
        city = await translateLocation(city, 'es', 'en')
    }

    const tzInfo = await getTZInfo(country, city)
    let currentTime = 'Tu pinche pueblo no existe'
   
    if( tzInfo != undefined) {
        const time = getTimebyTZ(tzInfo.timezone, 'LT')

        if(originalCountry == ""){
            originalCountry = await translateLocation(tzInfo.country, 'en', 'es')
        }

        if(originalCity == ""){
            originalCity = await translateLocation(tzInfo.city, 'en', 'es')
        }

        currentTime = `En ${originalCity}, ${originalCountry}, son las ${time}`
    } 

    return currentTime
}

const translateLocation = async(location, from, to) => {
    if(location.length > 0) {
        location = await utilityServices.translateText(location, from, to)
    }

    return location
}

const getTZInfo = async (country, city) => {
    let tzInfo = citiesTZ.findFromCityStateProvince(city)

    if(tzInfo.length > 1 ) {
        tzInfo = filterByKey(tzInfo, 'city', city)
    }

    if(country.length > 0) {
        tzInfo = filterByKey(tzInfo, 'country', country)
    }

    if(tzInfo.length == 0) {
        return undefined
    } else if(tzInfo.length == 1) {
        return tzInfo[0]
    } else {
        return getMaxPop(tzInfo)
    }
}

const filterByKey = (tzInfo, key, element) => {
    let finalList = []
    
    for(i = 0; i < tzInfo.length; i++) {
        let current = tzInfo[i]
        let value = current[key].trim().toUpperCase()

        if(value.includes(element)) {
            finalList.push(current)
        }
    }

    return finalList
}

const getMaxPop = (tzInfo) => {
    let maxPop = tzInfo[0]

    for(i = 0; i < tzInfo.length; i++){
        let current = tzInfo[i]
        if(current.pop > maxPop.pop){
            maxPop = current
        }
    }

    return maxPop
}

const getCapital = (country) => {
    let countriesArr = Object.entries(countries)

    for(i = 0; i < countriesArr.length; i++){
        let current = countriesArr[i][1]
        if(current.name.trim().toUpperCase().includes(country)) {
            return current.capital.trim().toUpperCase()
        }
    }

    return ''
}

const getTimebyTZ = (timeZone, format) => {
    const time = moment().tz(timeZone).format(format)
    return time
} 

module.exports = {
    getTime
}