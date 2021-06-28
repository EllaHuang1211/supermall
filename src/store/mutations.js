const mutations = {
  addNum(state, oldGood) {
    oldGood.num++
  },
  addNew(state, payload) {
    payload.num = 1
    state.cartList.push(payload)
  }
}

export default mutations