<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :tabTitles="tabTitles"
      class="tab-control-top"
      ref="tabControl1"
      @itemClick="tabControlClick"
      v-show="isTabControlFixed">
    </tab-control>
    <scroll class="content"
     ref="scroll"
     :probeType='probeType'
     :pullUpLoad='pullUpLoad'
     @homeScroll='homeScroll'
     @pullingUp='loadMore'>
      <home-swiper :banners="banners" class="home-banner" @swiperImgLoad='swiperImgLoad'></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <this-week-popular></this-week-popular>
      <tab-control :tabTitles="tabTitles"
       class="tab-control"
       @itemClick="tabControlClick"
       ref="tabControl2"></tab-control>
      <goods-list :list="goodsList[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" class="back-top-button" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import {getHomeMultidata, getHomeGoodsList} from 'network/home.js'
import {itemImgLoadMixin, backTopMixin} from 'common/mixin.js'

// import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './homecomps/HomeSwiper.vue'
import RecommendView from './homecomps/RecommendView.vue'
import ThisWeekPopular from './homecomps/ThisWeekPopular.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goodslist/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

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
      currentType: 'pop',
      bs: null,
      // isShowBackTop: false,
      probeType: 3,
      pullUpLoad: true,
      tabControlOffSetTop: 0,
      isTabControlFixed: false,
      homeItemImgLoad: null
    }
  },
  mixins: [itemImgLoadMixin, backTopMixin],
  created(){
    // 网络请求相关
    this.getHomeMultidata()
    this.getHomeGoodsList('pop')
    this.getHomeGoodsList('new')
    this.getHomeGoodsList('sell')
  },
  deactivated() {
    this.$bus.$off('itemImgLoad', this.itemImgLoad)
  },
  methods: {
    tabControlClick(index) {
      switch(index) {
        case 0: this.currentType = 'pop'; break;
        case 1: this.currentType = 'new'; break;
        case 2: this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      console.log(this.banners)
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoodsList(type) {
      let page = this.goodsList[type].page + 1
      getHomeGoodsList(type, page).then(res => {
        this.goodsList[type].list.push(...res.data.list)
        this.goodsList[type].page += 1
        //每次请求完数据后要finishPullUp
        this.$refs.scroll.finishPullUp()
      })
    },
    homeScroll(y) {
      //判断是否显示backTop按钮
      this.setIsShowBackTop(y)
      // this.isShowBackTop = (-y > 1000)
      //判断tabControl是否吸顶
      this.isTabControlFixed = (-y >= this.tabControlOffSetTop)

    },
    // backTopClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 500)
    // },
    loadMore() {
      this.getHomeGoodsList(this.currentType)
    },
    swiperImgLoad() {
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      this.tabControlOffSetTop = this.$refs.tabControl2.$el.offsetTop
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    ThisWeekPopular,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-control-top {
    position: relative;
    z-index: 999;
    top: -1px;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; 
    overflow: hidden;
  }
  .back-top-button {
    position: fixed;
    right: 8px;
    bottom: 50px;
    z-index: 999;
  }
</style>