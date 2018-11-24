import compose from './compose'

// 方法一
let applyMiddleware1 = (...middlewares) => {
    return createStore => (...args) => {
        const store = createStore(...args)

        let dispatch = () => {
            throw new Error(
                `Dispatching while constructing your middleware is not allowed. ` +
                `Other middleware would not be applied to this dispatch.`
            )
        }

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }

        const chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)

        return {
            ...store,
            dispatch
        }
    }
}



//方法二
let applyMiddleware2 = function (...middlewares) {
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

export default applyMiddleware2

