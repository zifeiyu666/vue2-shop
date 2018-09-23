<template lang="html">
  <div class="search-wrap">
    <v-header>
      <h1 slot="title">{{title}}</h1>
    </v-header>
    
    <!-- 搜索框 -->
    <div class='search-nav' style='background: #eee;height: 40px;padding-top: 10px;'>
      <div class="back" @click="selectRegion">
        <span>{{region}} <i class='iconfont icon-cert-down'></i></span>
      </div>
      <div class="input-wrap">
        <div class='input-inner-wrap'>
          <icon name='search'></icon>  
          <input type="text" placeholder='搜索'>
        </div>
        <button class='search-btn'>搜索</button>
      </div>
    </div>
    
    <!-- 搜索历史 -->
    <div class="search-history">
      <h2 class='title'>
        快速搜索
        <!-- <icon name='trash'></icon> -->
      </h2>
      <button>历史一</button>
      <button>历史二</button>
      <button>历史三</button>
      <button>历史三</button>
    </div>

    <!-- 选择城区 -->
    <mt-popup
      class='regionPicker'
      v-model="popupVisible"
      position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>

    <!-- 所有商品 -->
    <v-all fx='gwfx' :hideHead='true'></v-all>

    

    <!-- 返回顶部 -->
    <v-backtotop bottom="60px" right="10px">
      <i class='btn-to-top iconfont icon-fanhuidingbu'></i>
    </v-backtotop>

    
  </div>
  
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
import Baseline from '@/common/_baseline.vue'
import NorMore from '@/components/nomore'
import BackToTop from 'vue-backtotop'
import AllProduct from '@/common/_productList.vue'

export default {
  components: {
    'v-header':Header,
    'v-baseline': Baseline,
    'v-nomore': NorMore,
    'v-backtotop': BackToTop,
    'v-all': AllProduct
  },
  data() {
    return {
      selected: '1',
      title: '',
      slots: [
        {
          flex: 1,
          values: ['青岛市', '济南市', '烟台市', '潍坊市', '威海市', '菏泽市'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      popupVisible: false,
      region: '地区',
      pageNo: 1,
      pageSize: 10,
      isLastPage: false,
      allList: [],
      loading: false,
    }
  },
  mounted() {
    this.title = this.$route.query ? this.$route.query.title : ''
    this.getAllProductList()
  },
  methods: {
    onValuesChange(picker, values) {
      this.region = values[0] ? values[0] : '地区'
    },
    selectRegion() {
      this.popupVisible = true
    },
    back() {
      this.$router.go('-1')
    },
    // 所有商品加载更多
    getAllProductList() {
      this.isLoading = true
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_Shop_getAllProductList_get({
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          Title: '',
          ProductType: '',
          SuitableUser: '',
          DestinationType: '',
        }
      }).then(res => {
        var data = res.data.data.list
        this.pageNo++
        this.allList = this.allList.concat(data)
        this.isLastPage = res.data.data.pager.isLastPage
        this.$store.commit('SET_LOADING', false)
        this.isLoading = false
      }).catch(err => {
        this.$store.commit('SET_LOADING', false)
        this.isLoading = false
        console.log(err)
      })
    },
    loadMore() {
      if (!this.isLastPage) {
        this.getAllProductList()
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/utils.less';
.search-nav{
  .back{
    float: left;
    width: 70px;
    overflow: hidden;
    color: #666;
    line-height: 30px;
    height: 30px;
    font-size: 14px;
    box-sizing: border-box;
    span{
      display: inline-block;
      width: 100%;
      text-align: center;
    }
    .iconfont{
      color: #999;
      font-size: 10px;
    } 
  }
  
  .input-wrap{
    position: relative;
    margin-left: 70px;
    box-sizing: border-box;
    .search-btn{
      border-radius: 4px;
      background: @fontRed;
      color: #fff;
      position: absolute;
      right: 10px;
      top: 0;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      border-radius: 15px;
    }
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
    margin-right: 70px;
    position: relative;
    
    .fa-icon{
      position: absolute;
      top: 6px;
      left: 8px;
      color: #ccc;
    }
    
  }
  input{
    width: 100%;
    background: #fff;
    border: 1px solid #eee;
    line-height: 30px;
    height: 30px;
    padding: 0 10px 0px 30px;
    box-sizing: border-box;
    border-radius: 15px;
  }
}
.regionPicker{
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 100vw;
}

.mint-header{
  background: #eee;
  color: #666;
}
.null{
    height: 10px;
  }

.mint-navbar{
  background: #fff;
}

.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #FFAA00;
    color: #FFAA00;
    margin-bottom: -3px;
}
.search-history{
  .clearfix();
  background: #fff;
  padding-bottom: 10px;
  .title{
    padding: 10px;
    font-size: 12px;
    text-align: center;
    color: @fontGray;
  }
  .fa-icon{
    float: right;
    margin-right: 10px;
    color: #666;
    margin-top: 1px;
  }
  button{
    float: left;
    width: 20vw;
    text-align: center;
    font-size: 12px;
    padding: 6px 0px;
    box-sizing: border-box;
    border-radius: 22px; 
    margin: 2px 2.5vw;
  }
}
</style>
