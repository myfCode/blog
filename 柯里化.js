function curry(){
    let nums = Array.prototype.slice.call(arguments)
    curry.total = curry.total ? curry.total : 0
    
    curry.total += nums.reduce((total, item) => total + item)

    curry.valueOf = function(){
        return curry.total
    }
    return curry
}



curry(1)(2)(3)(4)(5) //15
curry(1, 2, 3, 4, 5) //15