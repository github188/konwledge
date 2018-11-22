import Vue from 'vue'
import methods from './methods'
import directive from './directive'
import FillContent from '../../components/content/FillContent'
import {Dialog} from '../../components/common'

Vue.use(methods)
Vue.use(directive)
Vue.use(FillContent)
Vue.use(Dialog)