let fibonacc = function (len) {
    let arr = []

    function createFibonacc(i = 0) {
        if (i >= len) return
        if (i == 1 || i == 0) {
            arr.push(1)
        } else {
            arr[i] = Number(arr[i - 1]) + Number(arr[i - 2])
        }
        return createFibonacc(++i)
    }

    createFibonacc()

    return arr
}

fibonacc(10)


//动态规划实现斐波纳切
function fibc(n) {
    let reust = 1
    let last = 1
    let prevLast = 1
    for (let i = 2; i < n; i++) {
        result = last + prevLast
        prevLast = last
        last = result
    }
    return result
}