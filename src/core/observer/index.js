import { hasProto, def, hasOwn, isObject, isValidArrayIndex } from '../util/index'
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

export function set (target, key, val) {
    // 处理数组
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        console.log(target)
        return val
    }

    // key 已经存在于 target 中
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }

    const ob = target.__ob__
    // 非响应式数据
    if (!ob) {
        target[key] = val
        return val
    }
    // 新增的属性
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}

export function del (target, key) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1)
        return
    }

    const ob = target.__ob__
    // key 不是 target 自身属性
    if (!hasOwn(target, key)) {
        return
    }
    delete target[key]
    if (!ob) { // 不是响应式的不需触发送通知
        return
    }
    ob.dep.notify()
}