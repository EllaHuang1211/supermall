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
        if(this.$route.path.indexOf('/home') !== -1) {
          this.$emit('homeScroll', position.y)
        }else if(this.$route.path.indexOf('/detail') !== -1) {
          this.$emit('detailScroll', position.y)
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
    scrollTo(x, y, duration){
      this.bs && this.bs.scrollTo(x, y, duration)
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