import {reqAddressInfo,reqOrderInfo} from '@/api'

const state = {
    address:[],
    orderInfo:{}
}

const mutations = {
    GETASSRESSINFO(state,address){
        state.address=address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }
}

const actions = {
    async getAddressInfo({commit}){
        let result = await reqAddressInfo()
        if(result.code===200){
            commit('GETASSRESSINFO',result.data)
        }
    },
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code===200){
            commit('GETORDERINFO',result.data)
        }
    }
}

const getters = {

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}