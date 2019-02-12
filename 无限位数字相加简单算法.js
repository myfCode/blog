/**
 * 无限位数字相加的简单算法
 * @param {String} a 
 * @param {String} b 
 * 
 * 有条件限制，传参都必须是字符串
 * 原理：
 * 1、两个数相加最多向前进一位
 * 2、同位的数值相加，结果保留在当前位置上，需要进位的部分保留出来，用于下一位相加
 * 3、依次向前相加，得出最终结果
 */
let add = function (a, b) {
    let sum = 0,
        overflow = 0;

    sum = Number(a) + Number(b)

    if (sum > 10) {
        overflow = String(sum).slice(0, 1)
    }

    return { sum: String(sum), overflow: String(overflow) }
}


let infinityAdd = function (a, b) {
    a = String(a)
    b = String(b)

    let aArr = a.split('')
    let bArr = b.split('')

    aArr.unshift('')
    bArr.unshift('')
    let len = Math.max(aArr.length, bArr.length)

    let temp, sumArr = [];
    for (let i = len - 1; i > 0; i--) {
        temp = add(aArr[i], bArr[i])
        sumArr.unshift(temp.sum)

        let overflow = Number(temp.overflow)
        if (overflow > 0) {
            aArr[i - 1] = Number(aArr[i - 1]) + overflow
        }

    }

    return sumArr.join('')
}

console.log(infinityAdd('11111111111111111111', '22222222222222222222'))


