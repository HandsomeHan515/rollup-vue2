const { inBrowser } = require("../../../core/util/index")
const { query } = require("../util/index")

Vue.prototype.$mount = function (el) {
    el = el && inBrowser ? query(el) : undefined
    return mountComponent(this, el)
}