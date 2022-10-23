// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store'

Vue.use(VueRouter);

// 解决错误：2046 Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/search/123?k=123".
const originPush = VueRouter.prototype.push;//先把原始的push方法保存起来
const originReplace = VueRouter.prototype.replace;//先把原始的replace方法保存起来

// 重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

// 重写replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

const router = new VueRouter({
    routes,
    // 设置路由跳转的之后，滚动条的位置
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    }
})

export default router;

router.beforeEach(async (to,from,next)=>{
    let token=store.state.user.token;
    let name=store.state.user.userInfo.name;
    // 如果有token，代表已经登录了
    if(token){
        //  用户已经登录了不能再去登录，停留在首页
        if(to.path==='/login'){
            next('\home');
        }else{
            // 登录了去的不是login页，如果用户名已有
            if(name){
                next();
            }else{
                // 没有用户信息，就派发action获取用户信息并存储再跳转
                try {
                    await store.dispatch('user/getUserInfo')
                    next();
                } catch (error) {
                    // token失效了，获取不到用户信息，重新登录
                    // 清除token
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录:不能去交易、支付、个人中心相关的路由
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 未登录情况下，将想去而没有去成的地方，存储于地址栏中（路由）
            next('/login?redirect='+ toPath);
        }else{
            next();
        }
    }

})