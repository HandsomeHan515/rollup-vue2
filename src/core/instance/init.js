import { initState } from "./state";
import { initEvents } from "./events";
import { initLifecycle } from "./lifecycle";
import { initRender } from "./render";

export function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options;

        initLifecycle(vm)
        initEvents(vm)
        initRender(vm)
        // callHook(vm, 'beforeCreate')
        initState(vm)
        // callHook(vm, 'created')

        if (vm.$options.el) {
            // vm.$mount(vm.$options.el)
        }
    }
}