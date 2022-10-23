// import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/MyOrder';
import GroupOrder from '@/pages/Center/GroupOrder';

export default[
    {
        path:'/home',
        // 使用路由懒加载的方式引入对应组件，更高效
        component:()=>import('@/pages/Home'),
        meta:{isShow:true}
    },
    {
        path:'/search/:keyword?',//加个问号允许不传params参数，可传可不传
        component:Search,
        meta:{isShow:true},
        name:'search'
    },
    {
        path:'/login',
        component:Login,
        meta:{isShow:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{isShow:false}
    },
    {
        path:'/detail/:skuid?',
        component:Detail,
        meta:{isShow:true}
    },
    {
        path:'/AddCartSuccess',
        name:'AddCartSuccess',
        component:AddCartSuccess,
        meta:{isShow:true}
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{isShow:true}
    },
    {
        path:'/trade',
        component:Trade,
        meta:{isShow:true},
        // 路由独享守卫
        beforeEnter(to,from,next){
            if(from.path==='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component:Pay,
        meta:{isShow:true},
        beforeEnter(to,from,next){
            if(from.path==='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{isShow:true}
    },
    {
        path:'/center',
        component:Center,
        meta:{isShow:true},
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path:'/',
        redirect:'/home'
    }
]