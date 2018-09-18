<template>
  <div>
    <v-header>
      <h1 slot="title">我的订单</h1>
    </v-header>
    <ul class='wrap'>
      <li class='order-wrap'>
        <h3>订单标题：{{orderDetail.ordertitle}}</h3>
        <ul class="something" >
          <li v-for="(k,i) in orderDetail.opd" :key='i'>
            <div class="something-middle">
              <img :src="k.imgurl[0]">
            </div>
            <div class="something-right">
              <p>{{k.producttitle}}</p>
              <p style="color:rgb(199, 108, 28);">规格：{{k.propname}}</p>
              <p>售价：{{k.realprice}}元&nbsp;&nbsp;&nbsp;&nbsp;使用积分：{{k.usescore}}</p>
              <!-- <div class="something-right-bottom">
                <span @click='deleteCollection(k)'></span>
              </div> -->
            </div>
          </li>
        </ul>  
      </li>
      <mt-field label="申请理由" placeholder="请填写退款理由" type="textarea" rows="4" v-model="reason"></mt-field>
    </ul>
    <mt-button class='bottom' @click='submitRefund'>提交</mt-button>
  </div>
  
</template>
<script>
import qs from 'qs'
import {Toast} from 'mint-ui'
import Footer from '@/common/_footer.vue'
import * as mockapi from '@/../mockapi'

import Header from '@/common/_header.vue'
  export default{
    data() {
      return {
        orderDetail: undefined,
        reason: ''
      }
    },
    components: {
      'v-header':Header
    },
    mounted() {
      this.getOrderDetail()
    },
    methods: {
      getOrderDetail() {
        mockapi.shop.api_Shop_getOrders_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            orderno: this.$route.query.orderno
          }
        }).then(res => {
          this.orderDetail = res.data.data
        })
      },
      submitRefund() {
        mockapi.shop.api_Shop_saveRefundApply_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            Id: this.$route.query.id,
            Reason: this.reason
          })
        }
        ).then(res => {
          if (res.data.result == 1) {
            Toast('退款申请成功！')
            this.$router.push('/shop/myorder')
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
@import '../../assets/fz.less';
.bottom{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ff4800;
  color: #fff;
  border-radius: 0;
  font-size: 14px;
}
.back{
  position: absolute;
  z-index: 1000;
  width: 40px;
  height: 40px;
}
.wrap{
  margin-top: 10px;
}
.mint-header{
  background: #eee;
  color: #666;
}
.null{
    height: 10px;
  }
.input-wrap{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  padding-left: 40px;
  padding-top: 5px;
  box-sizing: border-box;
}
.mint-navbar{
  background: #fff;
}
.search-wrap{
  // background: #F8FCFF;
  height: 100%;
  .fa-icon{
    position: relative;
    left: 10px;
    top: 6px;
  }
}
.input-inner-wrap{
  margin-right: 20px;
  position: relative;
  .fa-icon{
    position: absolute;
    top: 6px;
    left: 8px;
  }
}
input{
  width: 100%;
  background: #fff;
  border: 1px solid #eee;
  line-height: 18px;
  padding: 5px 10px 5px 30px;
  box-sizing: border-box;
  border-radius: 4px;
}
.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #FFAA00;
    color: #FFAA00;
    margin-bottom: -3px;
}

.wrap {
    width: 100%;
    padding-bottom: 60px;
    .order-wrap{
      // border-bottom: 1px solid #999;
      margin-bottom: 20px;
      background: #fff;
      padding-top: 10px;
      box-shadow: 0px 1px 2px 1px #ddd;
      h3{
        padding-left: 15px;
        font-size: 16px;
      }
    }
    .something {
        width: 100%;
        padding-bottom: 50px;
        position: relative;
        > li {
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 4vw 0vw;
            position: relative;
            height: 26vw;
            margin: 0 2vw;
            .bd();
            .something-left {
                -ms-flex: 2;
                -webkit-box-flex: 2;
                flex: 2;

                label {
                    float: left;
                    background: url("../../assets/car/images/t.svg") no-repeat center center/50% 50%;
                    input {
                        height: 14vw;
                        width: 14vw;
                        opacity: 0;
                        filter: alpha(opacity=0);
                    }
                }
                .false {
                    background: url("../../assets/car/images/f.svg") no-repeat center center /50% 50%!important;
                }

            }
            .something-middle {
                -ms-flex: 3;
                -webkit-box-flex: 3;
                flex: 3;
                height: 26vw;
                padding-left: 2vw;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .something-right {
                -ms-flex: 7;
                -webkit-box-flex: 7;
                flex: 7;
                height: 100%;
                display: -ms-flex;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-flow: column nowrap;
                flex-flow: column nowrap;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                padding-left: 6vw;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    .fz(font-size,26);
                }
                p:last-of-type {
                    .fz(font-size,22);
                    color: rgb(168, 168, 168);
                }
                .something-right-bottom {

                    > div {
                        display: -ms-flex;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        input {
                            width: 6vw;
                            text-align: center;
                        }

                        span {
                            height: 7vw;
                            line-height: 7vw;
                            width: 8vw;
                            display: inline-block;
                            border: 0.2vw solid #f1f1f1;
                            border-radius: 1vw;
                            text-align: center;
                            font-size: 20px;
                            cursor: pointer;
                        }
                    }
                    > span {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 13vw;
                        height: 13vw;
                        background: url("../../assets/car/images/laji.svg") no-repeat center/50%;
                    }
                }
            }
        }
    }
    label,
    span {
        &:active {
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }
    }
}
.refund-btn{
  font-size: 13px;
  width: 80px;
  height: 35px;
  color: #FFAA00;
  margin-top: 2vw;
  position: absolute;
  right: 4vw;
  bottom: 7px;
  z-index: 10;
}
</style>

