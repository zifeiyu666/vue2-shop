<template lang="html">
  <section class="section4" >
    <h2 class="section4-title">
      <img src="../../assets/img/quanyika.png" alt="" class="icon">
      权益卡类
      <i class="icon-right" @click='goAll(2)'></i>
    </h2>
    <ul class="section4-list" v-if="section4">
      <li v-for="k in section4">
        <router-link :to="{path:'/shop/detail', query:{pid: k.id}}" :key="k.id">
          <img class='product-img' v-lazy="k.imgurl[0]">
          <p>{{k.intro}}</p>
        </router-link>
        <h3>{{k.title}}</h3>
        <span>￥ {{k.price}} <span class='fxicon' v-if='k.gwfx && k.gwfx != 0'><i>返</i>￥{{k.gwfx}}</span></span>
      </li>

    </ul>
    <!-- <router-link :to="{name:'分类页'}" class="section4-banner">
      <img :src="banner.imgurl" v-if='banner'>
    </router-link> -->
  </section>
</template>

<script>
  import { Lazyload } from 'mint-ui';
  export default {
    props:['section4','banner'],
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
  .fxicon{
    margin-left: 10px;
    padding-right: 5px;
    color: #999;
    i{
      background: @fontRed;
      color: #fff;
      // padding: 4px;
      text-align: center;
      line-height: 20px;
      display: inline-block;
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      border-radius: 10px;
    }
    font-size: 12px;
  }
  .section4 {
    width: 100%;
    overflow: hidden;
    padding-top: 6px !important;
    .pt();
    .section4-title {
      .bt();
      text-align: left;
      .fz(font-size, 34);
      padding: 4vw 6vw;
      position: relative;
      background-color: #fff;
      color: #333;
      .icon{
        width: 20px;
        height: 24px;
        position: relative;
        top: 6px;
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
      // margin-top: 6vw;
      background: #fff;
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
            background-color: rgba(0,0,0,.5);
            color: #eee;
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
