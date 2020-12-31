const momentTZ = require('moment-timezone')
const moment = require('moment')

const utilityServices = require('./utilityService')
const locationService = require('./locationService')

const getTime = async(location, format) => {
    let currentTime = 'Tu pinche pueblo no existe'
    let cities = location.cities
    let country = location.country

    for(city of cities) {
        if(city == "" && country != ""){
            city = locationService.getCapital(country)
        } 

        const tzInfo = await locationService.getTZInfo(country, city)
        
        if( tzInfo != undefined) {
            const time = getTimebyTZ(tzInfo.timezone, format)
            location.city = tzInfo.city
            location.country = tzInfo.country
            location = await locationService.translateLocation(location, 'en', 'es')
            city = utilityServices.toCamelCase(location.cities[0])
            country = utilityServices.toCamelCase(location.country)
            currentTime = `En ${city}, ${country},`

            if(format == 'LT') {
                currentTime = `${currentTime} son las ${time}`
            } else {
                currentTime = `${currentTime} es ${time}`
            }

            break;
        } 
    }
    
    return currentTime
}

const getTimebyTZ = (timeZone, format) => {
    var time = momentTZ().tz(timeZone)
    moment.locale('es');
    time.locale(false);
    
    return time.format(format)
} 

module.exports = {
    getTime,
}