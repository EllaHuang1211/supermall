<template>
  <div id="tab-control">
    <div v-for="(item, index) in tabTitles" :key="item.id" class="tab-control-item"
          :class="{isActive: currentIndex === index}" @click="itemClick(index)">
        <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    tabTitles: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('itemClick',index)
    }
  }
}
</script>

<style>
  #tab-control {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    text-align: center;
    font-size: 16px;
    background-color: #fff;
  }
  #tab-control .tab-control-item {
    flex: 1;
  }
  .isActive span {
    color: var(--color-high-text);
    padding: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>