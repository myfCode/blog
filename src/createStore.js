function createStore(reducer, preloadState, enhancer) {

    if(typeof preloadState === 'function' && enhancer == undefined){
        enhancer = preloadState
        preloadState = undefined
    }

    if(enhancer !== undefined && typeof enhancer === 'function'){
        return enhancer(createStore)(reducer, preloadState)
    }


    if(typeof reducer != 'function' && typeof preloadState === 'function'){
        reducer = preloadState
        preloadState = undefined
    }

    if(typeof  reducer !== 'function'){
        throw new Error('reducer must is function')
    }

    let _state = preloadState || {}
    let listeners = []

    function getState() {
        return _state
    }

    function dispatch(action) {
        _state = reducer(_state, action)

        if(listeners.length){
            listeners.forEach(listener => listener())
        }

        return action
    }

    function subscribe(fn) {
        typeof fn === 'function' && listeners.push(fn)

        return function () {
            listeners = listeners.filter(listener => listener !== fn)
        }
    }

    function replaceReducer(nextReducer) {
        if(nextReducer != undefined && typeof nextReducer === 'function') {
            reducer = nextReducer
        }
    }

    return {
        getState,
        dispatch,
        subscribe,
        replaceReducer
    }
}

export default createStore