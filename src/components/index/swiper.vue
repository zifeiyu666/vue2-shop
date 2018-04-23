<template lang="html">
  <div v-if='swiperData ? true : false'>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="k in swiperData" :key="k.id">
        <router-link :to="{ path: '/show/itemnav', params: { id: k.id }}">
          <img :src="k.imgurl">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
  </div>
  
</template>

<script>
export default {
  props:['swiperData']
}
</script>

<style lang="less">

.swiper-container .mint-swipe {
  width: 100%;
  height:80vw !important;
  a,img {
    display: block;
    width: 100%;
    height:100%;
  }
}
</style>
