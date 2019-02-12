var myModules = (function(){
    let modules = {}

    function define(name, deps, callback){

        let len = Array.isArray(deps) && deps.length || 0
        let _deps = []
        if(len){
            _deps = deps.map((dep,i) => modules[deps[i]])
        }

        modules[name] = callback.apply(null, _deps)
    }

    function getModules(name){
        return !!name ? modules[name] : modules
    }

    return {
        define: define,
        getModules: getModules
    }
})()

myModules.define('foo', [], function(){
    let _str = 'foo _str'
  

    let add = function () { }
    let sub = function () { }
    let change = function (str) { 
        _str = str
    }
    let show = function(){
        return _str
    }

    return {
        str: _str,
        change:change,
        show: show
    }
})

myModules.define('bar', ['foo'], function(foo){

    let show = function(){
        console.log('bar inner console', foo.str)
    }

    return {
        show: show
    }
})

myModules.define('baz', ['foo'], function(foo){

    let changeFooStr = function(){
        foo.str = 'foo str change in baz'

        return foo.str
    }

    let show = function(){
        console.log(foo.str)
    }

    return {
        changeFooStr: changeFooStr,
        show
    }
})

var modules = myModules.getModules()




