<template>
  <div>
    <shopcart-list-item v-for="(item, index) in $store.state.cartList" :key='index' :itemInfo='item'></shopcart-list-item>
  </div>
</template>

<script>
import ShopcartListItem from './ShopcartListItem.vue'

export default {
  name: 'ShopcartList',
  components: { 
    ShopcartListItem 
  }
}
</script>

<style>

</style>