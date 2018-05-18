
import * as types from './mutation_types'

export default {
  getAllProducts({commit}) {
    const res = [
      { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500, 'inventory': 2 },
      { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10, 'inventory': 10 },
      { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 20, 'inventory': 5 }
    ]
    const newRes = res.map(p => Object.assign({}, p, {quantity: 0}))
    commit(types.SET_PRODUCTS, newRes)
  },
  setProducts({commit}, products) {
    commit(types.SET_PRODUCTS, products)
  },
  clearCartProducts({commit}) {
    commit(types.CLEAR_CART_PRODUCTS)
  },
}