/**
 * 生成长度为len的随机几位数
 * @param {*} len 长度
 * @param {*} num 位数
 */
let randomNum = function (len, num) {
    
    let arr = []
    for (let i = 0; i < len; i++) arr.push(+createNum(num))
    return arr
}

let createNum = function (len) {
    return (Math.random() * (len || 10) + '').split('.')[0]
}
