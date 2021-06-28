import {debounce} from 'common/debounce.js'

export const itemImgLoadMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgLoad = () => {refresh()}
    this.$bus.$on('itemImgLoad', this.itemImgLoad)
    // console.log('mixin混入成功')
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    setIsShowBackTop(y) {
      this.isShowBackTop = (-y > 1000)
    }
  }
}