const citiesTZ = require('city-timezones')
const momentTZ = require('moment-timezone')
const moment = require('moment')
const countries = require('countries-list').countries
const utilityServices = require('./utilityService')

const getTime = async(location, format) => {
    let city = location.city
    let country = location.country
    
    if(city == "" && country != ""){
        city = getCapital(country)
    } 

    const tzInfo = await getTZInfo(country, city)
    let currentTime = 'Tu pinche pueblo no existe'
   
    if( tzInfo != undefined) {
        const time = getTimebyTZ(tzInfo.timezone, format)
        location.city = tzInfo.city
        location.country = tzInfo.country
        location = await translateLocation(location, 'en', 'es')
        city = utilityServices.toCamelCase(location.city)
        country = utilityServices.toCamelCase(location.country)
        currentTime = `En ${city}, ${country}, son las ${time}`
    } 
    
    return currentTime
}

const getLocationElement = (element) => {
    element = element.trim().toUpperCase()
    if(element == '' ) {
        return 'XX'
    } else if(element == 'XX') {
        return ''
    } else {
        return element
    }
}

const translateLocation = async(location, from, to) => {
    let city = getLocationElement(location.city)
    let country = getLocationElement(location.country)
    location = `${city},${country}`
    location = await utilityServices.translateText(location, from, to)
    const locationArr = location.split(',')
    let result = {}
    result.city = getLocationElement(locationArr[0])
    result.country = getLocationElement(locationArr[1])
    
    return result
}

const getTZInfo = async (country, city) => {
    city = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    country = country.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

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
    country = country.normalize("NFD").replace(/[\u0300-\u036f]/g, "");  
    let countriesArr = Object.entries(countries)

    for(i = 0; i < countriesArr.length; i++){
        let current = countriesArr[i][1]
        let name = current.name.trim().toUpperCase()
        let capital = current.capital.trim().toUpperCase()

        if(name.includes(country)) {
            return capital
        }
    }

    return ''
}

const getTimebyTZ = (timeZone, format) => {
    var time = momentTZ().tz(timeZone)
    moment.locale('es');
    time.locale(false);
    
    return time.format(format)
} 

module.exports = {
    getTime,
    translateLocation
}