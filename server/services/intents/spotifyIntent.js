const querystring = require('querystring')
const appAuth = require('../../config/appAuth')
const networkService = require('../networkService')
const processParameters = require('./processParameters')

const requestToken = async () => {

    const clientID = appAuth.spotify.clientId
    const clientSecret = appAuth.spotify.clientSecret
    const auth = `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`
    const host = 'accounts.spotify.com'
    const path = '/api/token'
    const method = 'POST'
    const body = querystring.stringify({'grant_type': 'client_credentials'})
    const headers = {
        'Authorization': auth,
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const result = await networkService.restCall(host, path, method, headers, body)
    return result   
}

const getSpotifyQuery = (track, artist) => {
    let query = ''

    if(track == '') {
        query = `This is ${artist}`
        query = querystring.stringify({'q': query})
        query += '&type=playlist'
    } else {
        query = `track:${track} artist:${artist}`
        query = querystring.stringify({'q': query})
        query += '&type=track'
    }
    
    query += '&limit=1&market=MX'
    return query
}

const searchItem = async (token, token_type, track, artist) => {
    const auth = `${token_type} ${token}`
    const host = 'api.spotify.com'
    const query = getSpotifyQuery(track, artist)
    const path = `/v1/search?${query}`
    const method = 'GET'
    const headers = {
        'Authorization': auth,
        'Accept':'application/json',
        'Content-Type': 'application/json'
    }

    const result = await networkService.restCall(host, path, method, headers, undefined)
    return result
}

const parseSpotifyTrack = (item) => {
    let result = {exists: false, artist: '', track: '', uri: '', response: ''}

    if(item.tracks.items.length != 0) {
        let track = item.tracks.items[0]
        result.artist = track.artists[0].name
        result.track = track.name
        result.exists = true
        result.uri = track.uri
        result.response = `${result.track} de ${result.artist}` 
    }

    return result
}

const parseSpotifyArtist = (item) => {
    let result = {exists: false, artist: '', track: '', uri: '', response: ''}

    if(item.playlists.items.length != 0) {
        let playlist = item.playlists.items[0]
        result.artist = playlist.name
        result.exists = true
        result.uri = playlist.uri
        result.response = `${result.artist}` 
    }

    return result
}

const parseSpotifyResponse = (response, track, artist, item, localFunctions) => {
    let elberResponse = ''
    let trackResult = {exists: false, artist: '', track: '', uri: '', response: ''}

    if(track == "") {
        trackResult = parseSpotifyArtist(item)
        elberResponse = `No encontré musica de ${artist} Spotify`
    } else {
        trackResult = parseSpotifyTrack(item)
        elberResponse = `No encontré ${track} de ${artist} en Spotify`
    }

    if(trackResult.exists) {
        response.localFunction = localFunctions.setSong
        response.parameters = {uri: trackResult.uri}
        elberResponse = `${response.elberResponse} ${trackResult.response}`
    }

    response.elberResponse = elberResponse
    return response
}

const search = async (localFunctions, response, track, artist) => {
    if(track == "" && artist == "") {
        response.elberResponse = ""
        response.localFunction = localFunctions.playMusic
    } else {
        await requestToken().then(async (res) => {
            if(res.access_token) {
                await searchItem(res.access_token, res.token_type, track, artist).then((item) => {
                    if(item.error != undefined) {
                        response.elberResponse = "No encontré lo que me pediste en Spotify"
                    } else {
                        response = parseSpotifyResponse(response, track, artist, item, localFunctions)
                    }
                }).catch((err) => {
                    console.log(err)
                    response.elberResponse = "No encontré lo que me pediste en Spotify"
                })
            } else {
                response.elberResponse = "No me pude conectar a Spotify"
            }
        }).catch((err) => {
            console.log(err)
            response.elberResponse = "No me pude conectar a Spotify"
        })
    }
    
    return response
    //let response = {elberResponse: fulfillmentText, nextAction: "", localFunction: "", parameters:{}, confirmNextAction: false}
}

const processIntent = async (intentsConfig, intent, response, parameters) => {
    switch (intent) {
        case intentsConfig.spotify.play :
            response.localFunction = intentsConfig.localFunctions.playMusic
            break;
        case intentsConfig.spotify.pause :
            response.localFunction = intentsConfig.localFunctions.pauseMusic
            break;
        case intentsConfig.spotify.next :
            response.localFunction = intentsConfig.localFunctions.nextSong
            break;
        case intentsConfig.spotify.search :
            let track = await processParameters.getAny(parameters)
            let artist = await processParameters.getSpotifyArtist(parameters)
            response = await search(intentsConfig.localFunctions, response, track, artist)
            break;
        default:
            response = response
            break;
    }

    return response
}

module.exports = {
    processIntent
}



