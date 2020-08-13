import { remove, noop } from "../util/index"
import { createEmptyVNode } from "../vdom/vnode"
import Watcher from "../observer/watcher"

export function initLifecycle (vm) {
    const options = vm.$options

    let parent = options.parent
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
            parent = parent.$parent
        }
        parent.$children.push(vm)
    }

    vm.$parent = parent
    vm.$root = parent ? parent.$root : vm

    vm.$children = []
    vm.$refs = {}

    vm._watcher = null
    vm._isDestroyed = false
    vm._isBeingDestroyed = false
}

/**
 * 生命周期相关的实例方法 $forceUpdate $destroy
 */
export function lifecycleMixin (Vue) {
    Vue.prototype.$forceUpdate = function () {
        const vm = this
        if (vm._watcher) {
            vm._watcher.update()
        }
    }

    Vue.prototype.$destroy = function () {
        const vm = this
        if (vm._isBeingDestroyed) {
            return
        }
        // callHook(vm, 'beforeDestroyed')
        vm._isBeingDestroyed = true
        // 删除自己与父级之间的关系
        const parent = vm.$parent
        if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
            remove(parent.$children, vm)
        }
        // teardown watchers
        if (vm._watcher) {
            vm._watcher.teardown()
        }
        // 使用vm.$watch创建的 watcher
        let i = vm._watchers.length
        while (i--) {
            vm._watchers[i].teardown()
        }
        vm._isDestroyed = true
        // 在vnode树上触发destroy钩子函数解绑指令
        vm.__patch__(vm._vnode, null)
        // callHook(vm, 'destroyed')
        // 移除所有监听器
        vm.$off()
    }
}

export function mountComponent (vm, el) {
    if (!vm.$options.render) {
        vm.$options.render = createEmptyVNode
    }

    // callHook(vm, 'beforeMount')

    vm._watcher = new Watcher(vm, () => {
        vm._update(vm._render())
    }, noop)

    // callHook(vm, 'mounted')
    return vm
}


export function callHook (vm, hook) {
    const handlers = vm.$options[hook]
    if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
            try {
                handlers[i].call(vm)
            } catch (error) {
                // handleError
            }
        }
    }
}