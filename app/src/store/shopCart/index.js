import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api'

const state = {
    cartList:[]
}

const actions = {
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code===200){
            commit('GETCARTLIST',result.data)
        }
    },
    async deleteCart({commit},skuId){
        let result =await reqDeleteCartById(skuId)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new error('fail'))
        }
    },
    async updateChecked({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new error('fail'))
        }
    },
    deleteAllChecked(context){
        let promiseAll=[];
        context.getters.cartList.cartInfoList.forEach((item)=>{
           let promise = item.isChecked?context.dispatch('deleteCart',item.skuId):''
           promiseAll.push(promise);
        })
        return Promise.all(promiseAll);
    },
    updateAllCartIsChecked(context,isChecked){
        let promiseAll=[];
        context.getters.cartList.cartInfoList.forEach((item)=>{
            let promise = context.dispatch('updateChecked',{skuId:item.skuId,isChecked})
            promiseAll.push(promise);
        })
        return Promise.all(promiseAll);
    }
}

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList=cartList;
    }
} 

const getters = {
    cartList(){
        return state.cartList[0] || {}
    }
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}