
import * as types from './mutation_types'

export default {
  [types.SET_PRODUCTS](state, products) {
    state.all = products
  },
  [types.CLEAR_CART_PRODUCTS](state) {
    state.all.forEach(it => {
      it.quantity = 0
    })
  }
}