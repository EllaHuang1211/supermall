const mutations = {
  addCount(state, oldGood) {
    oldGood.count++
  },
  addNew(state, payload) {
    payload.count = 1
    state.cartList.push(payload)
  }
}

export default mutations