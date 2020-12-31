const countries = require('countries-list').countries
const citiesTZ = require('city-timezones')
const utilityServices = require('./utilityService')

const translateLocation = async(location, from, to) => {
    let cities = await utilityServices.translateText(location.city, from, to)
    cities.push(location.city)

    let country = await utilityServices.translateText(location.country, from, to)
    country = country[0]
    
    let result = {cities, country}
    return result
}

const getCapital = (country) => {
    country = country.normalize("NFD").replace(/[\u0300-\u036f]/g, "");  
    let countriesArr = Object.entries(countries)

    for(let i = 0; i < countriesArr.length; i++){
        let current = countriesArr[i][1]
        let name = current.name.trim().toUpperCase()
        let capital = current.capital.trim().toUpperCase()

        if(name.includes(country)) {
            return capital
        }
    }

    return ''
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
    
    for(let i = 0; i < tzInfo.length; i++) {
        let current = tzInfo[i]
        let value = current[key].trim().toUpperCase()

        if(value.includes(element.toUpperCase())) {
            finalList.push(current)
        }
    }

    return finalList
}

const getMaxPop = (tzInfo) => {
    let maxPop = tzInfo[0]

    for(let i = 0; i < tzInfo.length; i++){
        let current = tzInfo[i]
        if(current.pop > maxPop.pop){
            maxPop = current
        }
    }

    return maxPop
}

module.exports = {
    translateLocation,
    getCapital,
    getTZInfo
}
