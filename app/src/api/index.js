// 当前这个模块：API进行统一管理

import requests from "./request";
import mockRequest from './mockRequest';
import { get, method } from "lodash";

// 三级联动的接口
// 地址：/api/product/getBaseCategoryList get 无参数

export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    });
}

// 获取ListContainer里的banner轮播图数据
export const reqGetBannerList = () => {
    return mockRequest.get('/banner');
}

// 获取floor数据
export const reqGetFloorList = () => {
    return mockRequest.get('/floor');
}

// 获取search模块数据
export const reqGetSearchInfo = (params) =>{
    return requests({
        url:"/list",
        method:'post',
        data:params
    })
}

// 获取产品详细信息的接口
export const reqGetGoodsInfo = (skuId) =>{
    return requests({
        url:`/item/${ skuId }`,
        method:'get'
    })
}

// 将产品添加到购物车中时，向服务器发请求，服务器存储加入购物车的产品数据 
//  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>{
    return requests({
        url:`/cart/addToCart/${ skuId }/${ skuNum }`,
        method:'post'
    })
}

// 请求获取个人购物车列表数据  /api/cart/cartList
export const reqCartList=()=>{
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}

// 删除购物车某个产品的接口  /api/cart/deleteCart/{skuId}
export const reqDeleteCartById=(skuId)=>{
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}

// 切换购物车某个商品的选中状态  /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById=(skuId,isChecked)=>{
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

// 获取验证码接口  /api/user/passport/sendCode/phone
export const reqGetCode=(phone)=>{
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

// 注册接口 /api/user/passport/register
export const reqUserRegister=(data)=>{
    return requests({
        url:'/user/passport/register',
        method:'post',
        data
    })
}

// 登录接口  /api/user/passport/login
export const reqUserLogin=(data)=>{
    return requests({
        url:'/user/passport/login',
        method:'post',
        data
    })
}

// 获取用户信息【需要带着用户的token向服务器要用户信息】
// /api/user/passport/auth/getUserInfo
export const reqUserInfo=()=>{
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}

// 退出登录   /api/user/passport/logout
export const reqLogout=()=>{
    return requests({
        url:'/user/passport/logout',
        method:'get'
    })
}

// 获取用户地址信息  /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo=()=>{
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

// 获取商品清单，这个接口出问题了！！
export const reqOrderInfo=()=>{
    return requests({
        url:'/order/auth/trade',
        method:'get'
    })
}

// 提交订单接口 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder=(tradeNo,data)=>{
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data
    })
}

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId} 
export const reqPayInfo=(orderId)=>{
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

// 获取支付订单的状态  /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayState=(orderId)=>{
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}


// 获取个人中心的数据  /api/order/auth/{page}/{limit}
export const reqMyOrder=(page,limit)=>{
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}
