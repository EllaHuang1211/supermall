const actions = {
  addToCart(context, payload) {
    let oldGood = null
    oldGood = context.state.cartList.find(element => element.iid === payload.iid)
    if(oldGood) {
      context.commit('addNum', oldGood)
    }else{
      context.commit('addNew', payload)
    }
    console.log(context.state.cartList)
  }
}

export default actions