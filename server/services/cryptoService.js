const networkService = require('./networkService')
const HOST = 'api.coinbase.com'

const getPrice = async (from, to, type) => {
    const path = `/v2/prices/${from}-${to}/${type}`
    const result = await networkService.restCall(HOST,path, 'GET', {}, undefined)
    .then(response => {
        if(response.data) {
            let data = {}
            if(type.includes('date')) {
                const date = type.split('date=')[1]
                data[date] = response.data.amount
            } else {
                data[type] = response.data.amount
            }

            return data
        }
        return {}
    })
    .catch(err => {
        console.log(err)
        return {}
    })

    return result
}

const getCurrencyInfo = async (from, to) => {
    let calls = [getPrice(from, to, 'spot'), getPrice(from, to, 'buy'), getPrice(from, to, 'sell')]
    const priceTypes = ['spot', 'buy', 'sell']
    let date = new Date()

    for(let i = 0; i < 30; i++) {
        if(i > 0) {
            date.setDate(date.getDate() - 1);
        }

        let finalDate = date.toISOString().split('T')[0]
        calls.push(getPrice(from, to, `spot?date=${finalDate}`))
    }

    const result = await Promise.all(calls)
    let info = {}
    let history = {}
    
    for(let entry of result) {
        for(let priceType in entry) {
            if(priceTypes.indexOf(priceType) >= 0) {
                info[priceType] = entry[priceType]
            } else {
                history[priceType] = entry[priceType]
            }
        }
    }

    info.history = history
    info.crypto = from
    return info
}

module.exports = {
    getCurrencyInfo
}
