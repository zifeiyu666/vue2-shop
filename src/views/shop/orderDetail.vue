<template>
  <div>
    <v-header>
      <h1 slot="title">订单详情</h1>
    </v-header>
    <div class="time">
      <div v-if='orderDetail.orderstate=="未付款"'>
        <div class="left">
          <span><i class='icon-clock iconfont'></i> 等待付款</span>
        </div>
        <div class="right">
          <p>剩余：0天2小时25分</p>
          <p>需付款： {{orderDetail.realtotalprice}}</p>
        </div>
      </div>
      <div v-if='orderDetail.orderstate=="已取消"'>
        <div class="left">
          <span><i class='icon-yiwanchengdingdan iconfont'></i> 订单已经取消</span>
        </div>
        <div class="right">
          <p>欢迎再次光临！</p>
        </div>
      </div>
      <div v-else>
        <div class="left">
          <span><i class='iconfont icon-yiwanchengdingdan'></i> 完成</span>
        </div>
        <div class="right">
          <p>欢迎再次光临！</p>
        </div>
      </div>
      
    </div>
    <div class="customer">
      <p>
        <span class="name">姓名: {{orderDetail.nickname}}</span>
        <span class="phone">{{userInfo.Phone}}</span>
      </p>
      <p>
        下单时间：
        <span class="data-time">
          {{orderDetail.ordertime.slice(0, 10) + ' ' + orderDetail.ordertime.slice(11, 19)}}
        </span>
      </p>
    </div>
      <div class="wrap">
        <div class='order-wrap'>
          <h3 class='ordertitle'>订单标题：{{orderDetail.ordertitle}}</h3>
          <ul class="something" >
            <!-- <div id="deleteOrder">
              <span @click='deleteOrder(orderDetail)'></span>
            </div> -->
            <li v-for="(k,i) in orderDetail.opd" :key='i'>
              <div class="something-middle">
                <img :src="k.imgurl[0]">
              </div>
              <div class="something-right">
                <p>{{k.producttitle}}</p>
                <p style="color:rgb(199, 108, 28);">规格：{{k.propname}}</p>
                <p>售价：{{k.realprice}}元&nbsp;&nbsp;&nbsp;&nbsp;使用积分：{{k.usescore}}</p>
                <!-- TODO -->
                <!-- v-if='k.orderstate=="已付款"' -->
                <div class='state-wrap'>
                  <mt-badge size="small" color='#ccc'>{{k.state}}</mt-badge>
                  <mt-button v-if='k.state == 2'  class='refund-btn1'  @click.stop='refund([k,item])'>申请退款</mt-button>
                </div>
              </div>
            </li>
            <mt-button class='refund-btn-2' :class="{'refund-btn-right': (orderDetail.orderstate == '未付款' ? true : false)}">{{orderDetail.orderstate}}</mt-button>
            <mt-button v-if='orderDetail.orderstate=="未付款"' class='refund-btn'  @click.stop='goPay(orderDetail)'>去支付</mt-button>
          </ul>              
        </div>
      </div>
  </div>
  
</template>
<script>
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import * as mockapi from '@/../mockapi'
import qs from 'qs'
import {Toast} from 'mint-ui'

import Header from '@/common/_header.vue'
  export default{
    data() {
      return {
        orderno: null,
        orderDetail: '',
        userInfo: '',
        state: [
          {
            id: 1,
            state: '未付款'
          },
          {
            id: 2,
            state: '已付款'
          },
          {
            id: 3,
            state: '已使用'
          },
          {
            id: 4,
            state: '已完成'
          },
          {
            id: 5,
            state: '已取消'
          },
          {
            id: 6,
            state: '已退款'
          },
          {
            id: 7,
            state: '待确认'
          },
          {
            id: 8,
            state: '确认通过'
          },
          {
            id: 9,
            state: '确认未过'
          }
        ]
      }
    },
    components: {
      'v-header':Header,
      'v-baseline': Baseline
    },
    mounted() {
      this.userInfo = this.$store.state.userInfo
      if (this.$route.query.orderno) {
        this.orderno = this.$route.query.orderno
        this.getOrderDetail()
      } else {
        Toast('未获取到订单信息')
      }
      
    },
    methods: {
      getOrderDetail() {
        mockapi.shop.api_Shop_getOrders_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            orderno: this.orderno
          }
        }).then(res => {
          this.orderDetail = res.data.data
        })
      },
      // TODO
      refund(data) {
        this.$router.push({path: '/shop/refund', query: {orderno: data[1].orderno, id: data[0].id}})
      },
      goPay(data) {
        console.log('去支付')
        this.$router.push({path: '/shop/order', query: {orderno: data.orderno, orderid: data.orderid}})
      },
      generateState(id) {
        var state = ''
        this.state.forEach((item,i) => {
          if (id == item.id) {
            state = item.state
          }
        })
        return state
      },
      deleteOrder(item) {
        console.log('取消订单')
        var that = this
        mockapi.shop.api_Shop_CancleOrder_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            orderid: item.orderid
          })
        }).then(res => {
          if (res.data.result == 1) {
            this.allQuery.pageNo = 1
            this.waitQuery.pageNo = 1
            this.payedQuery.pageNo = 1
            this.getAllOrdersList(false)
            this.getWaitOrdersList(false)
            this.getPayedOrdersList(false)
            Toast({
            message: '操作成功'
            });
          } 
        })
      }
    }
  }
</script>
<style lang="less" scoped>
@import '../../assets/fz.less';
.order-wrap{
  // border-bottom: 1px solid #999;
  margin-bottom: 20px;
  background: #fff;
  padding-top: 10px;
  box-shadow: 0px 1px 4px 1px #eee;
  h3{
    padding-left: 15px;
  }
}
.ordertitle{
  font-size: 16px;
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
  background: #F8FCFF;
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
.search-history{
  margin-top: 50px;
  .title{
    margin: 10px;
  }
  .fa-icon{
    float: right;
    margin-right: 10px;
    color: #666;
    margin-top: 1px;
  }
  button{
    padding: 8px 12px;
    border-radius: 22px; 
    margin: 5px 8px;
  }
}
.catagory{
  position: fixed;
  top: 0;
  z-index: 10;
  .nav{
    width: 85vw;
    float: left;
  }
  .btn{
    text-align: center;
    width: 15vw;
    float: left;
    background: #fff;
  }
  .iconfont{
    font-size: 24px;
    line-height: 46px;
  }
}
.popside-wrap{
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  .shade{
    background: #000;
    opacity: .2;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .main{
    background: #fff;
    width: 50vw;
    height: 100vh;
    box-sizing: border-box;
    position: absolute;
    left: 50vw;
    top: 0;
    overflow: auto;
    .inner-wrap{
      margin-bottom: 115px;
    }
    .btn-wrap{
      position: fixed;
      bottom: 55px;
      right: 0px;
      width: 50vw;
      height: 40px;
      .btn-left, .btn-right{
        float: left;
        width: 50%;
        height: 40px;
        border-radius: 0;
        background: #FFAA00;
      }
      .btn-right{
        background: rgb(255, 94, 0);
      }
    }
  }
}
.wrap {
    width: 100%;
    padding-bottom: 60px;
    .something {
        width: 100%;
        padding-bottom: 50px;
        position: relative;
        #deleteOrder {
          position: relative;
            span {
                position: absolute;
                right: 0;
                bottom: -10px;
                width: 46px;
                height: 46px;
                background: url("../../assets/car/images/laji.svg") no-repeat center/50%;
            }
        }
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
            height: 40vw;
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
                ms-flex: 3;
                -webkit-box-flex: 3;
                flex: 3;
                height: 30vw;
                padding-left: 2vw;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                position: relative;
                top: -4vw;
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
                -ms-flex-flow: column wrap;
                flex-flow: column wrap;
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
.refund-btn-2{
  font-size: 13px;
  width: 80px;
  height: 35px;
  color: #ccc;
  background: #fff;
  margin-top: 2vw;
  position: absolute;
  right: 8vw;
  bottom: 7px;
  z-index: 10;
}
.refund-btn-right{
  right: 30vw !important;
}
.refund-btn1{
  display: inline-block;
  font-size: 13px;
  width: 80px;
  height: 8vw;
  color: #FFAA00;
  margin-top: 2vw;
  float: right;
  // border-radius: 3vw;
  // position: absolute;
  // right: 4vw;
  // bottom: 7px;
  z-index: 10;
}
.state-wrap{
  height: 8vw;
}
.time{
  padding: 30px 20px 40px 20px;
  background: linear-gradient(120deg, rgb(252, 64, 44),  rgb(252, 90, 44), rgb(252, 130, 48));
  color: #fff;
  .left{
    float: left;
    font-size: 18px;
  }
  .right{
    font-size: 14px;
    float: right;
  }
}
.time:after{
  content: '';
  display: block;
  clear: both;
}
.customer{
  line-height: 2;
  background: #fff;
  padding: 10px 16px;
  margin: -20px 20px 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px #eee;
  color: #333;
  .name, .phone{
    font-size: 16px;
    margin-right: 10px;
  }
}
</style>

