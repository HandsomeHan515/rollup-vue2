import { observe, set, del } from "../observer/index";
import Watcher from "../observer/watcher";

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => { },
    set: () => { }
}

export function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter (val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

export function initState (vm) {
    const opts = vm.$options;
    if (opts.props) initProps(vm);
    if (opts.methods) initMethods(vm);
    if (opts.data) initData(vm);
    if (opts.computed) initComputed(vm);
    if (opts.watch) initWatch(vm);
}

function initProps (vm) { }

function initMethods (vm) { }

function initData (vm) {
    let data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

    for (const key in data) {
        proxy(vm, '_data', key)
    }
    observe(data);
}

function initComputed (vm) { }

function initWatch (vm) { }

export function stateMixin (Vue) {
    Vue.prototype.$set = set
    Vue.prototype.$del = del
    Vue.prototype.$watch = function (expOrFn, cb, options) {
        const vm = this
        options = options || {}
        const watcher = new Watcher(vm, expOrFn, cb, options)
        if (options.immediate) {
            cb.call(vm, watcher.value)
        }
        return function unwatcheFn () {
            watcher.teardown()
        }
    }
}