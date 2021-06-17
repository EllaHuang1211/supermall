<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img :src="item.show.img" alt="" @load="itemImgLoad">
    <div class="goods-info">
      <p class="title">{{item.title}}</p>
      <span class="price">{{item.price}}</span>
      <span class="collect">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GoodsListItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    itemImgLoad() {
      this.$bus.$emit('itemImgLoad')
    },
    goodsItemClick() {
      this.$router.push('/detail/' + this.item.iid)
    }
  }
}
</script>

<style>
  .goods-list-item {
    width: 48%;
    font-size: 16px;
  }
  .goods-list-item img {
    width: 100%;
    border-radius: 8px;
  }
  .goods-list-item .goods-info {
    height: 40px;
    text-align: center;
  }
  .goods-list-item .goods-info .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goods-list-item .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-list-item .goods-info .collect::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
    vertical-align: baseline;
  }
</style>