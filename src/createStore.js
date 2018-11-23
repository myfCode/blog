function createStore(reducer, preloadState, enhancer) {
    
    if(enhancer !== undefined && typeof enhancer === 'function'){
        return enhancer(creatStore)(reducer, preloadState)
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

    return {
        getState,
        dispatch,
        subscribe
    }
}

export default createStore