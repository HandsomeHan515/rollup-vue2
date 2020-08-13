import { isUndef } from "../../util/index"

function normalizeEvent (name) {
    const passive = name.charAt(0) === '&'
    name = passive ? name.slice(1) : name
    const once = name.charAt(0) === '~' // Prefixed last, checked first
    name = once ? name.slice(1) : name
    const capture = name.charAt(0) === '!'
    name = capture ? name.slice(1) : name
    return {
        name,
        once,
        capture,
        passive
    }
}

export function updateListeners (on, oldOn, add, remove, vm) {
    let name, cur, old, event
    for (name in on) {
        cur = on[name]
        old = oldOn[name]
        event = normalizeEvent(name)
        if (isUndef(cur)) {
            // warn()
        } else if (isUndef(old)) {
            if (isUndef(cur.fns)) {
                cur = on[name] = createFnInvoker(cur)
            }
            add(event.name, cur, event.capture, event.passive, event.params)
        } else if (old !== cur) {
            old.fns = cur
            on[name] = old
        }
    }
    for (name in oldOn) {
        if (isUndef(on[name])) {
            event = normalizeEvent(name)
            remove(event.name, oldOn[name], event.capture)
        }
    }
}