let bindActionCreator = (actionCreator, dispatch) => {
    return function (...args) {
        dispatch( actionCreator.call(this, ...args) )
    }
}

/***
 * bindActionCreators是action的生成集合器，
 * 下面只演示核心内容，没有做参数的一些特殊判断，还请谅解
 * @param actionCreators
 * @param dispatch
 * @returns {*}
 */
export default function bindActionCreators( actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }

    let finalActionCreators = {}
    let actionCreatorKeys = Object.keys(actionCreators)

    for(let i = 0, len = actionCreatorKeys.length; i < len; i++){
        let actionCreatorKey = actionCreatorKeys[i]
        if( typeof actionCreators[actionCreatorKey] === 'function' ){
            finalActionCreators[actionCreatorKey] = function () {
                bindActionCreator(actionCreators[actionCreatorKey], dispatch)
            }
        }
    }

    return finalActionCreators
}
/***
 * 等价于
 * {
 *      actionA: (...args) => dispatch(actionACreator(...args)),
 *      actionB: (...args) => dispatch(actionBCreator(...args)),
 *      actionC: (...args) => dispatch(actionCCreator(...args))
 * }
 *
 */

