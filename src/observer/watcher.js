import { parsePath } from '../util/index'

export default class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }

    get () {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = null
        return value
    }

    update () {
        const oldVal = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, this.oldVal)
    }
}
