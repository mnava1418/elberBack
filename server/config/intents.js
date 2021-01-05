module.exports = {
    date: {
        id: 'date',
        hora: 'date.currenttime',
        fecha: 'date.currentdate'
    },
    spotify: {
        id: 'spotify',
        play: 'spotify.play',
        pause: 'spotify.pause',
        next: 'spotify.next',
        search: 'spotify.search'
    },
    fallback: {
        id: 'fallback'
    },
    localFunctions: {
        internetSearch: 'internetSearch',
        playMusic: 'playMusic',
        pauseMusic: 'pauseMusic',
        nextSong: 'nextSong',
        setSong: 'setSong'
    },
    cryptos: {
        id: 'crypto',
        info: 'crypto.getinfo',
        tickerMapping: {
            bitcoin: 'BTC',
            ethereum: 'ETH',
            dai: 'DAI',
            tusd: 'TUSD',
        }
    }
}