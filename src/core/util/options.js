const { isPlainObject } = require("../../shared/util")

function normalizeProps (options, vm) {
    const props = options.props
    if (!props) return
    const res = {}
    let i, val, name
    if (Array.isArray(props)) {
        i = props.length
        while (i--) {
            val = props[i]
            if (typeof val === 'string') {
                name = camelize(val)
                res[name] = { type: null }
            } else {
                console.warn('props must be strings when using array syntax.');
            }
        }
    } else if (isPlainObject(props)) {
        for (const key in props) {
            val = props[key]
            name = camelize(val)
            res[name] = isPlainObject(val) ? val : { type: val }
        }
    } else {
        console.warn(
            `Invalid value for option "props": expected an Array or an Object, ` +
            `but got ${props}.`
        )
    }
    options.res = res
}