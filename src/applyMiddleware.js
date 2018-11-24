import compose from './compose'

/***
 *  applyMiddleware适用于处理store中间件的
 *
 *  中间件的定义方式：
 *  ( {getState, dispatch} ) => next => action => { 你写中间件的操作 ；如果需要继续往下执行，使用next（action）；如果不需要，就不要next了 }
 *  getState,dispatch 是store里的getState和dispatch
 *
 *
 */

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



//方法二，是中间件的更易读的形式
let applyMiddleware2 = function (...middlewares) {
    return function (storeFn) {
        return function (...args) {

            /***
             * 参数详解
             * 1、middlewares： 由各种中间件组成的list
             * 2、storeFn：实际上就是createStore
             * 3、args：就是createStore需要的reducer和preloadState
             */

            //生成一个store容器，...args就是reducer和preloadState
            let store = storeFn(...args)

            //重新定义一个dispatch，最终目的是用于覆盖上面生成的store默认dispatch
            let dispatch = (...params) => {
                throw new Error('disptach has not init')
            }


            let initStoreApi = {
                getState: store.getState,
                dispatch: (...dispatchParams) => dispatch(...dispatchParams)
            }

            /***
             * 初始化一下中间件
             * 使每个中间件
             * ( {dispatch, getState} ) => next => action => {一些操作； next(action)}
             * 转化为
             * next => action => {一些操作； next(action)}
             *
             * 由于map方法，所以生成的chain，是转化后的list
             * ***/
            let chain = middlewares.map(middleware => middleware(initStoreApi))

            /***
             *
             */
            dispatch = compose(...chain)(store.dispatch)

            return {
                ...store,
                dispatch
            }
        }
    }
}

export default applyMiddleware2

