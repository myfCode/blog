function flat (arr){
    let tempArr = []
    let element 
    for(let i = 0, len = arr.length; i < len; i++){
        element = arr[i]
        if (Array.isArray(element)) {
            element = flat(element)
        }
        tempArr = tempArr.concat(element)
    }

    return tempArr
}


let arr = [1,[[[[[3]]]]]]



