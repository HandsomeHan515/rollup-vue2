import { toArray } from '../util/index'

export function initEvents (vm) {
    vm._events = Object.create(null)
}

export function eventsMixin (Vue) {
    Vue.prototype.$on = function (event, fn) {
        const vm = this
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.$on(event[i], fn)
            }
        } else {
            (vm._events[event] || (vm._events[event] = [])).push(fn)
        }
        return vm
    }

    Vue.prototype.$once = function (event, fn) {
        const vm = this
        function on () {
            vm.$off(event, on)
            fn.apply(vm, arguments)
        }
        on.fn = fn
        vm.$on(event, on)
        return vm
    }

    Vue.prototype.$off = function (event, fn) {
        const vm = this
        // 移除所有事件的监听器
        if (!arguments.length) {
            vm._events = Object.create(null)
            return vm
        }
        // event 为数组
        if (Array.isArray(event)) {
            for (let i = 0, l = eventl.length; i < l; i++) {
                this.$off(event[i], fn)
            }
            return vm
        }
        // 只有事件名，则移除该事件的所有监听器
        const cbs = vm._events[event]
        if (!cbs) {
            return
        }
        if (arguments.length === 1) {
            vm._events[event] = null
            return vm
        }
        // 事件+回调
        if (fn) {
            let cb
            let i = cbs.length
            while (i--) {
                cb = cbs[i]
                if (cb === fn || cb.fn === fn) {
                    cbs.splice(i, 1)
                    break
                }
            }
        }
        return vm
    }

    Vue.prototype.$emit = function (event) {
        const vm = this
        const cbs = vm._events[event]
        if (cbs) {
            const args = toArray(arguments, 1)
            for (let i = 0, l = cbs.length; i < l; i++) {
                try {
                    cbs[i].apply(vm, args)
                } catch (e) {
                    // handleError
                }
            }
        }
    }
}