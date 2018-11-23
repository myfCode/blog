import compose from './compose'

let applyMiddleware = (...middlewares) => store => (...args) => action => {
    let storeApi = store.createStore(...args)

}


//解析版
let applyMiddleware = function (...middlewares) {
    return function (storeFn) {
        return function (...args) {

            let store = storeFn(...args)

            let dispatch = (...params) => {
                throw new Error('disptach has not init')
            }


            let initStoreApi = {
                getState: store.getState,
                dispatch: (...dispatchParams) => dispatch(...dispatchParams)
            }

            let chain = middlewares.map(middleware => middleware(initStoreApi))
            dispatch = compose(...chain)(store.dispatch)

            return {
                ...store,
                dispatch
            }
        }
    }
}

export default applyMiddleware

