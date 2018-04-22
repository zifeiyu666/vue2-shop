<template>
  <div>
    <v-header>
      <h1 slot="title">我的订单</h1>
    </v-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">待付款</mt-tab-item>
      <mt-tab-item id="3">已付款</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <!-- 全部订单 -->
      <mt-tab-container-item id="1">
          <div class="wrap">
            <ul>
              <li class='order-wrap' v-for="(item,i) in allOrders" @click='gotoDetail(item)' :key="i">
                <h3>订单标题：{{item.ordertitle}}</h3>
                <ul class="something" >
                  <li v-for="(k,i) in item.opd" :key='i'>
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
                      <!-- TODO -->
                      <!-- v-if='k.orderstate=="已付款"' -->
                      <div class='state-wrap'>
                        <mt-button  class='refund-btn1'  @click='refund([k,item])'>申请退款</mt-button>
                      </div>
                      
                    </div>
                    
                  </li>
                  <mt-button v-if='item.orderstate=="未付款"' class='refund-btn'  @click='goPay(k)'>去支付</mt-button>
                </ul>
                
                <!-- <div class="line"></div> -->
                
              </li>
              <div class="btn-wrap" style='text-align: center'>
                <mt-button @click='loadMoreAll'>加载更多</mt-button>
              </div>
            </ul>
          </div>
      </mt-tab-container-item>
      <!-- 待付款 -->
      <mt-tab-container-item id="2">
        <div class="wrap">
            <ul>
              <li class='order-wrap' v-for="(k,i) in waitOrders" @click='gotoDetail(k)' :key="i">
                <h3>订单标题：{{k.ordertitle}}</h3>
                <ul class="something" >
                  <li v-for="(k,i) in k.opd" :key='i'>
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
                  <mt-button class='refund-btn'  @click='goPay(k)'>去支付</mt-button>
                </ul>
                
              </li>
              <div class="btn-wrap" style='text-align: center'>
                <mt-button @click='loadMoreWait'>加载更多</mt-button>
              </div>
            </ul>
          </div>
      </mt-tab-container-item>
      <!-- 已付款 -->
      <mt-tab-container-item id="3">
        <div class="wrap">
            <ul>
              <li class='order-wrap' v-for="(k,i) in payedOrders" @click='gotoDetail(k)' :key="i">
                <h3>订单标题：{{k.ordertitle}}</h3>
                <ul class="something" >
                  <li v-for="(k,i) in k.opd" :key='i'>
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
                  <mt-button class='refund-btn'  @click='refund(k)'>申请退款</mt-button>
                </ul>
                
              </li>
              <div class="btn-wrap" style='text-align: center'>
                <mt-button @click='loadMorePayed'>加载更多</mt-button>
              </div>
            </ul>
          </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
  
</template>
<script>
import Footer from '@/common/_footer.vue'
import * as mockapi from '@/../mockapi'

import Header from '@/common/_header.vue'
  export default{
    data() {
      return {
        selected: '1',
        popsideVisible: false,
        allQuery: {
          pageNo: 1,
          pageSize: 10,
          busy: false, // 判断loadMore是否正在加载中
        },
        allOrders: [],
        payedQuery: {
          pageNo: 1,
          pageSize: 10,
          busy: false, // 判断loadMore是否正在加载中
        },
        payedOrders: [],
        waitQuery: {
          pageNo: 1,
          pageSize: 10,
          busy: false, // 判断loadMore是否正在加载中
        },
        waitOrders: []
      }
    },
    components: {
      'v-header':Header
    },
    mounted() {
      if (this.$route.query.selected) {
        this.selected = this.$route.query.selected
      }
      this.getAllOrdersList(false)
      this.getWaitOrdersList(false)
      this.getPayedOrdersList(false)
    },
    methods: {
      getAllOrdersList(flag) {
        mockapi.shop.api_Shop_getAllOrders_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            name: '',
            pageNo: this.allQuery.pageNo,
            pageSize: this.allQuery.pageSize
          }
        }).then(res => {
          this.allQuery.busy = false
          var data = res.data.data
          this.allOrders = this.allOrders.concat(data)
          
        })
      },
      getWaitOrdersList(flag) {
        mockapi.shop.api_Shop_getUnpayedOrders_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            name: '',
            pageNo: this.waitQuery.pageNo,
            pageSize: this.waitQuery.pageSize
          }
        }).then(res => {
          this.waitQuery.busy = false
          var data = res.data.data
          this.waitOrders = this.waitOrders.concat(data)
        })
      },
      getPayedOrdersList(flag) {
        mockapi.shop.api_Shop_getPayedOrders_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            name: '',
            pageNo: this.payedQuery.pageNo,
            pageSize: this.payedQuery.pageSize
          }
        }).then(res => {
          this.payedQuery.busy = false
          var data = res.data.data
          this.payedOrders = this.payedOrders.concat(data)
        })
      },
      loadMoreAll() {
        if (!this.allQuery.busy) {
          // 多次加载数据
          setTimeout(() => {
              this.getAllOrdersList(true)
              this.allQuery.pageNo ++
              this.allQuery.busy = true
          }, 1000);
        }
      },
      loadMoreWait() {
        if (!this.waitQuery.busy) {
          // 多次加载数据
          setTimeout(() => {
              this.getWaitOrdersList(true)
              this.waitQuery.pageNo ++
              this.waitQuery.busy = true
          }, 1000);
        }
      },
      loadMorePayed() {
        if (!this.payedQuery.busy) {
          // 多次加载数据
          setTimeout(() => {
              this.getPayedOrdersList(true)
              this.payedQuery.pageNo ++
              this.payedQuery.busy = true
          }, 1000);
        }
      },
      refund(data) {
        this.$router.push({path: '/shop/refund', query: {orderno: data[1].orderno, id: data[0].id}})
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
  box-shadow: 0px 1px 2px 1px #ddd;
  h3{
    padding-left: 15px;
  }
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
.refund-btn1{
  display: inline-block;
  font-size: 13px;
  width: 80px;
  height: 8vw;
  color: #FFAA00;
  margin-top: 2vw;
  // position: absolute;
  // right: 4vw;
  // bottom: 7px;
  z-index: 10;
}
.state-wrap{
  height: 8vw;
}
</style>

