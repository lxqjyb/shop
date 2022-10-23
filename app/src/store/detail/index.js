import {reqGetGoodsInfo,reqAddOrUpdateShopCart} from '@/api';
import { getUUID } from '@/utils/uuid_token';

const state = {
    goodsInfo:{},
    uuid_token:getUUID()
};

const actions = {
    async getGoodsInfo({commit},skuId){
        let result=await reqGetGoodsInfo(skuId)
        if(result.code===200){
            commit('GETGOODSINFO',result.data)
        }
    },
    // 将产品添加到购物车中(传的产品id和最终量) || 修改购物车中的产品数量(传的是产品id和变化的量)
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        // 服务器加入购物车成功
        if(result.code===200){
            return 'ok'
        }else{
        // 服务器加入购物车失败
            return Promise.reject(new Error('fail'))
        }
    }
}

const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo=goodsInfo;
    }
}

const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {};
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || [];
    }
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}