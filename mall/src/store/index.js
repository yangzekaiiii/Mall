import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import api from "../assets/config/api";
export default new Vuex.Store({
    state: {
        cartTotal: {
            checkedGoodsAmount: 0,
            checkedGoodsCount: 0,
            goodsAmount: 0,
            goodsCount: 0,
        },
        cartList: []
    },
    mutations: {
        setCarList: function(state, cartList) {
            state.cartList = cartList
        },
        setCartTotal: function(state, cartTotal) {
            state.cartTotal = cartTotal
        }
    },
    actions: {
        AjaxCart: async function(content) {
            let cartRes = await axios.get(api.CartList)
            console.log(cartRes.data)
            content.commit("setCarList", cartRes.data.data.cartList)
            content.commit("setCartTotal", cartRes.data.data.cartTotal)
        }
    },
    modules: {}
})