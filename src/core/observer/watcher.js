import { parsePath } from '../util/index'
import { traverse } from './traverse'

export default class Watcher {
    constructor(vm, expOrFn, cb, options) {
        this.vm = vm
        if (options) {
            this.deep = !!options.deep
        } else {
            this.deep = false
        }
        this.deps = []
        this.depIds = new Set()
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            this.getter = parsePath(expOrFn)
        }
        this.cb = cb
        this.value = this.get()
    }

    get () {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        if (this.deep) {
            traverse(value)
        }
        window.target = null
        return value
    }

    addDep (dep) {
        const id = dep.id
        if (!this.depIds.has(id)) {
            this.depIds.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }

    update () {
        const oldVal = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, this.oldVal)
    }

    teardown () {
        let i = this.deps.length
        while (i--) {
            this.deps[i].removeSub(this)
        }
    }
}
