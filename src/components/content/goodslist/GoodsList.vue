<template>
  <div id="goods-list">
    <goods-list-item v-for="(item, index) in list" :key="index" :item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: 'GoodsList',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: { 
    GoodsListItem 
  }
}
</script>

<style>
  #goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>