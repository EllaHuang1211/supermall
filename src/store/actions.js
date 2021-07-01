const actions = {
  addToCart(context, payload) {
    let oldGood = null
    oldGood = context.state.cartList.find(element => element.iid === payload.iid)
    if(oldGood) {
      context.commit('addCount', oldGood)
    }else{
      context.commit('addNew', payload)
    }
  }
}

export default actions