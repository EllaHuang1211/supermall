<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages='topImages'></detail-swiper>
    <detail-base-info :goods='goods'></detail-base-info>
    <detail-shop-info :shop='shopInfo'></detail-shop-info>
  </div>
</template>

<script>
import {getDetailInfo, Goods, Shop} from 'network/detail.js'

import DetailNavBar from './detailcomps/DetailNavBar.vue'
import DetailSwiper from './detailcomps/DetailSwiper.vue'
import DetailBaseInfo from './detailcomps/DetailBaseInfo.vue'
import DetailShopInfo from './detailcomps/DetailShopInfo.vue'

export default {
  name: 'Detail',
  components: {
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {}
    }
  },
  methods: {
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
    })
  }
}
</script>

<style scoped>
</style>