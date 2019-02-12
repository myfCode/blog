/**
 * 定义二叉树的每个节点的构造函数
 * 有三个属性：data，left，right
 */
class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

/**
 * 二叉树的构造函数
 * 1、节点左侧的都是比当前节点小的，右侧都是比当前节点大的
 * 2、可以插入节点（insert方法）
 * 3、可以删除节点（remove方法）
 * 4、可以查找节点，找到了返回一个json对象（对象有三个属性，node当前节点，parent父节点，position位于附加点的左侧还是右侧），没找到返回null
 * 5、找到节点下的最小值（_findMinNode方法）
 * 6、找到节点下的最大值（_findMaxNode方法）
 */
class BinraryTree {
    constructor() {
        //根节点
        this.root = null
    }
    /**
     * 插入节点
     * @param {number} data 
     */
    insert(data) {
        let nodeNeedInserted = new Node(data)

        let currentNode = this.root
        //没有根节点，把节点当作根节点
        if (!currentNode) {
            return this.root = nodeNeedInserted
        }

        let parentNode = null
        while (1) {
            parentNode = currentNode
            //小于当前节点就往左侧查找
            if (data < currentNode.data) {
                currentNode = currentNode.left
                if (currentNode === null) {
                    parentNode.left = nodeNeedInserted
                    break
                }
            } else {//反之就向右侧查找
                currentNode = currentNode.right
                if (currentNode === null) {
                    parentNode.right = nodeNeedInserted
                    break
                }
            }
        }
        return true
    }
    /**
     * 查找某一节点
     * @param {number} data 
     * @return { obj || null}
     * 没找到节点就返回null，找到了就返回一个json对象
     * json对象：
     * node指当前节点
     * parent指查找到的节点的父节点
     * position指找的的节点位于父节点的位置
     * 
     * 当查找的节点就是传入的节点，此时parent为null，position为null
     */
    find(data) {
        let currentNode = this.root
        let parentNode = null
        let position = null

        while (currentNode) {

            if (data < currentNode.data) {
                parentNode = currentNode
                currentNode = currentNode.left
                position = 'left'
            } else if (data == currentNode.data) {
                break
            } else {
                parentNode = currentNode
                currentNode = currentNode.right
                position = 'right'
            }
        }

        return !!currentNode ? { node: currentNode, parent: parentNode, position: position } : null
    }
    /**
     * 删除某一个节点
     * @param {number} data 
     * 
     * 删除分3中情况
     * 1、叶子节点left、right都为null
     * 2、left和right都不为null
     * 3、left或right一个为null
     * 
     */
    remove(data) {
        let nodeNeedRemove = new Node(data)

        //查找要删除的节点
        let nodeFinded = this.find(data)
        let { node, parent, position } = nodeFinded

        //如果找到了就执行删除操作，没有找到就直接return false
        if (nodeFinded) {
            //1、叶子节点left、right都为null
            if (node.left === null && node.right === null) {
                if (!parent) {
                    this.root = null
                } else {
                    parent[position] = null
                }
                //2、left和right都不为null
            } else if (!!node.left && !!node.right) {
                let minNodeInRight = this._findMinNode(node.right)
                let minNodeInRight_right = minNodeInRight.node.right
                if (minNodeInRight.parent) {
                    minNodeInRight.parent[minNodeInRight.position] = minNodeInRight_right
                }

                //查询的位置是传入的节点
                if (position) {
                    parent[position] = minNodeInRight.node
                } else {//删除的是根节点
                    this.root = minNodeInRight.node
                }

                minNodeInRight.node.left = node.left
                if (minNodeInRight.parent) {
                    minNodeInRight.node.right = node.right
                }
                node.left = null
                node.right = null
                //3、left或right一个为null
            } else {
                parent[position] = node.left || node.right
            }

            return true
        }
        return false
    }
    /**
     * 查询当前节点下最大的那个节点
     * @param {Node} root 
     */
    _findMaxNode(root) {
        let currentNode = root
        let parentNode = null
        while (currentNode.right != null) {
            parentNode = currentNode
            currentNode = currentNode.right
        }
        return { node: currentNode, parent: parentNode, position: 'right' }
    }
    /**
     * 查询当前节点下最小的那个节点
     * @param {Node} root 
     */
    _findMinNode(root) {
        let currentNode = root
        let parentNode = null
        while (currentNode.left != null) {
            parentNode = currentNode
            currentNode = currentNode.left
        }
        return { node: currentNode, parent: parentNode, position: 'left' }
    }
}

var bin = new BinraryTree()
bin.insert(3)
bin.insert(5)
bin.insert(7)
bin.insert(1)
bin.insert(9)
bin.insert(4)
bin.insert(2)
bin.insert(11)
bin.insert(0)