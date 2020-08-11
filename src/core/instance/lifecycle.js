import { remove } from "../util"

export function initLifecycle (vm) {
    vm._watcher = null
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