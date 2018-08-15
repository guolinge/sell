// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Goods from 'components/goods/Goods'
import Seller from 'components/seller/Seller'
import Ratings from 'components/ratings/Ratings'
import './common/sass/index.scss'
import './common/sass/icon.css'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false
const routes = [
  { path: '/goods', component: Goods },
  { path: '/seller', component: Seller },
  { path: '/ratings', component: Ratings }
]
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: 'history'
})
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  data: {
    eventHub: new Vue()
  },
  components: { App },
  template: '<App/>'
})
router.push({ path: '/goods' })
