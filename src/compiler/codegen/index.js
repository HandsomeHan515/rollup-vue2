function genElement (el, state) {
    const data = el.plain ? undefined : genData(el, state)
    const children = genChildren(el, state)
    let code
    code = `_c('${el.tag}'${
        data ? `,${data}` : '' // data
        }${
        children ? `,${children}` : '' // children
        })`
    return code
}

function genData (el, state) {
    let data = '{'
    // key
    if (el.key) {
        data += `key:${el.key},`
    }
    // ref
    if (el.ref) {
        data += `ref:${el.ref},`
    }
    if (el.refInFor) {
        data += `refInFor:true,`
    }
    // pre
    if (el.pre) {
        data += `pre:true,`
    }

    // ...
    data = data.replace(/,$/, '') + '}'
    return data
}

function genChildren (el, state) {
    const children = el.children
    if (children.length) {
        return `[${children.map(c => genNode(c, state)).join(',')}]`
    }
}

function getNode (node, state) {
    if (node.type === 1) {
        return genElement(node, state)
    } else if (node.type === 3 && node.isComment) {
        return getCommnet(node)
    } else {
        return getText(node)
    }
}

export function genText (text) {
    return `_v(${text.type === 2
        ? text.expression
        : JSON.stringify(text.text)
        })`
}

export function genComment (comment) {
    return `_e(${JSON.stringify(comment.text)})`
}