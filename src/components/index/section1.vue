<template lang="html">
  <section class="section1" v-if='section1'>
    <h1 class="section1-title">
      <!-- <img class='icon' src="../../assets/img/dandu.png" alt=""> -->
      {{title}}
      <span class="right" @click='goToSearch(title)'>查看更多></span>
    </h1>
    <ul class="section1-list">
      <li v-for="k in section1">
        <count-down class='count_down' v-if='title == "限时抢购"' v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :startTime="new Date().getTime()" :endTime="new Date(k.limitTime).getTime()" :tipText="'距离开始文字1'" :tipTextEnd="'距离结束文字1'" :endText="'结束自定义文字2'" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>
        <router-link class='img_wrap' :to="{path:'/shop/detail', query:{pid: k.id}}" :key="k.id">
          <img v-lazy="k.imgurl[0]" alt="">
          <!-- <p>{{k.intro}}</p> -->
        </router-link>
        <h3>{{k.title}}</h3>
        <span>￥{{k.price}}</span>
        <span class='fx' v-if='k.gwfx && k.gwfx!=0'>
          <i>返</i>￥{{k.gwfx}}
        </span>
      </li>
    </ul>
    <router-link to=""  class="section1-banner">
      <img :src="banner.imgurl" v-if='banner'>
    </router-link>
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';
import CountDown from 'vue2-countdown'

export default {
  props:['section1', 'banner', 'title'],
  components: {
    CountDown
  },
  data() {
    return {
      startTime: '',
      endTime: ''
    }
  },
  methods: {
    goToSearch(title) {
      this.$router.push({path: '/shop/search', query: {title: title}})
    },
    countDownS_cb: function (x) {
      console.log(x)
    },
    countDownE_cb: function (x) {
      console.log(x)
    }
  }
}

</script>

<style lang="less">
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  
  .section1 {
    width: 100%;
    overflow: hidden;
    margin-top: 6px !important;
    background: #fff;
    .img_wrap{
      height: 32vw;
      img{
        width: 100%;
        height:100%;
      }
    }
    
    .fxicon{
      margin-left: 2px;
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
        padding:0 2vw;
        .count_down{
          z-index: 10;
          background: rgba(0, 0, 0, 0.4);
          display: block;
          width: 100%;
          position: relative;
          top: 26px;
          height: 26px;
          border-radius: 4px;
          margin-top: -26px;
          p{
            float: right;
            margin: 4px 2px;
          }
          span:nth-of-type(1){
            background: rgba(0,0,0,0);
            padding: 0;
            font-size: 10px!important;
            >span{
              padding: 0 2px;
              background: @fontRed;
              color: #fff;
              line-height: 18px;
              height: 18px;
              display: inline-block;
              border-radius: 4px;
              font-size: 10px!important;
            }
          }
          i{
            color: #fff;
            font-size: 8px!important;
          }
          span{
            padding: 0 2px;
            background: @fontRed;
            color: #fff;
            line-height: 18px;
            height: 18px;
            display: inline-block;
            border-radius: 4px;
            font-size: 10px!important;
          }
        }
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
          font-size: 18px;
          font-weight: bold;
          display: inline-block;
          padding-bottom: 6px;
          color: @fontRed;
          font-size: 16px;
        }
      }
    }

    .section1-banner {
      margin-top: 10px;
      border-top: 1px solid #eee;
      padding: 10px 0;
      // width: 100%;
      // box-sizing: border-box;
      display: block;
      img {
        display: block;
        width: 100%;
      }
    }
  }
</style>
