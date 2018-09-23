<template lang="html">
  <div>
    <div class="search-wrap">
      <v-header>
        <h1 slot="title">分销产品</h1>
      </v-header>
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
            <mt-tab-item id="1" ref='all'>全部</mt-tab-item>
            <mt-tab-item id="2" ref='qyk'>权益卡</mt-tab-item>
            <mt-tab-item id="3" ref='dbl'>旅游打包类</mt-tab-item>
            <mt-tab-item id="4" ref='ddl'>单独类</mt-tab-item>
          </mt-navbar>
        </div>
        <div class="btn" style='margin-top:0; color: #666' @click='showPopside()'>
          <i class='iconfont icon-fenlei'></i>
        </div>
      </div>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="product_list_wrap">
            <ul class="something" v-if='allList.length != 0'>
              <li v-for="(k,i) in allList" @click='gotoDetail(k)' :key="i">
                <div class="something-middle">
                  <img :src="k.imgurl[0]">
                </div>
                <div class="something-right">
                  <p>{{k.title}}</p>
                  <!-- <p style="color:rgb(199, 108, 28);">规格：{{k.propname}}</p> -->
                  <p style="color:rgb(199, 108, 28);"> {{k.intro}}</p>
                  <p>￥{{k.price}} </p>
                  <!-- <div class="something-right-bottom">
                    <span @click='deleteCollection(k)'></span>
                  </div> -->
                </div>
              </li>
            </ul>
            <div v-else>
              <v-nomore></v-nomore>
            </div>
            <div v-if='allList.length != 0' style='text-align: center; margin: 40px'>
              <mt-button @click='loadMoreAll' v-if='allQuery.loadMore'>加载更多</mt-button>
              <v-baseline v-else></v-baseline>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="wrap">
            <ul class="something" v-if='QYKList.length != 0'>
              <li v-for="(k,i) in QYKList" @click='gotoDetail(k)' :key="i">
                <div class="something-middle">
                  <img :src="k.imgurl[0]">
                </div>
                <div class="something-right">
                  <p>{{k.title}}</p>
                  <!-- <p style="color:rgb(199, 108, 28);">规格：{{k.propname}}</p> -->
                  <p style="color:rgb(199, 108, 28);height: 20px;"> {{k.intro}}</p>
                  <p>￥{{k.price}} </p>
                  <!-- <div class="something-right-bottom">
                    <span @click='deleteCollection(k)'></span>
                  </div> -->
                </div>
              </li>
            </ul>
            <div v-else>
              <v-nomore></v-nomore>
            </div>
            <div v-if='QYKList.length != 0' style='text-align: center'>
              <mt-button @click='loadMoreQYK' v-if='QYKQuery.loadMore'>加载更多</mt-button>
              <v-baseline v-else></v-baseline>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="wrap">
            <ul class="something" v-if='LTDBList.length != 0'>
              <li v-for="(k,i) in LTDBList" @click='gotoDetail(k)' :key="i">
                <div class="something-middle">
                  <img :src="k.imgurl[0]">
                </div>
                <div class="something-right">
                  <p>{{k.title}}</p>
                  <!-- <p style="color:rgb(199, 108, 28);">规格：{{k.propname}}</p> -->
                  <p style="color:rgb(199, 108, 28);height: 20px;"> {{k.intro}}</p>
                  <p>￥{{k.price}} </p>
                  <!-- <div class="something-right-bottom">
                    <span @click='deleteCollection(k)'></span>
                  </div> -->
                </div>
              </li>
            </ul>
            <div v-else>
              <v-nomore></v-nomore>
            </div>
            <div v-if='LTDBList.length != 0' style='text-align: center'>
              <mt-button @click='loadMoreLTDB' v-if='LTDBQuery.loadMore'>加载更多</mt-button>
              <v-baseline v-else></v-baseline>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div class="wrap">
            <ul class="something" v-if='DDList.length != 0'>
              <li v-for="(k,i) in DDList" @click='gotoDetail(k)' :key="i">
                <div class="something-middle">
                  <img :src="k.imgurl[0]">
                </div>
                <div class="something-right">
                  <p>{{k.title}}</p>
                  <!-- <p style="color:rgb(199, 108, 28);">规格：{{k.propname}}</p> -->
                  <p style="color:rgb(199, 108, 28);height: 20px;"> {{k.intro}}</p>
                  <p>￥{{k.price}}</p>
                  <!-- <div class="something-right-bottom">
                    <span @click='deleteCollection(k)'></span>
                  </div> -->
                </div>
              </li>
            </ul>
            <div v-else>
              <v-nomore></v-nomore>
            </div>
            <div style='text-align: center' v-if='DDList.length != 0'>
              <mt-button @click='loadMoreDD' v-if='DDQuery.loadMore'>加载更多</mt-button>
              <v-baseline v-else></v-baseline>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="search-history">
      </div>

      
    </div>

    <div class="popside-wrap" v-if='popsideVisible'>
      <div class="shade"></div>
      <div class="main">
        <div class='inner-wrap'>
          <mt-field label="标题" v-model='title' placeholder='请输入'></mt-field>
          <mt-radio
            v-if = 'ProductOptions.length != 0'
            title="类型"
            v-model="ProductValue"
            :options="ProductOptions">
          </mt-radio>
          <mt-radio
            v-if = 'SuitableOptions'
            title="使用人群"
            v-model="SuitableValue"
            :options="SuitableOptions">
          </mt-radio>
          <mt-radio
            v-if = 'DestinationOptions'
            title="目的地类型"
            v-model="DestinationValue"
            :options="DestinationOptions">
          </mt-radio>
          <div class="btn-wrap">
            <mt-button @click='concleSearch()' class='btn-left' size='small' type='primary'>取消</mt-button>
            <mt-button @click='confirmSearch()' class='btn-right' size='small' type='primary'>完成</mt-button>
          </div>
        </div>
      </div>
    </div>

    <!-- <v-footer></v-footer> -->
  </div>
  
  
</template>

<script>
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import * as mockapi from '@/../mockapi'
import NorMore from '@/components/nomore'
import Header from '@/common/_header.vue'

export default {
  data() {
    return {
      selected: '1',
      title: '',
      popsideVisible: false,
      SuitableOptions: [],
      ProductOptions: [],
      DestinationOptions: [],
      DestinationValue: '',
      SuitableValue: '',
      ProductValue: '',
      ProjectType: '',
      allQuery: {
        pageNo: 1,
        pageSize: 10,
        loadMore: true
      },
      allList: [],
      QYKQuery: {
        pageNo: 1,
        pageSize: 10,
        loadMore: true
      },
      QYKList: [],
      DDQuery: {
        pageNo: 1,
        pageSize: 10,
        loadMore: true
      },
      DDList: [],
      LTDBQuery: {
        pageNo: 1,
        pageSize: 10,
        loadMore: true
      },
      LTDBList: []
    }
  },
  components: {
    'v-baseline': Baseline,
    'v-footer':Footer,
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
      return
    }
    
    this.getAllProductList()
    this.getQYKProductList()
    this.getLTDBProductList()
    this.getDDProductList()
    this.getProductTypeDicList()
    this.getSuitableUserDicList()
    this.getDestinationTypeDicList()
    // TODO: 暂时不好用
    if (this.$route.query.id) {
      // this.selected = this.$route.query.id
      switch (this.$route.query.id) {
        case 2:
          var selDOM = this.$refs.qyk.$el
          break
        case 3:
          var selDOM = this.$refs.dbl.$el
          break
        case 4:
          var selDOM = this.$refs.ddl.$el
          break
      }
      
      //IE
      if(document.all) {
          selDOM.click();
      }
      // 其它浏览器
      else {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);//这里的click可以换成你想触发的行为
        selDOM.dispatchEvent(e);//这里的clickME可以换成你想触发行为的DOM结点
      }  
    }
  },
  methods: {
    concleSearch() {
      this.popsideVisible = false
    },
    confirmSearch() {
      this.allList = []
      this.QYKList = []
      this.DDList = []
      this.LTDBList = []
      this.getAllProductList()
      this.getQYKProductList()
      this.getLTDBProductList()
      this.getDDProductList()
      this.popsideVisible = false
    },
    getDestinationTypeDicList() {
      mockapi.shop.api_Shop_getDicEntryList_get({
        params: {
          typeCode: "DestinationType",
        }
      }).then(res => {
        var data = res.data.data
        data.forEach((item, index) => {
          this.DestinationOptions.push({
            label: item.EntryName,
            value: item.EntryCode
          })
        })
      })
    },
    getProductTypeDicList() {
      mockapi.shop.api_Shop_getDicEntryList_get({
        params: {
          typeCode: "ProductType",
        }
      }).then(res => {
        var data = res.data.data
        data.forEach((item, index) => {
          this.ProductOptions.push({
            label: item.EntryName,
            value: item.EntryCode
          })
        })
      })
    },
    getSuitableUserDicList() {
      mockapi.shop.api_Shop_getDicEntryList_get({
        params: {
          typeCode: "SuitableUser",
        }
      }).then(res => {
        var data = res.data.data
        data.forEach((item, index) => {
          this.SuitableOptions.push({
            label: item.EntryName,
            value: item.EntryCode
          })
        })
      })
    },
    // 所有商品加载更多
    getAllProductList() {
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_Channel_getProductList_get({
        params: {
          pageNo: this.allQuery.pageNo,
          pageSize: this.allQuery.pageSize,
          Title: this.title,
          ProductType: this.ProductValue,
          ProjectType: this.ProjectType,
          SuitableUser: this.SuitableValue,
          DestinationType: this.DestinationValue,
          token: this.token
        }
      }).then(res => {
        this.$store.commit('SET_LOADING', false)
        var data = res.data.data.list
        var isLastPage = res.data.data.pager.isLastPage
        if (isLastPage) {
          this.allQuery.loadMore = false
        }
        this.allList = this.allList.concat(data)
        console.log({allList: this.allList})
        // this.allQuery.pageNo++
      }).catch(err => {
        this.$store.commit('SET_LOADING', false)
        console.log(err)
      })
    },
    loadMoreAll() {
      this.allQuery.pageSize++
      this.getAllProductList()
    },
    // 获取权益卡商品列表
    getQYKProductList() {
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_Channel_getProductList_get({
        params: {
          ProjectType: '',
          pageNo: this.QYKQuery.pageNo,
          pageSize: this.QYKQuery.pageSize,
          ProductType: 'QYKL',
          Title: '',
          SuitableUser: '',
          DestinationType: '',
          token: this.token
        }
      }).then(res => {
        this.$store.commit('SET_LOADING', false)
        var data = res.data.data.list
        var isLastPage = res.data.data.pager.isLastPage
        if (isLastPage) {
          this.QYKQuery.loadMore = false
        }
        this.QYKList = this.QYKList.concat(data)
        // this.QYKQuery.pageNo++
      }).catch(err => {
        console.log(err)
        this.$store.commit('SET_LOADING', false)
      })
    },
    loadMoreQYK() {
      this.QYKQuery.pageSize++
      this.getQYKProductList()
    },
     // 获取旅游打包商品列表
    getLTDBProductList() {
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_Channel_getProductList_get({
        params: {
          ProjectType: '',
          pageNo: this.LTDBQuery.pageNo,
          pageSize: this.LTDBQuery.pageSize,
          ProductType: 'LTDBL',
          Title: this.title,
          SuitableUser: this.SuitableValue,
          DestinationType: this.DestinationValue,
          token: this.token
        }
      }).then(res => {
        this.$store.commit('SET_LOADING', false)
        var data = res.data.data.list
        var isLastPage = res.data.data.pager.isLastPage
        if (isLastPage) {
          this.LTDBQuery.loadMore = false
        }
        this.LTDBList = this.LTDBList.concat(data)
        // this.LTDBQuery.pageNo++
      }).catch(err => {
        console.log(err)
        this.$store.commit('SET_LOADING', false)
      })
    },
    loadMoreLTDB() {
      this.LTDBQuery.pageSize++
      this.getLTDBProductList()
    },
     // 获取单独商品列表
    getDDProductList() {
      this.$store.commit('SET_LOADING', false)
      mockapi.shop.api_Channel_getProductList_get({
        params: {
          ProjectType: '',
          pageNo: this.DDQuery.pageNo,
          pageSize: this.DDQuery.pageSize,
          ProductType: 'DDL',
          Title: this.title,
          SuitableUser: this.SuitableValue,
          DestinationType: this.DestinationValue,
          token: this.token
        }
      }).then(res => {
        this.$store.commit('SET_LOADING', false)
        var data = res.data.data.list
        var isLastPage = res.data.data.pager.isLastPage
        if (isLastPage) {
          this.DDQuery.loadMore = false
        }
        this.DDList = this.DDList.concat(data)
        // this.DDQuery.pageNo++
      }).catch(err => {
        console.log(err)
        this.$store.commit('SET_LOADING', false)
      })
    },
    loadMoreDD() {
      this.DDQuery.pageSize++
      this.getDDProductList()
    },
    gotoDetail(i) {
      console.log()
      this.$router.push({path: '/channelcenter/detail', query: {pid: i.id}})
    },
    back() {
      this.$router.go('-1')
    },
    showPopside() {
      this.popsideVisible = true
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
.product_list_wrap{
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
  top:16vw;
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
    width: 80vw;
    height: 100vh;
    box-sizing: border-box;
    position: absolute;
    left: 20vw;
    top: 0;
    overflow: auto;
    .inner-wrap{
      margin-bottom: 115px;
    }
    .btn-wrap{
      position: fixed;
      bottom: 0px;
      right: 0px;
      width: 80vw;
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

</style>
