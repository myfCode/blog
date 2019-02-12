
let jieliu = function(fn, time){
    let timer = null
    return function(){
        if(timer !== null) return
        timer = setTimeout(function(){
            fn.apply(null, [].slice.call(arguments))
            clearTimeout(timer)
            timer = null
        }, time)
    }
}

let fangdou = function(fn, time){
    let timer = null
    return function(){
        if(timer) clearTimeout(timer)
        timer = setTimeout(function(){
            fn.apply(null, [].slice.call(arguments))
            clearTimeout(timer)
            timer = null
        }, time)
    }
}