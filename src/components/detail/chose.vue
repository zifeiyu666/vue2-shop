<template lang="html">
  <section class="chose" v-if="view">
    <div class="chose-view">
      <h1 class="chose-view-title">
        {{view.ProductTitle}} 
        <!-- <p style='color: red'>规格：{{radio[0].radio}}-{{radio[1].radio}}-{{radio[2].radio}}</p> -->
      </h1>
      <p class="chose-view-intro">{{view.ProductIntro}}</p>
      <div class='item-wrap'>
        <!-- 价格区间 -->
        <p class='discountprice' v-if='enabledProp.length != 1'>
          <i>￥</i>{{view.minPrice}}<i v-if='view.minPrice != view.maxPrice'>-{{view.maxPrice}}</i>
          <!-- 购物返现 -->
          <span class='fx' v-if='view.maxgwfx != 0 && view.mingwfx && !fxtype'>
            <i>返</i>￥{{view.mingwfx}}<span v-if='view.mingwfx != view.maxgwfx'>-{{view.maxgwfx}}</span>
          </span>
          <!-- 分销返现 -->
          <span class='fx' v-if='view.maxhyfx != 0 && view.minhyfx && fxtype=="fx"'>
            <i>赚</i>￥{{view.minhyfx}}<span v-if='view.minhyfx != view.maxhyfx'>-{{view.maxhyfx}}</span>
          </span>
          <!-- 业务员返现 -->
          <span class='fx' v-if='view.maxywyfx != 0 && view.minywyfx && fxtype=="ywyzx"'>
            <i>赚</i>￥{{view.minywyfx}}<span v-if='view.minywyfx != view.maxywyfx'>-{{view.maxywyfx}}</span>
          </span>
        </p>
        <!-- 具体价格 -->
        <p class='discountprice' v-if='enabledProp.length == 1'>
          <i>￥</i>{{enabledProp[0].DiscountPrice}}
          <!-- 购物返现 -->
          <span class='fx' v-if='enabledProp[0].gwfx && enabledProp[0].gwfx != 0 && !fxtype'>
            <i>返</i>￥{{enabledProp[0].gwfx}}
          </span>
          <!-- 分销返现 -->
          <span class='fx' v-if='enabledProp[0].gwfx && enabledProp[0].gwfx != 0 && fxtype=="fx"'>
            <i>返</i>￥{{enabledProp[0].gwfx}}
          </span>
        </p>
        <!-- 具体原价 -->
        <span class='originalprice' v-if='enabledProp.length == 1 && enabledProp[0].DiscountPrice != enabledProp[0].OriginalPrice'>原价￥{{enabledProp[0].OriginalPrice}}</span>
        
      </div>
      <div class='item-wrap'>
        <span>已售 {{view.SoldNum}}</span>
        <span>库存：{{view.AvailableNum}}</span>
      </div>
      <div class='line'></div>
      
    </div>

  </section>


</template>

<script>
import {
  MessageBox
} from 'mint-ui';
import {
  mapState
} from 'vuex'

import {parseTime} from '@/util/data.js'
import * as mockapi from '@/../mockapi'
export default {
  props: [
    'view',
  ],
  data() {
    return {
      type: 'default',
      OriginalPrice: '',
      DiscountPrice: '',
      hyfx: '',
      ywyfx: '',
      gwfx: "",
      minhyfx: '',
      maxhyfx: '',
      minywyfx: '',
      maxywyfx: '',
      mingwfx: '',
      maxgwfx: '',
      fxtype: ''
    }
  },
  computed: {
    enabledProp() {
      console.log('计算')
      console.log(this.$store.state.selectedProp)
      return this.$store.state.selectedProp ? this.$store.state.selectedProp : []
    }
  },
  mounted() {
    this.fxtype = this.$route.query.type ? this.$route.query.type : undefined
    console.log('返现类型')
    console.log(this.fxtype)
  },
  methods: {
    parseTime: parseTime,
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.originalprice{
  text-decoration:line-through;
}
.chose-view-title{
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  height: 40px;
  line-height: 20px;
  font-size: 14px !important;
}
.fx{
  display: inline!important;
  margin-left: 5px;
  position: relative;
  top: -2px;
  i{
    position: relative;
    top: -2px;
    font-size: 12px!important;
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
  span{
    color: @fontRed !important;
  }
  font-size: 14px !important;
  color: @fontRed !important;
}
.discountprice{
  font-size: 24px;
  color: @fontRed;
  i{
    font-size: 16px;
  }
}
.chose {
    background: #fff;
    padding: 3vw;
    .chose-view {
        > h1 {
           font-size: 16px;
            color: #2c3e50;
            > span {
                color: rgb(238, 113, 80);
            }
        }
        > span {
            line-height: 10vw;
            color: @cl;
            .fz(font-size,34);
            font-weight: 600;
        }

    }

    .chose-mychosed {

        background-color: #fff;
        > div {
            padding-top: 20px;
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;

            span {
                .fz(font-size,26);
                padding: 6px 10px;
                border: 1px solid rgb(111, 111,111);
                margin-right: 6vw;
                color: rgb(111, 111, 111);
                &.active,
                &:active {
                    color: @cl;
                    border-color: @cl;
                    -webkit-transform: scale(1.1);
                    transform: scale(1.1);
                }

            }
        }
    }

    .footer {
        width: 100%;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        height: 14vw;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #ffffff;
        -moz-user-select: none;
        -webkit-user-select: none;
        .bt();
        .footer-addcar,
        .footer-gocar,
        .footer-index {
            text-align: center;
        }

        .footer-index {
            -webkit-flex: 3;
            -ms-flex: 3;
            flex: 3;
            line-height: 14vw;
            height: 14vw;
            padding-top: 1.5vw;
            border-right-color: #f7f7f7;
            border-right-style: solid;
            .fz(border-right-width,1);

            i {
                .fz(font-size,45);
            }
            &:active {
                background-color: #f1f1f1;
            }
        }

        .footer-gocar {
            position: relative;
            -webkit-flex: 3;
            -ms-flex: 3;
            flex: 3;
            height: 14vw;
            line-height: 14vw;
            padding-top: 1.6vw;
            span {
                height: 5vw;
                width: 5vw;
                line-height: 5vw;
                position: absolute;
                top: 0.5vw;
                right: 5vw;
                background-color: @cl;
                border-radius: 50%;
                color: #fff;
                .fz(font-size,24);
            }
            &:active {
                background-color: #f1f1f1;
            }
            i {
                .fz(font-size,48);
            }
        }

        .footer-addcar {
            -webkit-flex: 6;
            -ms-flex: 6;
            flex: 6;
            line-height: 14vw;
            height: 14vw;

            color: #fff;
            background-color: @cl;
            letter-spacing: 0.2vw;
            &:active {
                background-color: #ff7d00;
            }
        }
    }
}
.pick{
  padding-bottom: 10px;
}
.pick h1{
  font-size: 14px;
  line-height: 35px;
}
.chose-view-intro{
  color:#ff7d00;
  margin-top: 6px;
  margin-bottom: 6px;
}
.item-wrap {
  margin-top: 10px;
  span{
    font-size: 14px;
    box-sizing: border-box;
    padding-right: 10px;
    color: #666;
  }
  span:nth-of-type(2){
    float: right;
  }
  
}
</style>
