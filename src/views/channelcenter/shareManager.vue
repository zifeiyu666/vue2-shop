<template>
  <div v-loading='isLoading'>
    <v-header>
      <h1 slot="title">业务员管理</h1>
    </v-header>
    <div class='catagory clearfix'>
    </div>
    <div class="wrap">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        class="something"
        v-if='List.length != 0'>
        <!-- <li>
          <div class="something-middle">
            <img src="">
          </div>
          <div class="something-right">
            <p>当前渠道
              <span class="level">
                <i class='iconfont icon-huiyuandengji0101'></i> 
                xxx渠道
              </span>
            </p>
            <p><i class='iconfont icon-dianhua'></i>：18724798278</p>
            <p><i class='iconfont icon-dizhi-01'></i>：阿萨德龙凤哈里斯的话费</p>
          </div>
        </li> -->
        <!-- <li style='height: 20px !important'>历史渠道</li> -->    
        <li v-for="(item, index) in List" :key='index+"a"' >
          <div class="something-middle">
            <img :src="item.headimageurl">
          </div>
          <div class="something-right">
            <p>{{item.name}}
              <span class="level" style='margin-left: 0; margin-top: 5px' >
                <a @click.stop='goToFx(item.openid)'>查看返现记录</a>
              </span>
              <span class="level" style='margin-left: 0; margin-top: 5px' >
                <a @click.stop='goToCJ(item.openid)'>查看成交记录</a>
              </span>
            </p>
            <!-- <p><i class='iconfont icon-dianhua'></i>：{{item.phone}}</p> -->
            <p><i class='iconfont icon-dizhi-01'></i>{{item.adress}}</p>
            <i class='iconfont icon-jiantou' @click='showHY(item.openid)'></i>
          </div>
        </li>
      </ul>
      <v-baseline v-if='isLastPage && List.length > 0'></v-baseline>
    </div>

    <v-nomore v-if='List.length == 0'></v-nomore>
    
  </div>
  
</template>
<script>
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
import NorMore from '@/components/nomore'
import { parseTime } from '@/util/data.js'
  export default{
    data() {
      return {
        isLoading: true,
        loading: false,
        List: [],
        pageNo: 1,
        pageSize: 10,
        isLastPage: false
      }
    },
    components: {
      'v-baseline': Baseline,
      'v-header':Header,
      'v-nomore': NorMore
    },
    mounted() {
      let userInfo = sessionStorage.getItem('token')
      if (userInfo) {
        let data = userInfo.split(',')
        this.username = data[0]
        this.token = data[1]
      } else {
        this.$router.push('/channelcenter/login')
      }
      this.getList()
    },
    methods: {
      parseTime,
      showHY(openid) {
        this.$router.push({path: '/channelcenter/hylist', query: {id: openid}})
      },
      goToFx(openid) {
        this.$router.push({path: '/channelcenter/ywyfxjl', query: {id: openid}})
      },
      goToCJ(openid) {
        this.$router.push({path: '/channelcenter/ywycjjl', query: {id: openid}})
      },
      getList() {
        this.isLoading = true
        this.loading = true
        mockapi.shop.api_Channel_getMySalesmanList_get({
          params: {
            token: this.token,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
        }).then(res => {
          this.isLoading = false
          this.loading = false
          var data = res.data.data.list
          this.isLastPage = res.data.data.pager.isLastPage
          this.List = this.List.concat(data)
          this.pageNo++
        }).catch(err => {
          this.isLoading = false
          this.loading = false
          console.log(err.message || err)
        })
      },
      loadMore() {
        if(!this.isLastPage) {
          this.getList()
        }
        
      }
    }
  }
</script>
<style lang=less>
  @import '../../assets/fz.less';
  @import '../../assets/utils.less';
.back{
  position: absolute;
  z-index: 1000;
  width: 40px;
  height: 40px;
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
  /* background: #F8FCFF; */
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
  /* position: fixed; */
  top: 50px;
  z-index: 10;
  width: 100%;
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
.wrap, .wrap2 {
    width: 100%;
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
            background: #fff;
            margin-top: 10px;
            .bd();
            position: relative;
            .icon-jiantou{
              color: #666;
              font-size: 20px;
              line-height: 20px;
              cursor: pointer;
              position: absolute;
              right: 10px;
              top: 50%;
              margin-top: -10px;
            }
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
                p:first-of-type {
                  font-size: 16px;
                  color: @fontBlack !important;
                  .level{
                    /* float: right; */
                    display: block;
                    font-size: 14px;
                    color: @fontRed !important;
                    margin-right: 15px;
                    a{
                      color: @fontRed !important;
                    }
                  }
                }

                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                    color: @fontGray;
                }
                /*p:last-of-type {
                    .fz(font-size,22);
                    color: rgb(168, 168, 168);
                }*/
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
