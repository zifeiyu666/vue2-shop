<template>
  <section class="section2" v-if='section2'>
    <h1 class="section1-title">
        <img src="../../assets/img/lvyou.png" alt="" class="icon">
        旅游打包类
        <i class="icon-right"></i>
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
          </p>
        </li>
      </ul>
    </div>
    <router-link class="section2-banner" :to="{name:'详情页'}">
      <img :src="banner.imgurl" v-if='banner'>
    </router-link>
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';

  export default {
    props:['section2', 'banner']

  }
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  .product-img{
    height: 120px;
  }
  .section1-title{
    .bt();
    // .pt();
    margin-top: 6vw;
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
        width: 26vw;
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
          .fz(font-size, 32);
          padding-top: 3vw;
          color: #333;
        }

        p.section2-list-intro {
          padding-top: 2vw;
          .fz(font-size, 26);
          color: rgb(150, 150, 150);
        }

        p.section2-list-price {
          color: #b4282d;
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
      .fz(font-size, 34);
      padding: 4vw 6vw;
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
