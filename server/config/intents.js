module.exports = {
    date: {
        id: 'date',
        hora: 'date.currenttime',
        fecha: 'date.currentdate'
    },
    lists: {
        id: 'lists',
        getLists: 'lists.getall',
        createList: 'lists.create',
        deleteList: 'lists.delete',
        addItems: 'lists.additems',
        listContent: 'lists.getlistcontent',
        removeItem: 'lists.removeitem',
        clearList: 'lists.clearlist'
    },
    spotify: {
        id: 'spotify',
        play: 'spotify.play',
        pause: 'spotify.pause',
        next: 'spotify.next'
    },
    fallback: {
        id: 'fallback'
    },
    localFunctions: {
        internetSearch: 'internetSearch',
        playMusic: 'playMusic',
        pauseMusic: 'pauseMusic',
        nextSong: 'nextSong',
    }
}