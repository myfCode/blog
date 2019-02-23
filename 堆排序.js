function heapSort(arr) {
    let len = arr.length


    //用于交换两个元素的位置
    function swap(arr, i, j) {
        //第一种方法
        // let temp = arr[i]
        // arr[i] = arr[j]
        // arr[j] = temp

        //第二种方法
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    //创建最大堆
    function buildMaxHeap(arr) {
        let boundary = Math.floor(Math.floor(len / 2 - 1))
        for (let i = boundary; i >= 0; i--) {
            heapChange(arr, i)
        }
    }

    //节点位置调整
    function heapChange(arr, i) {
        let left = i * 2 + 1
        let right = i * 2 + 2
        let largeIndex = i

        if(left < len && arr[left] > arr[largeIndex]){
            largeIndex = left
        }

        if (right < len && arr[right] > arr[largeIndex]) {
            largeIndex = right
        }

        if (largeIndex != i) {
            swap(arr, i, largeIndex)
            heapChange(arr, largeIndex)
        }

    }


    buildMaxHeap(arr)
    for (let i = len - 1; i > 0; i--) {
        swap(arr, 0, i)
        len--
        heapChange(arr, 0)
    }

    return arr
}

/************************************************ */
function swap(arr, i, j) {
    //第一种方法
    // let temp = arr[i]
    // arr[i] = arr[j]
    // arr[j] = temp

    //第二种方法
    [arr[i], arr[j]] = [arr[j], arr[i]]
}

function buildMaxHeap(arr) {
    let len = arr.length
    if (len == 0) return

    let boundary = Math.floor(len / 2 - 1)

    for (let i = boundary; i >= 0; i--) {
        heapChange(arr, i)
    }

    return arr
}

function heapChange(arr, i) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largeIndex = i;
    let len = arr.length

    if (left < len && arr[left] > arr[largeIndex]) {
        largeIndex = left
    }
    if (right < len && arr[right] > arr[largeIndex]) {
        largeIndex = right
    }

    if (largeIndex != i) {
        swap(arr, i, largeIndex)
        heapChange(arr, largeIndex)
    }
}

function heapSort(arr) {
    buildMaxHeap(arr)
    // console.log(arr)
    let finalArr = []
    for (let i = arr.length - 1; i >= 0; i--) {
        swap(arr, 0, i)
        finalArr.unshift(...arr.splice(i, 1))
        // console.log(finalArr)
        // console.log('--------')
        heapChange(arr, 0)
    }

    return finalArr
}



//demo

var arr = randomNum(7)

arr = [12, 41, 71, 56, 43, 12, 41]



