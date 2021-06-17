<template>
  <nav-bar>
    <div slot="left" class="left-nav" @click="backPage">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="center-nav">
      <div v-for="(item, index) in navItems" :key="index"
      :class="{isActive: currentIndex === index}"
      @click="navItemClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      navItems: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    navItemClick(index) {
      this.currentIndex = index
    },
    backPage() {
      this.$router.back()
    }
  }
}
</script>

<style>
.left-nav img{
  vertical-align: middle;
}
.center-nav {
  display: flex;
}
.center-nav div {
  flex: 1;
  font-size: 14px;
}
.isActive {
  color: var(--color-high-text)
}

</style>