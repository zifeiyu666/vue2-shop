<template lang="html">
  <div class="detail" v-loading='isLoading'>
    <div class="header">
      <mt-header title="商品详情">
        <router-link to="/shop" slot="left">
          <mt-button icon="back">返回首页</mt-button>
        </router-link>
        <mt-button icon="search" slot="right" @click='goToSearch'></mt-button>
      </mt-header>
    </div>
    <div v-if='detail'>
      <v-share :imgurl="qrcode" />
      <v-swiper :imgList="detail.imgurl"></v-swiper>
      <v-chose :view="detail"></v-chose>
      <v-content :content='detail'></v-content>
      <v-backtotop bottom="60px" right="10px">
        <i class='btn-to-top iconfont icon-11'></i>
      </v-backtotop>
      <v-baseline></v-baseline>
      <v-footer  :detail="detail" :carnum="carnum"></v-footer>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/detail/swiper.vue'
import Chose from '@/components/detail/chose.vue'
import Content from '@/components/detail/content.vue'
import Footer from '@/components/detail/footer.vue'
import Baseline from '@/common/_baseline.vue'
import Share from '@/components/shareBtn.vue'
import BackToTop from 'vue-backtotop'
import qs from 'qs'
import * as mockapi from '@/../mockapi'
export default {
  components:{
    'v-swiper':Swiper,
    'v-chose':Chose,
    'v-content':Content,
    'v-footer':Footer,
    'v-baseline':Baseline,
    'v-share': Share,
    'v-backtotop': BackToTop
  },
  data() {
    return{
      detail: undefined,
      carnum: undefined,
      isLoading: false,
      qrcode: '',
      to: '',
      from: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      vm.to = to
      vm.from = from
    })
  },
  activated() {
    let that = this
    setTimeout(()=> {
      console.log('1222334455')
      console.log(that.from.name)
      if(that.from.name != '预定须知') {
        this.getDetail()
        this.getShareProductCode()
      } else {
        return 
      }
    }, 200)
  },
  mounted() {
    this.getDetail()
    this.getShareProductCode()
  },
  methods: {
    getShareProductCode() {
      mockapi.shop.api_Shop_GetProductQRCard_get({
        params:{
          token: this.$store.state.userInfo.MemberToken,
          Pid: this.$route.query.pid
        }
      }).then(res => {
        this.qrcode = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    getDetail() {
      this.isLoading = true
      mockapi.shop.api_Shop_getProduct_get({
        params:{
          token: this.$store.state.userInfo.MemberToken,
          Pid: this.$route.query.pid
        }
      }).then(res => {
        this.isLoading = false
        var data = res.data.data
        this.detail = data
      }).catch(err => {
        console.log(err)
        this.isLoading = false
      })
    },
    goToSearch() {
      this.$router.push({path: '/shop/search', query: {title: '全部商品'}})
    }
  },
  beforeCreate(){
    this.$store.dispatch('setDatas');
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/utils.less';
.header{
  background: #fff;
  header{
    height: 16vw;
    font-size: 16px;
    font-family: '微软雅黑';
  }
}
.mint-header{
  background: #fff !important;
  color: #333;
  box-shadow: 0px 0px 3px #aaa;
  z-index: 10;
  position: fixed;
  width: 100%;
  top: 0;
  left:0;
}
.detail {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 14vw;
  margin-top:16vw;
  // background: #fff;
}
.banner{
  width: 100%;
  display: block;
  height: 200px;
}
.pick{
  span, div, label{
    outline: 0!important;
  }
  label{
    box-shadow: 0 0 0 0!important;
  }
  
}

</style>
