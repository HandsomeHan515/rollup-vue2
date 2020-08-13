import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { camelize } from './util/index'

initGlobalAPI(Vue)
Vue.version = '__VERSION__'

Vue.camelize = camelize
export default Vue