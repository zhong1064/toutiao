import Vue from 'vue'
import App from './App.vue'
// 引入路由 并挂载
import router from '@/router/index.js'
// 引入vant
import { Button, Toast, Icon, Uploader, Dialog, Field, Picker, Tab, Tabs, List, PullRefresh, SwipeCell, Search } from 'vant'
Vue.use(Button)
  .use(Toast)
  .use(Icon)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(Picker)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(SwipeCell)
  .use(Search)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
