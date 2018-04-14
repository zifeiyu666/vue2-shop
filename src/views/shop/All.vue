<template lang="html">
  <div>
    <div class="search-wrap">
      <!-- <icon name='angle-left' scale="1.5"></icon>   -->
      <!-- <div style='background: #eee;height: 40px;'>
        <div class="back" @click="back">
          <icon name='angle-left' scale="1.5"></icon>
        </div>
        <div class="input-wrap">
          <div class='input-inner-wrap'>
            <icon name='search'></icon>  
            <input type="text" placeholder='搜索'>
          </div>
        </div>
      </div> -->
      <div class="catagory clearfix">
        <div class="nav">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">权益卡</mt-tab-item>
            <mt-tab-item id="3">旅游打包类</mt-tab-item>
            <mt-tab-item id="4">单独类</mt-tab-item>
          </mt-navbar>
        </div>
        <div class="btn" @click='showPopside()'>
          <i class='iconfont icon-fenlei'></i>
        </div>
      </div>
      
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="wrap">
            <ul class="something" >
              <li v-for="(k,i) in allList" @click='gotoDetail(k)' :key="i">
                <div class="something-middle">
                  <img :src="k.imgurl">
                </div>
                <div class="something-right">
                  <p>{{k.title}}</p>
                  <p style="color:rgb(199, 108, 28)"> {{k.intro}}</p>
                  <p>售价：{{k.price}}元</p>
                  <!-- <div class="something-right-bottom">
                    <span @click='deleteCollection(k)'></span>
                  </div> -->
                </div>
              </li>
            </ul>
            <div style='text-align: center; margin: 40px'>
              <mt-button @click='loadMoreAll'>加载更多</mt-button>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="wrap">
            <ul class="something" >
              <li v-for="(k,i) in QYKList" @click='gotoDetail(k)' :key="i">
                <div class="something-middle">
                  <img :src="k.imgurl">
                </div>
                <div class="something-right">
                  <p>{{k.title}}</p>
                  <p style="color:rgb(199, 108, 28)"> {{k.intro}}</p>
                  <p>售价：{{k.price}}元</p>
                  <!-- <div class="something-right-bottom">
                    <span @click='deleteCollection(k)'></span>
                  </div> -->
                </div>
              </li>
            </ul>
            <div style='text-align: center'>
              <mt-button @click='loadMoreQYK'>加载更多</mt-button>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="wrap">
            <ul class="something" >
              <li v-for="(k,i) in LTDBList" @click='gotoDetail(k)' :key="i">
                <div class="something-middle">
                  <img :src="k.imgurl">
                </div>
                <div class="something-right">
                  <p>{{k.title}}</p>
                  <p style="color:rgb(199, 108, 28)"> {{k.intro}}</p>
                  <p>售价：{{k.price}}元</p>
                  <!-- <div class="something-right-bottom">
                    <span @click='deleteCollection(k)'></span>
                  </div> -->
                </div>
              </li>
            </ul>
            <div style='text-align: center'>
              <mt-button @click='loadMoreLTDB'>加载更多</mt-button>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div class="wrap">
            <ul class="something" >
              <li v-for="(k,i) in DDList" @click='gotoDetail(k)' :key="i">
                <div class="something-middle">
                  <img :src="k.imgurl">
                </div>
                <div class="something-right">
                  <p>{{k.title}}</p>
                  <p style="color:rgb(199, 108, 28)"> {{k.intro}}</p>
                  <p>售价：{{k.price}}元</p>
                  <!-- <div class="something-right-bottom">
                    <span @click='deleteCollection(k)'></span>
                  </div> -->
                </div>
              </li>
            </ul>
            <div style='text-align: center'>
              <mt-button @click='loadMoreDD'>加载更多</mt-button>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="search-history">
      </div>

      
    </div>

    <div class="popside-wrap" v-if='popsideVisible'>
      <div class="shade" @click='hidePopside()'></div>
      <div class="main">
        <div class='inner-wrap'>
          <mt-radio
            title="分类1"
            v-model="value"
            :options="['optionA', 'optionB', 'optionC']">
          </mt-radio>
          <mt-radio
            title="分类2"
            v-model="value"
            :options="['optionA', 'optionB', 'optionC']">
          </mt-radio>
          <mt-radio
            title="分类3"
            v-model="value"
            :options="['optionA', 'optionB']">
          </mt-radio>
          <div class="btn-wrap">
            <mt-button class='btn-left' size='small' type='primary'>重置</mt-button>
            <mt-button class='btn-right' size='small' type='primary' @click='hidePopside()'>完成</mt-button>
          </div>
        </div>
      </div>
    </div>

    <v-footer></v-footer>
  </div>
  
  
</template>

<script>
import Footer from '@/common/_footer.vue'
import * as mockapi from '@/../mockapi'

export default {
  data() {
    return {
      selected: '1',
      popsideVisible: false,
      allQuery: {
        pageNo: 1,
        pageSize: 10,
      },
      allList: [],
      QYKQuery: {
        pageNo: 1,
        pageSize: 10,
      },
      QYKList: [],
      DDQuery: {
        pageNo: 1,
        pageSize: 10,
      },
      DDList: [],
      LTDBQuery: {
        pageNo: 1,
        pageSize: 10,
      },
      LTDBList: []
    }
  },
  components: {
     'v-footer':Footer
  },
  mounted() {
    this.getAllProductList()
    this.getQYKProductList()
    this.getLTDBProductList()
    this.getDDProductList()
  },
  methods: {
    // 所有商品加载更多
    getAllProductList() {
      mockapi.shop.api_Shop_getAllProductList_get({
        params: {
          pageNo: this.allQuery.pageNo,
          pageSize: this.allQuery.pageSize
        }
      }).then(res => {
        var data = res.data.data
        this.allList = this.allList.concat(data)
        this.allQuery.pageNo++
      })
    },
    loadMoreAll() {
      this.getAllProductList()
    },
    // 获取权益卡商品列表
    getQYKProductList() {
      mockapi.shop.api_Shop_getProductList_get({
        params: {
          pageNo: this.QYKQuery.pageNo,
          pageSize: this.QYKQuery.pageSize,
          ProductType: 'QYKL',
          ProjectType: ''
        }
      }).then(res => {
        var data = res.data.data
        this.QYKList = this.QYKList.concat(data)
        this.QYKQuery.pageNo++
      })
    },
    loadMoreQYK() {
      this.getQYKProductList()
    },
     // 获取旅游打包商品列表
    getLTDBProductList() {
      mockapi.shop.api_Shop_getProductList_get({
        params: {
          pageNo: this.LTDBQuery.pageNo,
          pageSize: this.LTDBQuery.pageSize,
          ProductType: 'LTDBL',
          ProjectType: ''
        }
      }).then(res => {
        var data = res.data.data
        this.LTDBList = this.LTDBList.concat(data)
        this.LTDBQuery.pageNo++
      })
    },
    loadMoreLTDB() {
      this.getLTDBProductList()
    },
     // 获取单独商品列表
    getDDProductList() {
      mockapi.shop.api_Shop_getProductList_get({
        params: {
          pageNo: this.DDQuery.pageNo,
          pageSize: this.DDQuery.pageSize,
          ProductType: 'DDL',
          ProjectType: ''
        }
      }).then(res => {
        var data = res.data.data
        this.DDList = this.DDList.concat(data)
        this.DDQuery.pageNo++
      })
    },
    loadMoreDD() {
      this.getDDProductList()
    },
    gotoDetail(i) {
      console.log()
      this.$router.push({path: '/shop/detail', query: {pid: i.id}})
    },
    back() {
      this.$router.go('-1')
    },
    showPopside() {
      this.popsideVisible = true
    },
    hidePopside() {
      this.popsideVisible = false
    }

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.back{
  position: absolute;
  z-index: 1000;
  width: 40px;
  height: 40px;
}
.wrap{
  margin-top: 50px;
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
