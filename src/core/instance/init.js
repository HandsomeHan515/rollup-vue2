import { initState } from "./state";
import { initEvents } from "./events";

export function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options;

        initState(vm);
        initEvents(vm)
    }
}