import { proxy } from "../instance/state"
import { ASSET_TYPES } from "../../shared/constants"
import { extend } from "../util/index"

export function initExtend (Vue) {
    let cid = 1

    Vue.extend = function (extendOptions) {
        extendOptions = extendOptions || {}
        const Super = this
        const SuperId = Super.cid
        const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
        if (cachedCtors[SuperId]) {
            return cachedCtors[SuperId]
        }
        const name = extendOptions.name || Super.options.name

        const Sub = function VueComponent (options) {
            this._init(options)
        }

        Sub.prototype = Object.create(Super.prototype)
        Sub.prototype.constructor = Sub
        Sub.cid = cid++
        // Sub.options = mergeOptions(Super.options, extendOptions)
        Sub['super'] = Super
        if (Sub.options.props) {
            initProps(Sub)
        }
        if (Sub.options.computed) {
            initComputed(Sub)
        }
        Sub.extend = Super.extend
        Sub.mixin = Super.mixin
        Sub.use = Super.use

        ASSET_TYPES.forEach(function (type) {
            Sub[type] = Super[type]
        })

        if (name) {
            Sub.options.components[nanme] = name
        }

        Sub.superOptions = Super.options
        Sub.extendOptions = extendOptions
        Sub.sealedOptions = extend({}, Sub.options)

        cachedCtors[SuperId] = Sub
        return Sub
    }
}

function initProps (Comp) {
    const props = Comp.options.props
    for (const key in props) {
        proxy(Comp.prototype, '_props', key)
    }
}

function initComputed (Comp) {
    const computed = Comp.options.computed
    for (const key in computed) {
        // defineComputed(Comp.prototype, key, computed[key])
    }
}