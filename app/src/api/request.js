// 对于axios进行二次封装
import axios from "axios";
// 引入进度条，start方法：进度条开始；done方法:进度条结束
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";

import store from "@/store";

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.requests就是axios实例，只不过稍微配置一下
const requests=axios.create({
    // 配置对象
    // 基础路径，发送请求的时候，路径中会出现api
    baseURL:"/api",
    // 代表请求超过5s没有数据返回，则取消请求
    timeout:5000
});

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    if(store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token
    }
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    nprogress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    // 响应成功的回调
    nprogress.done();
    return res.data;
},(error)=>{
    // 响应失败的回调,返回失败的promise对象，失败的值是new Error('fail')，Error实例
    return Promise.reject(new Error('fail'));
});

// 对外暴露
export default requests;