/***
 * 链表的每个节点
 * 每个节点有两个属性，state存放数据，next指向下一个节点
 *  */
class Node {
    constructor(state) {
        this.state = state
        this.next = null
    }
}

/**
 * 每个链表的构造函数
 * 每个实例都是一个链表，链表有增加、搜索、删除方法，有head指针和length属性
 */
class LinkList {
    constructor() {
        this.head = new Node(null)
    }
    /**
     * 获取链表的长度
     */
    get length() {
        let count = 0
        let currentNode = this.head
        while (currentNode) {
            if (currentNode.next !== null) {
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
     * @param {新增到目标节点的左侧还是右侧} left 
     */
    add(node, targetNode, left = true) {
        if (this.head.next === null) {
            return this.head.next = node
        }

        let currentNode = this.head
        while (currentNode) {
            if (targetNode){
                if(currentNode.next === targetNode){
                    if (left) {
                        currentNode.next = node
                        node.next = targetNode
                    } else {
                        currentNode = currentNode.next
                        let nextNode = currentNode.next
                        currentNode.next = node
                        node.next = nextNode
                    }
                    break
                }else{
                    currentNode = currentNode.next
                }
            }else{
                if (currentNode.next !== null){
                    currentNode = currentNode.next
                }else{
                    currentNode.next = node
                    break
                }
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
        while (currentNode) {
            if (currentNode.next === null) {
                return false
            } else if (currentNode.next === node) {
                break
            } else {
                currentNode = currentNode.next
            }
        }
        return true
    }

    /**
     * 查询某个位置的节点
     * @param {查询某个位置的节点} position 
     */
    searchNodeAtPosition(position){
        let len = this.length
        if(len == 0 || position < 1 || position > len){
            throw '查询位置错误'
        }
        let currentNode = this.head
        let count = 0
        while(currentNode){
            if(count < position){
                count++
                currentNode = currentNode.next
            }else{
                break
            }
        }
        return currentNode
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
            } else if (currentNode.next === node) {
                let nextNode = currentNode.next.next
                currentNode.next.next = null
                currentNode.next = nextNode
                break
            } else {
                currentNode = currentNode.next
            }
        }
        return true
    }

    /**
     * 反转链表
     */
    reverse(){
        var temp = new Node({name: null})

        temp.next = this.head
        var pre = temp.next
        var cur = pre.next

        while(cur != null){
            pre.next = cur.next
            cur.next = pre
            temp.next = cur

            cur = pre.next
        }

        return temp.next

    }
}

//测试demo
var list = new LinkList()
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
list.has(node3) //true

list.remove(node3) //true

list.length //4
list.has(node3) //false

