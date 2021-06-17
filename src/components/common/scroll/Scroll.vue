<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)
BScroll.use(Pullup)

export default {
  name: 'Scroll',
  data() {
    return {
      bs: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    tabControlOffSetTop: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.bs = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.bs.on('scroll', (position) => {
      //监听是否显示backTop
      if(-position.y > 1000){
        this.$emit('scroll',true)
      }else{
        this.$emit('scroll',false)
      }
      //监听tabcontrol是否吸顶
      if(-position.y >= this.tabControlOffSetTop) {
        this.$emit('isTabControlFixed',true)
      }else{
        this.$emit('isTabControlFixed',false)
      }
      })
    }
    //3.监听下拉滚动
    if(this.pullUpLoad){
      this.bs.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
    
  },
  methods: {
    scrollTo(){
      this.bs && this.bs.scrollTo(0, 0, 500)
    },
    finishPullUp() {
      this.bs.finishPullUp()
    },
    refresh() {
      this.bs && this.bs.refresh()
    }
  }
}

</script>

<style>

</style>