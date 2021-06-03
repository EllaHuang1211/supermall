<template>
<div>
  <tab-bar>
    <tab-bar-item path='/home'>
      <img slot="notActiveImg" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="activeImg" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="itemName">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="notActiveImg" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="activeImg" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="itemName">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcart">
      <img slot="notActiveImg" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="activeImg" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="itemName">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="notActiveImg" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="activeImg" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="itemName">我的</div>
    </tab-bar-item>
  </tab-bar>
</div>
</template>

<script>
import TabBar from 'components/common/tabbar/tabbar'
import TabBarItem from 'components/common/tabbar/tabbaritem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>