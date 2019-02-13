/**
 * 生成长度为len的随机数
 * @param {生成长度为len的随机数} len 
 */
let randomNum = function (len) {
    function _createNum() {
        return (Math.random() * 100 + '').split('.')[0]
    }
    let arr = []
    for (let i = 0; i < len; i++) arr.push(+_createNum())
    return arr
}

//插入>选择 >冒泡

//冒泡排序
let bubbleSort = function (arr) {

    let temp
    let len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
    }

    return arr
}


//快速排序
let quickSort = function _sort_(arr) {

    let len = arr.length
    if (len <= 1) return arr

    let middleIndex = Math.ceil(len / 2)
    let baseArr = arr.splice(middleIndex, 1)
    let base = baseArr[0]

    let left = []
    let right = []

    let current
    for (let i = 0; i < len - 1; i++) {
        current = arr[i]
        if (arr[i] == base) {
            baseArr.push(current)
        }
        if (arr[i] > base) {
            right.push(current)
        }
        if (arr[i] < base) {
            left.push(current)
        }
    }

    return _sort_(left).concat(baseArr, _sort_(right))
}





//生成长度为len的随机数
let randomNum = function (len) {
    function _createNum() {
        return (Math.random() * 100 + '').split('.')[0]
    }
    let arr = []
    for (let i = 0; i < len; i++) arr.push(+_createNum())
    return arr
}

//插入排序
let insetSort = function (arr) {
    let inner, temp;
    for (let outer = 1, len = arr.length; outer < len; outer++) {
        temp = arr[outer]
        inner = outer
        while (inner > 0 && arr[inner - 1] > temp) {
            arr[inner] = arr[inner - 1]
            inner--
        }
        arr[inner] = temp
    }
    return arr
}

//选择排序
let selectSort = function (arr) {
    let minIndex
    let len = arr.length
    for (let i = 0; i < len; i++) {
        minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr
}


//希尔排序
let shellSort = function (arr, gaps) {
    if (!gaps) {
        gaps = createGaps(arr)
    }
    let len = arr.length;
    let temp, gap, i, j, k;
    let gapsLen = gaps.length;
    for (i = 0; i < gapsLen; i++) {
        gap = gaps[i]
        for (j = gap; j < len; j++) {
            temp = arr[j]
            k = j
            while (k > 0 && arr[k - gap] > temp) {
                arr[k] = arr[k - gap]
                k -= gap
            }
            arr[k] = temp
        }
    }
    return arr
}

let createGaps = function (arr) {
    let len = arr.length
    let gap = 1
    let gapArr = [gap]

    let boundary = len / 3

    while (gap < boundary) {
        gap = gap * 3 + 1
        gapArr.unshift(gap)
    }

    return gapArr
}


//归并排序
let mergeArray = function (left, right) {
    let result = []
    while (left.length > 0 && right.length > 0) {
        if (left[0] > right[0]) {
            result.push(right.shift())
        } else {
            result.push(left.shift())
        }
    }
    return result.concat(left, right)
}


let mergeSort = function(arr){
    let len = arr.length
    if(len <= 1) return arr

    let mid = Math.floor(len / 2)
    let left = arr.slice(0, mid)
    let right = arr.slice(mid)

    return mergeArray(mergeSort(left), mergeSort(right))
}















