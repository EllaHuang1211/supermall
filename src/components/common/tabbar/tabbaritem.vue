<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="notActiveImg"></slot></div>
    <div v-else><slot name="activeImg"></slot></div>
    <div :style="activeStyle"><slot name="itemName"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  // data(){
  //   return {
  //     isActive: true
  //   }
  // },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'pink'
    }
  },
  computed: {
    isActive() {
      return this.$route.path == this.path
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
  .tab-bar-item{
    flex: 1;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>