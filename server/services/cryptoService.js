const networkService = require('./networkService')
const HOST = 'api.coinbase.com'

const getPrice = async (from, to, type) => {
    const path = `/v2/prices/${from}-${to}/${type}`
    const result = await networkService.restCall(HOST,path, 'GET', {}, undefined)
    .then(response => {
        if(response.data) {
            return response.data.amount
        }
        
        return 'N/A'
    })
    .catch(err => {
        console.log(err)
        return 'N/A'
    })

    return result
}

const getCurrencyInfo = async (from, to) => {
    const spotPrice = await getPrice(from, to, 'spot')
    const buyPrice = await getPrice(from, to, 'buy')
    const sellPrice = await getPrice(from, to, 'sell')

    console.log(`Spot Price: ${spotPrice}`)
    console.log(`Buy Price: ${buyPrice}`)
    console.log(`Sell Price: ${sellPrice}`)
}

module.exports = {
    getCurrencyInfo
}