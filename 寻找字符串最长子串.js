/**
 * 寻找字符串最长的子串
 * @param {String} str 
 * 
 * 原理：
 * 
 */
let maxLenStr1 = function (str) {
    let _str = String(str)

    let _strList = _str.split('')
    _strList = [...new Set(_strList)]

    let maxStr = ''
    let arr = []
    for (let i = 0, len = str.length; i < len; i++) {
        for (let j = len - 1; j > i; j--) {
            maxStr = str.slice(i, j + 1)

            if (_strList.every(item => maxStr.indexOf(item) === maxStr.lastIndexOf(item))) {
                // console.log(maxStr)
                arr.push(maxStr)
                break;
            }

        }
    }
    if(!arr.length) return {}

    arr.sort((a, b) => a.length - b.length)
    // console.log('arr', arr)
    let maxLen = arr[arr.length - 1].length
    let maxLongStrs = arr.filter(item => item.length == maxLen)
    return {maxLongStrs, maxLen}
}