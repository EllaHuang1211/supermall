<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll">
      <detail-swiper :topImages='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shopInfo'></detail-shop-info>  
      <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :paramInfo='paramInfo'></detail-param-info>
      <detail-comment-info :commentInfo='commentInfo'></detail-comment-info>
      <goods-list :list='recommendList'></goods-list>
    </scroll>
  </div>
</template>

<script>
import {getDetailInfo, Goods, Shop, GoodsParam, getRecommendList} from 'network/detail.js'

import Scroll from 'components/common/scroll/Scroll.vue'

import DetailNavBar from './detailcomps/DetailNavBar.vue'
import DetailSwiper from './detailcomps/DetailSwiper.vue'
import DetailBaseInfo from './detailcomps/DetailBaseInfo.vue'
import DetailShopInfo from './detailcomps/DetailShopInfo.vue'
import DetailGoodsInfo from './detailcomps/DetailGoodsInfo.vue'
import DetailParamInfo from './detailcomps/DetailParamInfo.vue'
import DetailCommentInfo from './detailcomps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goodslist/GoodsList.vue'

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
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: []
    }
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
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
      console.log(res.data.list)
      this.recommendList = res.data.list
    })
  }
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
  height: calc(100% - 44px);
  /* position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0; */
}
</style>