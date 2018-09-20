<template lang="html">
  <section class="section1" v-if='section1'>
    <h1 class="section1-title">
      <!-- <img class='icon' src="../../assets/img/dandu.png" alt=""> -->
      限时抢购
      <span class="right" @click='goAll(4)'>产看更多></span>
    </h1>
    <ul class="section1-list">
      <li v-for="k in section1">
        <router-link :to="{path:'/shop/detail', query:{pid: k.id}}" :key="k.id">
          <img v-lazy="k.imgurl[0]" alt="">
          <p>{{k.intro}}</p>
        </router-link>
        <h3>{{k.title}}</h3>
        <span>￥ {{k.price}}</span>
      </li>
    </ul>
  <!-- <router-link :to="{ name: '详情页'}"  class="section1-banner">
    <img :src="banner.imgurl" v-if='banner'>
  </router-link> -->
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';

export default {
  props:['section1', 'banner'],
  methods: {
    goAll(id) {
      this.$router.push({path: '/shop/all', query: {id: id}})
    }
  }
}

</script>

<style lang="less" scoped>
   @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  .product-img{
    height: 120px;
  }
  .section1 {
    width: 100%;
    overflow: hidden;
    margin-top: 6px !important;
    background: #fff;
    .section1-title {
      .bt();
      text-align: left;
      padding: 10px;
      font-size: 14px;
      position: relative;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      margin-bottom: 16px;
      color: #333;
      .icon{
        width: 20px;
        position: relative;
        top: 2px;
        margin-right: 5px;
      }
      .right {
        font-size: 12px;
        color: #71777d;
        float: right;
      }
    }

    .section1-list {
      width: 100%;
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: left;
          -ms-flex-pack: left;
              justify-content: left;
      -ms-flex-wrap: wrap;
          flex-wrap: wrap;
      overflow: hidden;
      li {
        width: 50%;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        padding:0 3vw;
        >a {
          display: block;
          width: 100%;
          position: relative;
          img {
            display: block;
            width: 100%;
            // border-top-left-radius: 6px; 
            // border-top-right-radius: 6px; 
            border-radius: 4px;
          }
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: rgba(0,0,0,.5);
            color: #fff;
            -webkit-box-sizing: border-box;
                    box-sizing: border-box;
            padding:1.2vw 2vw;
          }
        }

        >h3{
          font-size: 14px;
          padding-top: 6px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          height: 40px;
        }
        >span {
          display: inline-block;
          padding-bottom: 6px;
          color: @fontRed;
          font-size: 18px;
        }
      }
    }

    .section1-banner {
      width: 100%;
      display: block;
      img {
        display: block;
        width: 100%;
      }
    }
  }
</style>
