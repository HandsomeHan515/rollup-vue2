import { query } from "./util/index"
import { extend } from '../../shared/util/index'

function idToTemplate (id) {
    const el = query(id)
    return el && el.innerHTML
}

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (el) {
    el = el && query(el)
    const options = this.$options
    if (!options.render) { // 将模板编译成渲染函数并赋值给 options.render
        let template = options.template
        if (template) {
            if (typeof template === 'string') {
                if (template.charAt(0) === '#') {
                    template = idToTemplate(template)
                }
            } else if (template.nodeType) {
                template = template.innerHTML
            } else {
                return this
            }
        } else if (el) {
            template = getOuterHTML(el)
        }
        if (template) {
            const { render } = compileToFunctions(
                template,
                {},
                this
            )
            options.render = render
        }
    }
    return mount.call(this, el)
}

function getOuterHTML (el) {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div')
        container.appendChild(el.cloneNode(true))
        return container.innerHTML
    }
}

const cache = Object.create(null)
function compileToFunctions (template, options, vm) {
    options = extend({}, options)

    const key = options.delimiters ? String(options.delimiters) + template : template
    if (cache[key]) {
        return caches[key]
    }

    // 编译
    const compiled = compile(template, options)

    const res = {}
    res.render = createFunction(compiled.render)
    return (cache[key] = res)
}

function createFunction (code) {
    return new Function(code)
}