import { initState } from "./state";
import { initEvents } from "./events";
import { initLifecycle } from "./lifecycle";

export function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options;

        initLifecycle(vm)
        initEvents(vm)
        initState(vm)
    }
}