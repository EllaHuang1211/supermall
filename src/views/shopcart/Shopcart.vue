<template>
  <div class="shopcart">
    <nav-bar class="shopcartNavBar">
      <div slot="center">购物车({{getCartLength}})</div>
    </nav-bar>
    <scroll class="shopcart-scroll" ref="scroll">
      <shopcart-list></shopcart-list>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll.vue'
import ShopcartList from './shopcartcomps/ShopcartList.vue'
import BottomBar from './shopcartcomps/BottomBar.vue'

export default {
  name: 'Shopcart',
  components: {
    NavBar,
    Scroll,
    ShopcartList,
    BottomBar
  },
  computed: {
    ...mapGetters(['getCartLength'])
  },
  //离开页面时刷新，以重新计算scroll的可滚动高度，因为做了缓存，所以不可以在created和mounted中刷新
  deactivated() {
    console.log('deactivated')
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.shopcart {
  height: 100vh;
}
.shopcartNavBar {
  background-color: var(--color-tint);
  color: #fff;
}
.shopcart-scroll {
  height: calc(100% - 44px - 49px - 44px);
  overflow: hidden;
}
</style>