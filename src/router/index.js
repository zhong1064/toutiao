// 引入vue
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由所映射的组件，并配置路由
import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'
import EditPersonal from '@/views/EditPersonal.vue'
import Index from '@/views/Index.vue'
import register from '@/views/register.vue'
import Artdetail from '@/views/artdetail.vue'
import myFollow from '@/views/myFollow.vue'
import Stararticle from '@/views/stararticle.vue'
import Comment from '@/views/comment.vue'
import Search from '@/views/search.vue'
import CateManager from '@/views/cateManager.vue'
// 路由挂载vue
Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    { name: 'Index', path: '/', component: Index },
    { name: 'Login', path: '/login', component: Login },
    { name: 'CateManager', path: '/cateManager', component: CateManager },
    { name: 'Search', path: '/search', component: Search },
    { name: 'myFollow', path: '/myFollow', component: myFollow },
    { name: 'register', path: '/register', component: register },
    { name: 'Comment', path: '/comment/:id', component: Comment },
    { name: 'Stararticle', path: '/stararticle', component: Stararticle },
    {
      name: 'Personal', path: '/personal/:id', component: Personal
    },
    { name: 'EditPersonal', path: '/editpersonal/:id', component: EditPersonal },
    { name: 'Artdetail', path: '/artdetail/:id', component: Artdetail }]
})

// 添加路由前置守卫
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/personal') === 0) {
    let token = localStorage.getItem('toutiao_41_token')
    if (token) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

// 暴露
export default router
