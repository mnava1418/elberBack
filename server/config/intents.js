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
        removeItem: 'lists.removeitem'
    },
    fallback: {
        id: 'fallback'
    },
    localFunctions: {
        internetSearch: 'internetSearch'
    }
}