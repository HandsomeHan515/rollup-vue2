const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/

const ncname = `[a-zA-Z_][\\w\\-\\.]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
const comment = /^<!\--/
const conditionalComment = /^<!\[/

let html = '<div class="active" id="el">你好！</div>'
function advance (n) {
    html = html.substring(n)
}

function parseHTML (html, options) {
    while (html) {

    }
}

function parseStartTag () {
    const start = html.match(startTagOpen)
    if (start) {
        const match = {
            tagName: start[1],
            attrs: []
        }
        advance(start[0].length)
        // 解析标签属性
        let end, attr
        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            advance(attr[0].length)
            match.attrs.push(attr)
        }
        // 判断标签是否是自闭合标签
        if (end) {
            match.unarySlash = end[1]
            advance(end[0].length)
            return match
        }
    }
}

console.log(parseStartTag(), html)

// export { parseHTML }