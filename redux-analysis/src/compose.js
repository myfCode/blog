/***
 * 组合redux中间件
 * 函数compose的目的是，返回一个参数是dispatch函数；如 next => {操作}　
 * 就是applyMiddleware模块（line:82） `dispatch = compose(...chain)(store.dispatch)` 的第二个参数
 * @param middlewares
 * @returns {*|(function(...[*]): *)}
 */

export default function compose(...middlewares) {
    /***
     * 传参middlewares是一个array，array的每个元素都是一个类似 next => action => {操作；next(action)} 的函数
     */

    /***
     * 当middlewares.length == 0 返回一个空函数
     * 当middlewares.length == 1 返回第一个函数
     */
    if( middlewares.length === 0 ){
        return arg => arg
    }

    if(middlewares.length === 1){
        return middlewares[0]
    }

    /***
     * 最经典的方法
     * 首先要了解reduce的用法
     *
     * 理解步骤一：
     * 比如现在 middlewares = [a, b, c]
     *
     * a、b、c的格式都是
     *  a = b = c = next => action => next(action)
     *
     * 为了区分方便，便于理解，分别用nexta、actiona、nextb、actionb、nextc、actionc
     *
     * a = nexta => actiona => nexta(actiona)
     * b = nextb => actionb => nextb(actionb)
     * c = nextc => actionc => nextc(actionc)
     *
     * 第一次执行
     * [a, b, c].reduce( (total1, current1)=>{
     *      return (...args1) => {
     *          return total1(current(...args1))
     *      }
     * } )
     *     < ========== > 等价于
     * [a, b, c].reduce( (a, b)=>{
     *      return (...args1) => {
     *          return a( b(...args1) )
     *      }
     * } )
     *
     * 第二次执行
     * [a, b, c].reduce( (total2, current2)=>{
     *      return (...args2) => {
     *          return total2(current2(...args2))
     *      }
     * } )
     *
     *   < ========== >   等价于
     *  [a, b, c].reduce( (total2, c)=>{
     *      return (...args2) => {
     *          return total2(c(...args2))
     *      }
     * } )
     *
     * < ========== >   等价于
     *
     *  [a, b, c].reduce( (total2, c)=>{
     *      return (...args2) => {
     *          return a( b( c(...args2) ) )
     *      }
     * } )
     *
     *
     * compose(...middlewares)方法执行完成后 的返回值为：
     *  function (...args2) => {
     *          return a( b( c(...args2) ) )
     *      }
     *
     *
     * compose(...middlewares)(store.dispatch)时 返回值为：
     * a( b( c( store.dispatch ) ) )
     * < ========== >   等价于
     * 现在分层计算
     * cReturnFn = c( store.dispatch )
     *           = function(actionc){ return store.dispatch(actionc)}
     *
     * bReturnFn = b( c( store.dispatch ) )
     *           = b( cReturnFn )
     *           = function ( actionb ) { return cReturnFn(actionb) }
     *           = function ( actionb ) { return (function(actionc){ return store.dispatch(actionc) })(actionb) }
     *
     * aReturnFn = a( b( c( store.dispatch ) ) )
     *           = a ( bReturnFn )
     *           = function (actiona) { return bReturnFn(actiona)}
     *           = function (actiona) {
     *                  return (function ( actionb ) {
         *                  return (function(actionc){
         *                              return store.dispatch(actionc)
         *                          })(actionb)
     *                  })(actiona)
     *             }
     *
     *
     * 最终可得：compose(...middlewares)(store.dispatch)
     * < ========== >   等价于
     * aReturnFn( actiona )
     * < ========== >   等价于
     * (function (actiona) {
     *      //此处是中间件a的操作
     *      return (function ( actionb ) {  //实际上就是nexta(actiona)
     *
     *             //此处是中间件b的操作
     *             return (function(actionc){  //实际上就是nextb(actionb)
     *
     *                          //此处是中间件c的操作, 所以dispatch出发state更新 是在经过了所有中间件后才有的操作
     *                          return store.dispatch(actionc)  //实际上就是nextc(actionc)
     *                     })(actionb)
     *             })(actiona)
     * }) ( action )
     *
     *
     */
    return middlewares.reduce((a, b) => (...args) => a(b(...args)))
}
