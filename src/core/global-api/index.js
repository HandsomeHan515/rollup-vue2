import { nextTick } from "../util/index";
import { set, del } from "../observer/index";
import { ASSET_TYPES } from "../../shared/constants";
import { initAssetRegisters } from "./assets";
import { initExtend } from "./extend";
import { initUse } from "./use";
import { initMixin } from "./mixin";

export function initGlobalAPI (Vue) {
    Vue.set = set
    Vue.delete = del
    Vue.nextTick = nextTick

    Vue.options = Object.create(null)
    ASSET_TYPES.forEach(type => {
        Vue.options[type + 's'] = Object.create(null)
    })

    initUse(Vue)
    initMixin(Vue)
    initExtend(Vue)
    initAssetRegisters(Vue)
}