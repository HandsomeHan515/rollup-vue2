import { hasProto, def } from '../util/index'
import { arrayMethods } from './array'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

class Observer {
    constructor(value) {
        this.value = value;
        def(value, '__ob__', this)

        if (Array.isArray(value)) {
            if (hasProto) {
                protoAugment(value, arrayMethods)
            } else {
                copyAugment(value, arrayMethods, arrayKeys)
            }
            this.observeArray(value)
        } else {
            this.walk(value);
        }
    }

    walk (obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]]);
        }
    }

    observeArray (items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }
}

function protoAugment (target, src) {
    target.__proto__ = src
}

function copyAugment (target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}

export function observe (value) {
    if (typeof value !== 'object' || value === null) {
        return;
    }
    return new Observer(value)
}

export function defineReactive (obj, key, value) {
    observe(value);

    Object.defineProperty(obj, key, {
        get () {
            return value;
        },
        set (newVal) {
            if (newVal === value) return;
            value = newVal;
        }
    })
}