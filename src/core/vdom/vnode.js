export default class VNode {
    constructor(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.ns = undefined
        this.context = context
        this.functionalContext = undefined
        this.functionalOptions = undefined
        this.functionalScopeId = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        this.componentInstance = undefined
        this.parent = undefined
        this.raw = false
        this.isStatic = false
        this.isRootInsert = true
        this.isCommnet = false
        this.isCloned = false
        this.isOnce = false
        this.asyncFactory = asyncFactory
        this.asyncMeta = undefined
        this.isAsyncPlaceholder = false
    }

    get child () {
        return this.componentInstance
    }
}

// 注释节点
export const createEmptyVNode = text => {
    const node = new VNode()
    node.text = text
    node.isCommnet = true
    return node
}

// 文本节点
export const createTextVNode = val => {
    return new VNode(undefined, undefined, undefined, String(val))
}

// 克隆节点 优化静态节点和插槽节点
export const cloneVNode = (vnode, deep) => {
    const cloned = new VNode(
        vnode.tag,
        vnode.data,
        vnode.children,
        vnode.text,
        vnode.elm,
        vnode.context,
        vnode.componentOptions,
        vnode.asyncFactory
    )
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isCommnet = vnode.isCommnet
    cloned.isCloned = true
    if (deep && vnode.children) {
        cloned.children = cloneVNode(vnode.children)
    }
    return cloned
}