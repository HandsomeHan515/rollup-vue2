function optimize (root) {
    if (!root) return
    markStatic(root)
    markStaticRoots(root)
}

function markStatic (node) {
    node.static = isStatic(node)
    if (node.type === 1) {
        for (let i = 0, l = node.children.length; i < l; i++) {
            const child = node.children[i]
            markStatic(child)
            if (!child.static) {
                node.static = false
            }
        }
    }
}

function markStaticRoots (node) {
    if (node.type === 1) { // "<p>你好</p>" 由于只有一个纯文本内容，不会进行静态根节点标记
        if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
            node.staticRoot = true
            return // 当前节点已经是静态根节点了，不需要继续递归
        } else {
            node.staticRoot = false
        }
        if (node.children) {
            for (let i = 0, l = node.children.length; i < l; i++) {
                markStaticRoots(node.children[i])
            }
        }
    }
}

function isStatic (node) {
    if (node.type === 2) { // expression "hello {{name}}"
        return false
    }
    if (node.type === 3) { // text 纯文本 
        return true
    }
    /*
    return !!(node.pre || (
        !node.hasBindings && // no dynamic bindings
        !node.if && !node.for && // not v-if or v-for or v-else
        !isBuiltInTag(node.tag) && // not a built-in
        isPlatformReservedTag(node.tag) && // not a component
        !isDirectChildOfTemplateFor(node) &&
        Object.keys(node).every(isStaticKey)
    ))
    */
}