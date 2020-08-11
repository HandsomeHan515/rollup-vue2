export function remove (arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
}

export function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

export function isUndef (v) {
    return v === undefined || v === null
}

export function isDef (v) {
    return v !== undefined && v !== null
}

export function isPrimitive (value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'symbol' ||
        typeof value === 'boolean'
    )
}

export function isValidArrayIndex (val) {
    const n = parseFloat(String(val))
    return n >= 0 && Math.floor(n) === n && isFinite(val)
}

export function toArray (list, start) {
    start = start || 0
    let i = list.length - start
    const ret = new Array(i)
    while (i--) {
        ret[i] = list[i + start]
    }
    return ret
}

export function noop (a, b, c) { }

export function extend (to, _from) {
    for (const key in _from) {
        to[key] = _from[key]
    }
    return to
}
