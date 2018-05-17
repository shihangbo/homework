import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  all: []
}
const getters = {
  allProducts: state => state.all,
  cartProducts: (state, getters) => (getters.allProducts.filter(p => p.quantity)),
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}
const mutations = {
  setProducts(state, products) {
    state.all = products
  },
  clearCartProducts(state) {
    state.all.forEach(p => {
      p.quantity = 0
    })
  }
}
const actions = {
  getAllProducts({commit}) {
    const res = [
      { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500, 'inventory': 2 },
      { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10, 'inventory': 10 },
      { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 20, 'inventory': 5 }
    ]
    const newRes = res.map(p => Object.assign({}, p, {quantity: 0}))
    console.log(newRes)
    commit('setProducts', newRes)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})