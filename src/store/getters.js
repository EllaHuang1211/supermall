const getters = {
  getCartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList 
  },
  checkedCount(state) {
    return state.cartList.filter(item => item.checked).length
  }
}

export default getters