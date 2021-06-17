<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'

	export default {
		name: "HomeSwiper",
    data() {
      return {
        isImgLoad: false
      }
    },
    components: {
		  Swiper,
      SwiperItem
    },
    props: {
		  banners: {
		    type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      swiperImgLoad() {
        if(!this.isImgLoad){
          this.$emit('swiperImgLoad')
          this.isImgLoad = true
        }
        
      }
    }
	}
</script>

<style>

</style>