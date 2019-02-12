
/**
 * 寻找字符串中出现次数最多的字符
 * @param {String} str 
 * 
 * 利用对象key值的唯一性
 * 字符串的每个字符，都在obj里加一个属性，如果再次出现obj[key]就加1
 * 然后找出属性的值最大的
 */

 //只能查到最多的一个，比如说最多有两个的可能就不能完全显示
let findMostTimesStr1 = function (str) {

    if (typeof str !== 'string') {
        throw new Error('params must be string')
    }

    let obj = {},
        mostTimesStr = [],
        maxInfo = {str: '', times: 0} ,
        times = 1;

    str = str.split('')
    let _str
    for (let i = 0, len = str.length; i < len; i++) {
        _str = str[i]

        if (obj[_str]) {
            obj[_str] = Number(obj[_str]) + 1
            if (maxInfo.times < obj[_str]){
                maxInfo.times = obj[_str]
                maxInfo.str = _str
            } 
        } else {
            obj[_str] = 1
        }

    }

    return maxInfo

}

//可以显示所有出现次数最多的字符
let findMostTimesStr2 = function (str) {

    if (typeof str !== 'string') {
        throw new Error('params must be string')
    }

    let obj = {},
        mostTimesStr = [],
        times = 1;

    str = str.split('')
    let _str
    for (let i = 0, len = str.length; i < len; i++) {
        _str = str[i]

        if (obj[_str]) {
            obj[_str] = Number(obj[_str]) + 1
        } else {
            obj[_str] = 1
        }

    }

    times = Math.max.apply(null, Object.values(obj))
    mostTimesStr = Object.keys(obj).filter(item => obj[item] == times)

    return { mostTimesStr, times }

}


//test
var str = 'adfadfafdadgljlkjl'


