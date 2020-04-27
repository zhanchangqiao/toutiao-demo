import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { ElementTiptapPlugin } from 'element-tiptap'
import 'element-tiptap/lib/index.css'
Vue.use(ElementTiptapPlugin, {
  lang: 'zh'
})
// import axios from 'axios'
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
