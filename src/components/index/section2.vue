<template>
  <section class="section2" v-if='section2'>
    <h1 class="section1-title">
        <img src="../../assets/img/lvyou.png" alt="" class="icon">
        旅游打包类
        <i class="icon-right" @click='goAll(3)'></i>
      </h1>
    <div class="section2-list">
      
      <ul>
        <li v-for="k in section2" :key="k.id">
          <router-link :to="{path:'/shop/detail', query:{pid: k.id}}">
            <img class='product-img' v-lazy="k.imgurl[0]">
          </router-link>
          <h2 class="section2-list-title ac">
            {{k.title}}
          </h2>
          <p class="section2-list-intro">
            {{k.intro}}
          </p>
          <p class="section2-list-price">
            ￥{{k.price}}
             <span class='fxicon' v-if='k.gwfx && k.gwfx != 0'><i>返</i>￥{{k.gwfx}}</span>
          </p>
        </li>
      </ul>
    </div>
    <!-- <router-link class="section2-banner" :to="{name:'详情页'}">
      <img :src="banner.imgurl" v-if='banner'>
    </router-link> -->
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';

  export default {
    props:['section2', 'banner'],
    methods: {
      goAll(id) {
        this.$router.push({path: '/shop/all', query: {id: id}})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
   @import '../../assets/utils.less';
  @import '../../assets/index/style.css';
  .product-img{
    height: 120px;
  }
  .fxicon{
    margin-left: 0px;
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
  .section1-title{
    .bt();
    // .pt();
    margin-top: 6px;
    background: #fff!important;
    margin-bottom: 0px !important;
  }
  .section2-list {
    overflow-x: auto;
    width: 100%;
    // margin-top: 6vw;
    background: #fff;
    // .pt();
    /*原生滑动*/
    -webkit-overflow-scrolling: touch;
    >ul {
      // .bt();
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding: 1vw 6vw 3vw 6vw;
      width: 380%;
      li {
        margin-right: 10vw;
        width: 35vw;
        a,
        img {
          display: block;
          width: 100%;
          border-radius: 4px;
        }

        h2,
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        h2 {
          font-size: 14px;
          padding-top: 3vw;
          color: #333;
          text-align: left !important;
        }

        p.section2-list-intro {
          padding-top: 2px;
          .fz(font-size, 26);
          color: rgb(150, 150, 150);
        }

        p.section2-list-price {
          font-size: 18px;
          font-weight: bold;
          color: @fontRed;
        }
      }
    }



  }

  .section2-banner {
    display: block;
    width: 100vw;
    img {
      display: block;
      // height: 24vw;
      width: 100%;
    }
  }
  .section1-title {
      .bt();
      margin-bottom: 4vw;
      position: relative;
      background-color: rgb(248, 248, 248);
      text-align: left;
      font-size: 14px;
      padding: 2vw 4vw;
      color: #333;
      position: relative;
      .icon{
        width: 26px;
        position: relative;
        top: 6px;
        left: -6px;
        margin-right: -2px;
      }
      .icon-right {
        position: absolute;
        right: 6vw;
        top: 50%;
        .fz(font-size, 36);
        .fz(margin-top,-16);

        &::before {
          color: rgb(159, 159, 159);
        }
      }
    }
</style>
