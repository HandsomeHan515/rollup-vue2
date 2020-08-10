function parseText (text) {
    const tagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
    if (!tagRE.test(text)) {
        return
    }

    const tokens = []
    let lastIndex = tagRE.lastIndex = 0
    let match, index

    while ((match = tagRE.exec(text))) {
        index = match.index
        // 先把  {{ 前边的文本添加到 tokens 中
        if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }
        // 把变量变成_s(x) 的形式添加到数组中
        tokens.push(`_s(${match[1].trim()})`)
        // 设置lastindex，保证下一轮循环时，正则表达式不再重复匹配已经解析过的文本
        lastIndex = index + match[0].length
    }
    // 将所有变量都处理完毕后，如果最后一个变量右面还有文本，将文本添加到数组中
    if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return tokens.join('+')
}

console.log(parseText("hello {{name}} 你是一个 {{age}} 岁的人了"))

function toString (val) { // _s = toString
    return val === null
        ? ''
        : typeof val === 'object'
            ? JSON.stringify(val, null, 2)
            : String(val)
}

const obj = { name: 'handsome' }
with (obj) {
    function toString (val) { // _s = toString
        return val === null
            ? ''
            : typeof val === 'object'
                ? JSON.stringify(val, null, 2)
                : String(val)
    }
    console.log("Hello " + toString(name))
}
