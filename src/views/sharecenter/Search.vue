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
          <el-input type="text" v-model='searchForm.KeyWord' placeholder='搜索' ></el-input>
        </div>
        <button class='search-btn' @click='this.getProductList'>搜索</button>
      </div>
    </div>
    
    <!-- 快速搜索 -->
    <div class="search-history">
      <h2 class='title'>
        快速搜索
        <!-- <icon name='trash'></icon> -->
      </h2>
      <button @click='quickSearch(item)' v-for='(item, index) in quickSearchList' :key='index'>{{item}}</button>
    </div>

    <!-- 选择城区 -->
    <mt-popup
      class='regionPicker'
      v-model="popupVisible"
      position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>

    <!-- 所有商品 -->
    <v-all fx='gwfx' ref='productList' :hideHead='true' :searchForm="searchForm" :fxtype='fxtype'></v-all>

    

    <!-- 返回顶部 -->
    <v-backtotop bottom="60px" right="10px">
      <i class='btn-to-top iconfont icon-11'></i>
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
import AllProduct from '@/common/share/_productList.vue'

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
          values: ['全部', '青岛', '济南', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
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
      searchForm: {
        ProductType: '',
        ProjectType: '',
        Title: '',
        SuitableUser: '',
        DestinationType: '',
        KeyWord: '',
        City: '',
        Classification: '',
        IsMain: '',
        IsLimitTime: ''
      },
      isFirstLoaded: true,
      quickSearchList: []
    }
  },
  created() {
    this.title = this.$route.query ? this.$route.query.title : ''
    this.fxtype = this.$route.query.type ? this.$route.query.type : ''
    let keyWord = this.$route.query ? this.$route.query.keyWord : ''

    if (keyWord) {
      this.$set(this.searchForm, 'KeyWord', keyWord)
    }

    switch (this.title)
    {
      case '嗨周末':
        this.$set(this.searchForm, 'Classification', 'hzm')
        break;
      case '乐假日':
        this.$set(this.searchForm, 'Classification', 'ljr')
        break;
      case '享度假':
        this.$set(this.searchForm, 'Classification', 'xdj')
        break
      case '直通车':
        this.$set(this.searchForm, 'Classification', 'ztc')
        break
      case '门票':
        this.$set(this.searchForm, 'Classification', 'mp')
        break
      case '研学旅行':
        this.$set(this.searchForm, 'Classification', 'yx')
        break
      case '特产':
        this.$set(this.searchForm, 'Classification', 'tc')
        break
      case '精品推荐':
        this.$set(this.searchForm, 'IsMain', 1)
        break
      case '限时抢购':
        this.$set(this.searchForm, 'IsLimitTime', 1)
        break
      default: 
        return
    }
  },
  mounted() {
    this.initQuickSearch()
  },
  methods: {
    // 快速搜索
    initQuickSearch() {
      this.$store.commit('SET_LOADING', true)
       mockapi.shop.api_Shop_getKeyWord_get({
        params: {
          token: this.$store.state.userInfo.MemberToken
        }
      }).then(res => {
        var data = res.data.data
        this.quickSearchList = data.split(',')
        this.$store.commit('SET_LOADING', false)
      }).catch(err => {
        this.$store.commit('SET_LOADING', false)
        console.log(err)
      })
    },
    quickSearch(item) {
      this.$set(this.searchForm, 'KeyWord', item)
      this.getProductList()
    },
    // 地区搜索
    onValuesChange(picker, values) {
      this.region = values[0] ? values[0] : '地区'
      switch (this.region)
      {
        case '青岛':
          this.$set(this.searchForm, 'City', 'qingdao')
          break
        case '济南':
          this.$set(this.searchForm, 'City', 'jinan')
          break
        case '淄博':
          this.$set(this.searchForm, 'City', 'zibo')
          break
        case '枣庄':
          this.$set(this.searchForm, 'City', 'zaozhuang')
          break
        case '东营':
          this.$set(this.searchForm, 'City', 'dongying')
          break
        case '烟台':
          this.$set(this.searchForm, 'City', 'yantai')
          break
        case '潍坊':
          this.$set(this.searchForm, 'City', 'weifang')
          break
        case '济宁':
          this.$set(this.searchForm, 'City', 'jining')
          break
        case '泰安':
          this.$set(this.searchForm, 'City', 'taian')
          break
        case '威海':
          this.$set(this.searchForm, 'City', 'weihai')
          break
        case '日照':
          this.$set(this.searchForm, 'City', 'rizhao')
          break
        case '莱芜':
          this.$set(this.searchForm, 'City', 'laiwu')
          break
        case '临沂':
          this.$set(this.searchForm, 'City', 'linyi')
          break
        case '德州':
          this.$set(this.searchForm, 'City', 'dezhou')
          break
        case '聊城':
          this.$set(this.searchForm, 'City', 'liaocheng')
          break
        case '滨州':
          this.$set(this.searchForm, 'City', 'binzhou')
          break
        case '菏泽':
          this.$set(this.searchForm, 'City', 'qingdao')
          break
        default: 
          this.$set(this.searchForm, 'City', '')
          break
      }
      if (!this.isFirstLoaded) {
        this.getProductList()
      } else {
        this.isFirstLoaded = false
      }
      
    },
    selectRegion() {
      this.popupVisible = true
    },
    back() {
      this.$router.go('-1')
    },
    // 所有商品加载更多
    getProductList() {
      console.log(111)
      console.log(this.$refs)
      console.log(this.$refs.productList.getAllProductList)
      this.$refs.productList.getAllProductList(true)
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
