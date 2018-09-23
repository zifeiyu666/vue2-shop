<template lang="html" >
    
    <div v-if='swiperData ? true : false'>
      <mt-swipe :auto="4000" >
        <mt-swipe-item v-for="(k, i) in swiperData" :key="k.id + i">
          <router-link :to="{ path: '/show/itemnav', params: { id: k.id }}">
            <img v-lazy="k.imgurl">
            <p class='title'>{{k.title}}</p>
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>

</template>

<script>
export default {

  props:{
    swiperData: {
      required: true
    }
  },
  mounted() {
    
  }

}
</script>

<style lang="less" scoped>
@import '../../assets/utils.less';
.mint-swipe {
  width: 100%;
  height:50vw;
  positioon: relative;
  a,img {
    display: block;
    width: 100%;
    height:100%;
  }
  .title{
    position: absolute;
    z-index: 1000;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    color: #ccc;
    width: 100%;
    padding: 2px 4px;
    font-size: 12px;
    .elipsis();
  }
}
</style>
