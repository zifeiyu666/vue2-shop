<template>
  <div>
    <v-header>
      <h1 slot="title">分销订单</h1>
    </v-header>
    <mt-tab-container v-model="selected">
      <div class="wrap">
        <ul 
          v-if='allOrders.length > 0' 
          class='something'
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          >
          <li class='order-wrap' v-for="(k,i) in allOrders" @click='gotoDetail(k)' :key="i">
              <div class="something-middle">
                <img :src="k.imgurl[0]">
              </div>
              <div class="something-right">
                <p>{{k.producttitle}}</p>
                <p style="color:rgb(199, 108, 28);">规格：{{k.propname}}</p>
                <!-- <p style="color:rgb(199, 108, 28);height: 20px;"> {{k.intro}}</p> -->
                <p>售价：{{k.realprice}}元&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <!-- <div class="something-right-bottom">
                  <span @click='deleteCollection(k)'></span>
                </div> -->
              </div>
            </li>
        </ul>
        <div v-else>
          <v-nomore></v-nomore>
        </div>
        <v-baseline v-if='allOrders.length > 0 && isLastPage'></v-baseline>
      </div>
    </mt-tab-container>
  </div>
  
</template>
<script>
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import * as mockapi from '@/../mockapi'
import NorMore from '@/components/nomore'

import Header from '@/common/_header.vue'
  export default{
    data() {
      return {
        selected: '1',
        popsideVisible: false,
        pageNo: 1,
        pageSize: 10,
        allOrders: [],
        isLoadMore: false,
        isLastPage: false,
        loading: false
      }
    },
    components: {
      'v-baseline': Baseline,
      'v-header':Header,
      'v-nomore': NorMore
    },
    mounted() {
      this.getShareOrders()
    },
    methods: {
      getShareOrders() {
        this.loading = true
        mockapi.shop.api_Share_getMyRelationOrdersList_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          this.loading = false
          var data = res.data.data.list
          this.isLastPage = res.data.data.pager.isLastPage
          this.pageNo++
          this.allOrders = this.allOrders.concat(data)
        }).catch(err => {
          this.loading = false
        })
      },
      loadMore() {
        if(!this.isLastPage) {
          this.getShareOrders()
        }
      }
    }
  }
</script>
<style lang="less" scoped>
@import '../../assets/fz.less';
@import '../../assets/utils.less';
.order-wrap{
  margin-bottom: 10px;
  background: #fff;
  h3{
    padding-left: 15px;
    padding: 10px 15px;
    border-bottom: 1px solid @lightBorder;
    .iconfont{
      font-size: 16px;
      margin-right: 5px;
    }
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
    // padding-bottom: 60px;
    .something {
        width: 100%;
        > li {
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 4vw 2vw;
            position: relative;
            height: 26vw;
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
</style>

