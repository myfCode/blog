/***
 * 是combineReducers的简化版, 没做参数不是Object的判断，还请谅解
 * @param reducersObj
 * @returns {Function}
 */

export default function combineReducers(reducersObj) {

    let _convertedReducers = {}
    let reducerKeys = Object.keys(reducersObj)

    return function (state = {}, action) {
        reducerKeys.forEach(reducerKey => {
            _convertedReducers[reducerKey] = reducersObj[reducerKey](state[reducerKey], action)
        })

        return {..._convertedReducers}
    }
}

/***
 *等价于下面这个方法 ,只是做了一层转化
 * function reducer(state = {}, action) {
 *      return {
 *          demo1: demo1Reducer(state.demo1, action),
 *          demo2: demo2Reducer(state.demo2, action),
 *          demo3: demo3Reducer(state.demo3, action)
 *      }
 * }
 *
 */

