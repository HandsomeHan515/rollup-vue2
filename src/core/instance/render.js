/**
 * 生命周期相关的实例方法 $nextTick
 */

import { nextTick } from "../util/next-tick"

export function renderMixin (Vue) {
    Vue.prototype.$nextTick = function (fn) {
        return nextTick(fn, this)
    }
}