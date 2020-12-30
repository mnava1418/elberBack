const momentTZ = require('moment-timezone')
const moment = require('moment')

const utilityServices = require('./utilityService')
const locationService = require('./locationService')

const getTime = async(location, format) => {
    let city = location.city
    let country = location.country
    
    if(city == "" && country != ""){
        city = locationService.getCapital(country)
    } 

    const tzInfo = await locationService.getTZInfo(country, city)
    let currentTime = 'Tu pinche pueblo no existe'
   
    if( tzInfo != undefined) {
        const time = getTimebyTZ(tzInfo.timezone, format)
        location.city = tzInfo.city
        location.country = tzInfo.country
        location = await locationService.translateLocation(location, 'en', 'es')
        city = utilityServices.toCamelCase(location.city)
        country = utilityServices.toCamelCase(location.country)
        currentTime = `En ${city}, ${country},`

        if(format == 'LT') {
            currentTime = `${currentTime} son las ${time}`
        } else {
            currentTime = `${currentTime} es ${time}`
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