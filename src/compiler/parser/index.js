import { parseHTML } from './html-parser'
// 元素类型的 AST 节点
export function createASTElement (tag, attrs, parent) {
    return {
        type: 1,
        tag,
        attrsList: attrs,
        parent,
        children: []
    }
}

parseHTML(template, {
    start (tag, attrs, unary) {
        // 每当解析到标签的开始位置时，触发该函数
        let element = createASTElement(tag, attrs, currentParent)
    },
    end () {
        // 标签结束位置
    },
    chars (text) {
        // 文本
        let element = { type: 3, text }
    },
    comment (text) {
        // 注释
        let element = { type: 3, text, isComment: true }
    }
})