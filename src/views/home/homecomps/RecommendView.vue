<template>
  <ul id="home-recommend">
    <li v-for="item in recommends" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  #home-recommend {
    width: 100%;
    display: flex;
    padding-top: 3%;
    padding-bottom: 4%;
    border-bottom: 8px solid rgb(240, 237, 237);
  }
  #home-recommend li {
    list-style: none;
    width: 25%;
    font-size: 12px;
    text-align: center;
  }
  #home-recommend li img {
    width: 80%;
  }
</style>