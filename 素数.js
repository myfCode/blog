//素数：因子除了1和它本身的数

//判断是否是素数
function isPrimeNumber(num) {
    let sqrt = Math.ceil(Math.sqrt(+num))

    for(let i = 2; i <= sqrt; i++){
        if(num % i == 0) {
            return false
        }
    }
    return true
}


//获取某一范围内所有的素数
function getPrimeNumer(num) {
    let arr = []
    for(let i = 1; i <= num; i++){
        if(isPrimeNumber(i)){
            arr.push(i)
        }
    }

    return arr
}