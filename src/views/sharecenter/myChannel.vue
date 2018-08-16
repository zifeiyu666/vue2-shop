<template>
  <div>
    <v-header>
      <h1 slot="title">我的渠道</h1>
    </v-header>
    <div class='catagory clearfix'>
      <div class="nav">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">全部</mt-tab-item>
          <mt-tab-item id="2">一级</mt-tab-item>
          <mt-tab-item id="3">二级</mt-tab-item>
          <!-- <mt-tab-item id="4">三级</mt-tab-item> -->
        </mt-navbar>
      </div>
    </div>
    
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="wrap">
          <ul class="something" >
            <li v-for="(k,i) in allList" @click='gotoDetail(k)' :key="i">
              <div class="something-middle">
                <img :src="k.headimageurl">
              </div>
              <div class="something-right">
                <p>姓名：{{k.name}}</p>
                <p>电话： {{k.phone}}</p>
                <p>级别： {{k.level}}级</p>
                <p style="font-size: 14px;">地址：{{k.adress}}</p>
                <!-- <div class="something-right-bottom">
                  <span @click='deleteCollection(k)'></span>
                </div> -->
              </div>
            </li>
          </ul>
          <div style='text-align: center;position: relative;top: 20px;'>
            <mt-button @click='loadMoreAll' v-if='allQuery.loadMore'>加载更多</mt-button>
            <v-baseline v-else></v-baseline>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="wrap">
          <ul class="something" >
            <li v-for="(k,i) in oneList" @click='gotoDetail(k)' :key="i">
              <div class="something-middle">
                <img :src="k.headimageurl">
              </div>
              <div class="something-right">
                <p>姓名：{{k.name}}</p>
                <p>电话： {{k.phone}}</p>
                <p>级别： {{k.level}}级</p>
                <p style="font-size: 14px;">地址：{{k.adress}}</p>
                <!-- <div class="something-right-bottom">
                  <span @click='deleteCollection(k)'></span>
                </div> -->
              </div>
            </li>
          </ul>
          <div style='text-align: center;position: relative;top: 20px;'>
            <mt-button @click='loadMoreOne' v-if='oneQuery.loadMore'>加载更多</mt-button>
            <v-baseline v-else></v-baseline>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="wrap">
          <ul class="something" >
            <li v-for="(k,i) in twoList" @click='gotoDetail(k)' :key="i">
              <div class="something-middle">
                <img :src="k.headimageurl">
              </div>
              <div class="something-right">
                <p>姓名：{{k.name}}</p>
                <p>电话： {{k.phone}}</p>
                <p>级别： {{k.level}}级</p>
                <p style="font-size: 14px;">地址：{{k.adress}}</p>
                <!-- <div class="something-right-bottom">
                  <span @click='deleteCollection(k)'></span>
                </div> -->
              </div>
            </li>
          </ul>
          <div style='text-align: center;position: relative;top: 20px;'>
            <mt-button @click='loadMoreTwo' v-if='twoQuery.loadMore'>加载更多</mt-button>
            <v-baseline v-else></v-baseline>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div class="wrap">
          <ul class="something" >
            <li v-for="(k,i) in threeList" @click='gotoDetail(k)' :key="i">
              <div class="something-middle">
                <img :src="k.headimageurl">
              </div>
              <div class="something-right">
                <p>姓名：{{k.name}}</p>
                <p>电话： {{k.phone}}</p>
                <p>级别： {{k.level}}级</p>
                <p style="font-size: 14px;">地址：{{k.adress}}</p>
                <!-- <div class="something-right-bottom">
                  <span @click='deleteCollection(k)'></span>
                </div> -->
              </div>
            </li>
          </ul>
          <div style='text-align: center;position: relative;top: 20px;'>
            <mt-button @click='loadMoreThree' v-if='threeQuery.loadMore'>加载更多</mt-button>
            <v-baseline v-else></v-baseline>
          </div>
        </div>
      </mt-tab-container-item>
      
    </mt-tab-container>
  </div>
  
</template>
<script>
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
  export default{
    data() {
      return {
        selected: '1',
        allList: [],
        oneList: [],
        twoList: [],
        threeList: [],
        allQuery: {
          pageNo: 1,
          pageSize: 10,
          loadMore: true
        },
        oneQuery: {
          pageNo: 1,
          pageSize: 10,
          loadMore: true
        },
        twoQuery: {
          pageNo: 1,
          pageSize: 10,
          loadMore: true
        },
        threeQuery: {
          pageNo: 1,
          pageSize: 10,
          loadMore: true
        },
      }
    },
    components: {
      'v-baseline': Baseline,
      'v-header':Header
    },
    mounted() {
      this.getAllList()
      this.getOneList()
      this.getTwoList()
      // this.getThreeList()
    },
    methods: {

      getAllList() {
        mockapi.shop.api_Shop_getShareCompany_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            pageNo: this.allQuery.pageNo,
            pageSize: this.allQuery.pageSize
          }
        }).then(res => {
          var data = res.data.data.list
          var isLastPage = res.data.data.pager.isLastPage
          if (isLastPage) {
            this.allQuery.loadMore = false
          }
          this.allList = this.allList.concat(data)
          this.allQuery.pageNo++
        })
      },
      getOneList() {
        mockapi.shop.api_Shop_getOneShareCompany_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            pageNo: this.oneQuery.pageNo,
            pageSize: this.oneQuery.pageSize
          }
        }).then(res => {
          var data = res.data.data.list
          var isLastPage = res.data.data.pager.isLastPage
          if (isLastPage) {
            this.oneQuery.loadMore = false
          }
          this.oneList = this.oneList.concat(data)
          // this.oneQuery.pageNo++
        })
      },
      getTwoList() {
        mockapi.shop.api_Shop_getTwoShareCompany_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            pageNo: this.twoQuery.pageNo,
            pageSize: this.twoQuery.pageSize
          }
        }).then(res => {
          var data = res.data.data.list
          var isLastPage = res.data.data.pager.isLastPage
          if (isLastPage) {
            this.twoQuery.loadMore = false
          }
          this.twoList = this.twoList.concat(data)
          // this.twoQuery.pageNo++
        })
      },
      getThreeList() {
        mockapi.shop.api_Shop_getThreeShareCompany_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            pageNo: this.threeQuery.pageNo,
            pageSize: this.threeQuery.pageSize
          }
        }).then(res => {
          var data = res.data.data.list
          var isLastPage = res.data.data.pager.isLastPage
          if (isLastPage) {
            this.threeQuery.loadMore = false
          }
          this.threeList = this.threeList.concat(data)
          // this.threeQuery.pageNo++
        })
      },
      loadMoreAll() {
        this.allQuery.pageSize++
        this.getAllList
      },
      loadMoreOne() {
        this.oneQuery.pageSize++
        this.getOneList
      },
      loadMoreTwo() {
        this.twoQuery.pageSize++
        this.getTwoList
      },
      loadMoreThree() {
        this.threeQuery.pageSize++
        this.getThreeList
      }
    }
  }
</script>
<style lang=less>
  @import '../../assets/fz.less';
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
.wrap {
    width: 100%;
    padding-bottom: 60px;
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
