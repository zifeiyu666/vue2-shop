<template lang="html">
  <section class="section1" v-if='section1'>
    <h1 class="section1-title">
      <img class='icon' src="../../assets/img/dandu.png" alt="">
      单独类
      <i class="icon-right" @click='goAll(4)'></i>
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
      .fz(font-size, 34);
      padding: 4vw 6vw;
      position: relative;
      background-color: #fff;
      color: #333;
      .icon{
        width: 20px;
        position: relative;
        top: 2px;
        margin-right: 5px;
      }
      .icon-right {
        position: absolute;
        right: 6vw;
        top: 50%;
        .fz(font-size, 36);
        .fz(margin-top,-16);
        &::before {
          color: #9f9f9f;
        }
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
          font-size: 16px;
          padding-top: 3vw;
          color: #333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        >span {
          display: inline-block;
          padding-bottom: 3vw;
          color: #b4282d;
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
