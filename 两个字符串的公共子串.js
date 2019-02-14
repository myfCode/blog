function findCommonStr(str1, str2) {

    let len1 = str1.length
    let len2 = str2.length

    //定义二维数组
    var arr = new Array(len1 + 1)
    for (let i = 0; i < len1 + 1; i++) {
        arr[i] = new Array(len2 + 1)
        for (let j = 0; j < len2 + 1; j++) {
            arr[i][j] = 0
        }
    }

    let max = 0;
    let index = 0;
    for (let m = 0; m <= len1; m++) {
        for (let n = 0; n <= len2; n++) {
            if (m == 0 || n == 0) {//默认第一行、第一列都为0
                arr[m][n] = 0
                // continue
            } else {
                if (str1[m - 1] === str2[n - 1]) {//如过字符一样，就等于斜对角上一个位置的数值+1
                    arr[m][n] = arr[m - 1][n - 1] + 1
                } else {//字符不一样就对应二维数组位置写0
                    arr[m][n] = 0
                }

            }

            if (max < arr[m][n]) {
                max = arr[m][n]
                index = m
            }

        }
    }

    console.log(max, index)

    //如果最大值位0，就没有公共的字符串；如果有，就剪切出那个字符串
    return max == 0 ? '' : str1.slice(index - max, index)

}

findCommonStr('asddf', 'wersdfs')


function lcs(word1, word2) {
    var max = 0;
    var index = 0;
    var lcsarr = new Array(word1.length);
    for (var i = 0; i <= word1.length; ++i) {
        lcsarr[i] = new Array(word2.length);
        for (var j = 0; j <= word2.length; ++j) {
            lcsarr[i][j] = 0;
        }
    }
    // debugger
    console.log('lcsarr', lcsarr)
    // return
    for (var i = 0; i <= word1.length; ++i) {
        for (var j = 0; j <= word2.length; ++j) {
            if (i == 0 || j == 0) {
                lcsarr[i][j] = 0;
            } else {
                if (word1[i - 1] == word2[j - 1]) {
                    lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
                } else {
                    lcsarr[i][j] = 0;
                }
            }
            if (max < lcsarr[i][j]) {
                max = lcsarr[i][j];
                index = i;
            }
        }
    }
    console.log(lcsarr, max, index)
    var str = "";
    if (max == 0) {
        return "";
    } else {
        for (var i = index - max; i <= max; ++i) {
            str += word2[i];
        }
        return str;
    }
}


var str1 = 'xbcvc';
var str2 = 'xcbcc'


console.log(lcs(str1, str2))

function longestCommonStr(word1, word2) {
    let len1 = word1.length
    let len2 = word2.length

    var arr = new Array(len1 + 1)
    for (let n = 0, _len = arr.length; n < _len; n++) {
        arr[n] = new Array(len2 + 1).fill(0)
    }

    console.log('arr', arr)
    // return
    let max = 0, index
    for (let i = 0; i <= len1; i++) {
        for (var j = 0; j <= len2; j++) {
            if (i == 0 || j == 0) {
                arr[i][j] = 0

            } else if (word1[i - 1] === word2[j - 1]) {
                arr[i][j] = arr[i - 1][j - 1] + 1
            } else {
                arr[i][j] = 0
            }

            if (max < arr[i][j]) {
                max = arr[i][j]
                index = i
            }
        }
    }
    console.log(arr, max, index)
    if (max == 0) return ''

    let str = ''
    for (let m = index - max; m <= max; m++) {
        str += word2[m]
    }

    return str

}

console.log(longestCommonStr(str1, str2))

//by司徒正美
function LCS(str1, str2) {
    var rows = str1.split("")
    rows.unshift("")
    var cols = str2.split("")
    cols.unshift("")
    var m = rows.length
    var n = cols.length
    var dp = []

    let max = 0, index;
    for (var i = 0; i < m; i++) {
        dp[i] = []
        for (var j = 0; j < n; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0
                continue
            }

            if (rows[i] === cols[j]) {
                dp[i][j] = dp[i - 1][j - 1] + 1 //对角＋1
            } else {
                dp[i][j] = 0 //对左边，上边取最大
            }

            if (max < dp[i][j]) {
                max = dp[i][j]
                index = i
            }
        }
        // console.log(dp[i].join(""))//调试
    }
    console.log(dp, max, index)
    return dp
}

console.log(LCS(str1, str2))
