import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

import store from '@/store';

// 第一个参数：全局组件的名字 第二个参数：哪个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);

// 引入MockServer.js-----mock数据
import '@/mock/mockServer';
import 'swiper/css/swiper.css';
import * as API from '@/api';
import { MessageBox } from 'element-ui';
import VueLazyload from 'vue-lazyload';
// 引入懒加载
import lazytu from '@/assets/1.gif';
// 引入用于表单验证的插件
import '@/plugins/validate';

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 应用懒加载，并给插件的install函数传递配置对象
Vue.use(VueLazyload,{
  loading: lazytu,
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this,
    Vue.prototype.$API=API
  },
  // 注册路由信息：当这里书写router的时候，组件身上就都拥有了$route和$router属性
  router,
  // 注册仓库：组件实例对象身上就都有了$store属性
  store
}).$mount('#app')
