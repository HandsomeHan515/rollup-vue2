import { observe } from "./observer/index";

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