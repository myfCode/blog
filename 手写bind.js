//第二版
Function.prototype.bind2 = function (context) {
    const self = this
    let args1 = Array.prototype.slice.call(arguments, 1)

    let fBound = function () {
        let args2 = Array.prototype.slice.call(arguments)
        return self.apply(context, args1.concat(args2))
    }

    fBound.prototype = this.prototype

    return fBound
}

/***
 * 第三版
 */
Function.prototype.bind3 = function (context) {
    const self = this
    let args1 = Array.prototype.slice.call(arguments, 1)

    let fBound = function () {
        let args2 = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof fBound ? this : context, args1.concat(args2))
    }

    fBound.prototype = this.prototype

    return fBound
}

/**
 * 第四版
 */
Function.prototype.bind4 = function () {
    const self = this
    let args1 = Array.prototype.slice.call(arguments, 1)

    let fn = function () { }
    let fBound = function () {
        let args2 = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof fn ? this : context, args1.concat(args2))
    }
    fn.prototype = this.prototype

    fBound.prototype = new fn()

    return fBound
}



