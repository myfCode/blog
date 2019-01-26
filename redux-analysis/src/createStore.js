/***
 * createStore用于生成一个容器，容器里存储了页面的状态；同时返回了用于单项修改、获取状态的方法
 * @param reducer
 * @param preloadState
 * @param enhancer
 * @returns {*}
 */
function createStore(reducer, preloadState, enhancer) {

    /***
     *根据参数传的不同，进行不同的操作
     *  1、默认createStore有三个参数reducer、preloadState、enhancer，如果参数正常执行enhancer(createStore)(reducer, preloadState)
     *  2、如果只有两个参数
     *     如果 typeof reducer != 'function' 不是函数，就报错
     *     如果 typeof preloadState === '函数' && echancer == undefined （也就是说只穿了连个参数）；那就把preloadState赋给enhancer， 然后自己置为undefined，
     *     如果 preloadState === {} 对象，就复制为默认的_state
     *     如果 preloadState == undefined ，默认_state = {}
     *
     * ***/


    // 如果 typeof reducer != 'function' 不是函数，就报错
    if(typeof reducer != 'function'){
        throw new Error('reducer must be function')
    }

    // 如果 typeof preloadState === '函数' && echancer == undefined （也就是说只穿了连个参数）；那就把preloadState赋给enhancer， 然后自己置为undefined，
    if(typeof preloadState === 'function' && enhancer == undefined){
        enhancer = preloadState
        preloadState = undefined
    }

    if(enhancer !== undefined && typeof enhancer === 'function'){
        return enhancer(createStore)(reducer, preloadState)
    }



    /***
     *1、定义状态对象_state, 外部访问需要使用getState方法
     *2、没有传默认的preloadState，就设置_state = {}
     * ***/
    let _state = preloadState || {}

    /***
     * 默认监听事件存放的list
     * ***/
    let listeners = []


    /***
     * 获取内部的_state
     * @returns {*|{}}
     */
    function getState() {
        return _state
    }

    /***
     * 分发action；很关键的一点是，最后返回action
     * @param action
     * @returns {*}
     */
    function dispatch(action) {
        _state = reducer(_state, action)

        if(listeners.length){
            listeners.forEach(listener => listener())
        }

        return action
    }

    /***
     * 订阅事件
     * @param fn
     * @returns {Function}
     */
    function subscribe(fn) {
        typeof fn === 'function' && listeners.push(fn)

        return function () {
            listeners = listeners.filter(listener => listener !== fn)
        }
    }

    /***
     * 替换reducer
     * @param nextReducer
     */
    function replaceReducer(nextReducer) {
        if(nextReducer != undefined && typeof nextReducer === 'function') {
            reducer = nextReducer
        }
    }

    /***
     * 返回store的方法
     */
    return {
        getState,
        dispatch,
        subscribe,
        replaceReducer
    }
}

export default createStore