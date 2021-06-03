<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import {getHomeMultidata} from 'network/home.js'
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './homecomps/HomeSwiper.vue'
import RecommendView from './homecomps/RecommendView.vue'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView

  },
  created(){
    // 网络请求相关
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      console.log(res)
    })
  }
}
</script>

<style>
  #home .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>