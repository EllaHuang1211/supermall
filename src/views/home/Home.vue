<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" class="home-banner"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <this-week-popular></this-week-popular>
    <tab-control :tabTitles="tabTitles" class="tab-control" @itemClick="tabControlClick"></tab-control>
    <goods-list :list="goodsList[goodsShowType].list"></goods-list>
  </div>
</template>

<script>
import {getHomeMultidata, getHomeGoodsList} from 'network/home.js'

import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './homecomps/HomeSwiper.vue'
import RecommendView from './homecomps/RecommendView.vue'
import ThisWeekPopular from './homecomps/ThisWeekPopular.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goodslist/GoodsList.vue'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      tabTitles: ['流行','新款','精选'],
      goodsList: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      goodsShowType: 'pop'
    }
  },
  methods: {
    tabControlClick(index) {
      switch(index) {
        case 0: this.goodsShowType = 'pop'; break;
        case 1: this.goodsShowType = 'new'; break;
        case 2: this.goodsShowType = 'sell'
      }
    },
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoodsList(type) {
      let page = this.goodsList[type].page + 1
      getHomeGoodsList(type, page).then(res => {
      this.goodsList[type].list.push(...res.data.list)
      console.log(this.goodsList[type].list)
    })
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    ThisWeekPopular,
    TabControl,
    GoodsList

  },
  created(){
    // 网络请求相关
    this.getHomeMultidata()
    this.getHomeGoodsList('pop')
    this.getHomeGoodsList('new')
    this.getHomeGoodsList('sell')
    
  }
}
</script>

<style>
  #home .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  #home .home-banner {
    margin-top: 44px;
  }
  #home .tab-control {
    margin-top: 10px;
    position: sticky;
    top: 44px;
  }
</style>