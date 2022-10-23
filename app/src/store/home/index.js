// 引入发送请求的函数 
import { reqCategoryList,reqGetBannerList,reqGetFloorList } from '@/api'

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
};

const actions = {
    // 通过api里面的接口函数调用，像服务器发请求，获取服务器的数据
    async categoryList({commit}) {
        const result = await reqCategoryList()
        if(result.code===200){
            commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        const result=await reqGetBannerList()
        if(result.code===200){
            commit('GETBANNERLIST',result.data);
        }
    },
    async getFloorList({commit}){
        const result=await reqGetFloorList()
        if(result.code===200){
            commit('GETFLOORLIST',result.data)
        }
    }
};

const mutations = {
    CATEGORYLIST(state,categoryList){
        categoryList.splice(16,1);
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList;
    }
};

const getters = {

};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};