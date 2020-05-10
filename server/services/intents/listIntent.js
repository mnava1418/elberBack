const listService = require('../listService')

const getLists = async(email, response) => {
    const result = await listService.getLists(email)
    const currentLists = result.json.lists

    if(currentLists.length > 0 ) {
        for(let i = 0; i < currentLists.length; i++){
            response = `${response} ${currentLists[i].name},`
        }
        response = response.substr(0, response.length - 1)
    } else {
        response = 'Aún no tienes listas pero puedo ayudarte a crear una.'
    }

    return response
}

module.exports = {
    getLists
}