import { hasProto, def, hasOwn, isObject } from '../util/index'
import { arrayMethods } from './array'
import Dep from './dep'
import Watcher from './watcher'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep()
        def(value, '__ob__', this)

        if (Array.isArray(value)) {
            if (hasProto) {
                protoAugment(value, arrayMethods)
            } else {
                copyAugment(value, arrayMethods, arrayKeys)
            }
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk (obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
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
    if (!isObject(value)) {
        return
    }
    let ob
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}

export function defineReactive (data, key, val) {
    const dep = new Dep()
    let childOb = observe(val)

    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get: function reactiveGetter () {
            dep.depend()
            if (childOb) {
                childOb.dep.depend()
            }
            return val
        },
        set: function reactiveSetter (newVal) {
            if (newVal === value) return
            val = newVal
            dep.notify()
        }
    })
}