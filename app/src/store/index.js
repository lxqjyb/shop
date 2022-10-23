import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';
import search  from './search';
import detail from './detail';
import shopCart from './shopCart';
import user from './user';
import trade from './trade'

Vue.use(Vuex);

export default new Vuex.Store({
    // 实现Vuex仓库模块式开发存储数据
    modules:{
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
})

