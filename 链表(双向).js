/***
 * 链表的每个节点
 * 每个节点有三个属性，state存放数据，next指向下一个节点，prev指向上一个节点
 *  */
class Node {
    constructor(state) {
        this.state = state
        this.next = null
        this.prev = null
    }
}

/**
 * 每个链表的构造函数
 * 每个实例都是一个链表，链表有增加、搜索、删除方法，有head指针和length属性
 */
class DoubleList {
    constructor() {
        this.head = null
        this.tail = null
    }
    /**
     * 获取链表的长度
     */
    get length() {
        let count = 0
        let currentNode = this.head

        while (currentNode) {
            if (currentNode !== null) {
                count++
                currentNode = currentNode.next
            } else {
                break
            }
        }
        return count
    }
    /**
     * 给链表增加节点
     * @param {新增的节点} node 
     * @param {新增节点到目标节点} targetNode 
     */
    add(node, targetNode) {
        if (targetNode instanceof Node) {
            return this._insertNodeByNode(node, targetNode)
        } else {
            return this._insertNodeByPosition(node, targetNode)
        }
    }

    _insertNodeByNode(node, targetNode) {
        let currentNode = this.head

        if (currentNode === null) {
            throw 'targetNode is absent'
        }

        while (currentNode) {
            if (currentNode.next === null) {
                return false
            } else if (currentNode == targetNode) {
                let prevNode = currentNode.prev
                if (prevNode === null) {
                    node.next = currentNode
                    currentNode.prev = node
                    this.head = node
                } else {
                    prevNode.next = node
                    node.next = currentNode
                    node.prev = prevNode
                    currentNode.prev = node
                }

                break
            } else {
                currentNode = currentNode.next
            }
        }

        return true
    }
    _insertNodeByPosition(node, position) {
        let len = this.length
        if (position > len || position < 0) {
            throw 'position args is wrong'
        }

        let currentNode = this.head
        let count = 0

        //是个空链表
        if (currentNode === null) {
            this.head = node
            this.tail = node
            return true
        }
        //插到链表第一个位置
        if (position == 0) {
            this.head = node
            node.next = currentNode
            currentNode.prev = node
            return true
        }

        //查到链表最后一个位置
        if (position == len) {
            currentNode = this.tail
            currentNode.next = node
            node.next = null
            node.prev = currentNode
            this.tail = node
            return true
        }

        //找到position对应的节点
        while (currentNode) {
            if (count == position) {
                //重置节点prev、next的指向
                let prevNode = currentNode.prev
                prevNode.next = node
                node.next = currentNode
                currentNode.prev = node
                node.prev = prevNode
                break
            } else if (currentNode.next === null) {
                currentNode.next = node
                node.prev = currentNode
                node.next = null
                this.tail = node
                break
            } else {
                currentNode = currentNode.next
                count++
            }
        }

        return true
    }
    /**
     * 查询节点是否在链表中
     * @param {搜索的节点} node 
     */
    has(node) {
        let currentNode = this.head
        if (currentNode && currentNode === node) {
            return currentNode
        }
        while (currentNode) {
            if (currentNode.next === null) {
                return false
            } else if (currentNode.next === node) {
                break
            } else {
                currentNode = currentNode.next
            }
        }
        return currentNode.next
    }
    /**
     * 删除某一个节点
     * @param {删除某一个节点} node 
     */
    remove(node) {
        let currentNode = this.head
        while (currentNode) {
            if (currentNode.next === null) {
                return false
            } else if (currentNode === node) {
                let prevNode = currentNode.prev
                let nextNode = currentNode.next
                prevNode.next = nextNode
                nextNode.prev = prevNode
                break
            } else {
                currentNode = currentNode.next
            }
        }
        return true
    }
}

//测试demo
var list = new DoubleList()
var node1 = new Node({ name: 'a' });
var node2 = new Node({ name: 'b' });
var node3 = new Node({ name: 'c' });
var node4 = new Node({ name: 'd' });
var node5 = new Node({ name: 'e' });

list.add(node1)
list.add(node2)
list.add(node3)
list.add(node4)
list.add(node5)

list.length //5


list.remove(node3) //true

list.length //4


