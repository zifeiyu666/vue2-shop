<template lang="html">
  <section class="section4" >
    <h2 class="section4-title">
      权益卡类
      <i class="icon-right"></i>
    </h2>
    <ul class="section4-list" v-if="section4">
      <li v-for="k in section4">
        <router-link :to="{path:'/shop/detail', query:{pid: k.id}}" :key="k.id">
          <img class='product-img' v-lazy="k.imgurl[0]">
          <p>{{k.intro}}</p>
        </router-link>
        <h3>{{k.title}}</h3>
        <span>￥ {{k.price}}</span>
      </li>

    </ul>
    <router-link :to="{name:'分类页'}" class="section4-banner">
      <img :src="banner.imgurl" v-if='banner'>
    </router-link>
  </section>
</template>

<script>
  import { Lazyload } from 'mint-ui';
  export default {
    props:['section4','banner']
  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  .product-img{
    height: 120px;
  }
  .section4 {
    width: 100%;
    overflow: hidden;
    .pt();
    .section4-title {
      .bt();
      text-align: center;
      .fz(font-size, 40);
      padding: 4vw 0;
      position: relative;
      background-color: #ffffff;
      i {
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

    .section4-list {
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
          }
          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: gold;
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

    .section4-banner {
      width: 100%;
      display: block;
      img {
        display: block;
        width: 100%;
      }
    }
  }
</style>
