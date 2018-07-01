import Vue from 'vue'
import App from './App.vue'
import router from '@/routers'
import store from '@/vuex/store'
import '@/filters'
/* @if NODE_ENV=='dev' */
import 'vconsole'
/* @endif */

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './locales/en.js'
import zh from './locales/zh.js'
import './assets/style/global.css'
import Cookies from 'js-cookie'

Vue.use(VueI18n)
const messages = {
	en: {
		...enLocale,
		...en
	},
	zh: {
		...zhLocale,
		...zh
	}
}
const i18n = new VueI18n({
    locale: Cookies.get('language') || 'zh',
    messages
})
Vue.use(ElementUI, {
	i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

/* eslint-disable no-new */ 
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: {
        App
    }
})
