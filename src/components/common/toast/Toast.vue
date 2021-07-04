<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      isShow: false,
      message: ''
    }
  },
  methods: {
    showToast(msg = '默认提示', duration = 1500) {
      this.isShow = true
      this.message = msg
      setTimeout(() => {
        this.isShow = false
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
}
</style>