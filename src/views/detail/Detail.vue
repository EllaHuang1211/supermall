<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" ref="detailNavBar" @navItemClick='navItemClick'></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" @detailScroll='detailScroll' :probeType='probeType'>
      <detail-swiper :topImages='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shopInfo'></detail-shop-info>  
      <detail-goods-info :detailInfo='detailInfo' @detailImageLoad='detailImageLoad'></detail-goods-info>
      <detail-param-info :paramInfo='paramInfo' ref="param"></detail-param-info>
      <detail-comment-info :commentInfo='commentInfo' ref="comment"></detail-comment-info>
      <goods-list :list='recommendList' ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
    <back-top @click.native="backTopClick" class="back-top-button" v-show="isShowBackTop"></back-top>
    <toast ref="toast"></toast>
  </div>
</template>

<script>
import {getDetailInfo, Goods, Shop, GoodsParam, getRecommendList} from 'network/detail.js'
import {itemImgLoadMixin, backTopMixin} from 'common/mixin.js'

import Scroll from 'components/common/scroll/Scroll.vue'

import DetailNavBar from './detailcomps/DetailNavBar.vue'
import DetailSwiper from './detailcomps/DetailSwiper.vue'
import DetailBaseInfo from './detailcomps/DetailBaseInfo.vue'
import DetailShopInfo from './detailcomps/DetailShopInfo.vue'
import DetailGoodsInfo from './detailcomps/DetailGoodsInfo.vue'
import DetailParamInfo from './detailcomps/DetailParamInfo.vue'
import DetailCommentInfo from './detailcomps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goodslist/GoodsList.vue'
import DetailBottomBar from './detailcomps/DetailBottomBar.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import Toast from 'components/common/toast/Toast.vue'

export default {
  name: 'Detail',
  components: {
    Scroll,
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  data() {
    return {
      iid: null,
      probeType: 3,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      itemImgLoad: null,
      moduleHeight: []
    }
  },
  mixins: [itemImgLoadMixin, backTopMixin],
  methods: {
    detailImageLoad() {
      this.$refs.scroll.refresh()
      //确定不同模块的高度，详情图片加载完后才能获取
      this.moduleHeight[0] = 0
      this.moduleHeight[1] = this.$refs.param.$el.offsetTop
      this.moduleHeight[2] = this.$refs.comment.$el.offsetTop
      this.moduleHeight[3] = this.$refs.recommend.$el.offsetTop
      // console.log(this.moduleHeight)
    },
    navItemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.moduleHeight[index], 200)
      // console.log(this.moduleHeight[index])
    },
    //根据页面所处内容切换detailNavBar的样式
    detailScroll(y) {
      let length = this.moduleHeight.length
      for(let i = length-1; i>=0; i--) {
        if(-y >= this.moduleHeight[i]) {
          this.$refs.detailNavBar.currentIndex = i
          break
        }
      }
      this.setIsShowBackTop(y)
    },
    addToCart() {
      const addGood = {
        iid: this.iid,
        img: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.realPrice,
        checked: true
      }
      this.$store.dispatch('addToCart',addGood)

      this.$refs.toast.showToast('商品已添加至购物车', 1000)
    }
  },
  created() {
    //保存当前详情信息的iid
    this.iid = this.$route.params.iid
    //网络请求此iid的数据
    getDetailInfo(this.iid).then(res => {
      console.log(res)
      let result = res.result
      //保存详情页轮播图数据
      this.topImages = result.itemInfo.topImages
      //保存详情页BaseInfo数据
      this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
      //保存详情页ShopInfo数据
      this.shopInfo = new Shop(result.shopInfo)
      //保存详情页detailInfo数据
      this.detailInfo = result.detailInfo
      //保存详情页paramInfo数据
      this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule)
      //保存详情页commentInfo数据
      if(result.rate.list) {
        this.commentInfo = result.rate.list[0]
      }
    })
    getRecommendList().then(res => {
      //保存recommendList数据
      // console.log(res.data.list)
      this.recommendList = res.data.list
    })
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgLoad)
  },
}
</script>

<style scoped>
.detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-nav-bar {
  position: relative;
  z-index: 10;
  background: #fff;
}
.detail-scroll {
  height: calc(100% - 44px - 58px);
  position: relative;
  /* position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0; */
}
.back-top-button {
    position: fixed;
    right: 8px;
    bottom: 60px;
    z-index: 999;
  }
</style>