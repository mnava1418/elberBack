
const processIntent = (intentsConfig, intent, response) => {
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
        default:
            response = response
            break;
    }

    return response
}

module.exports = {
    processIntent
}
