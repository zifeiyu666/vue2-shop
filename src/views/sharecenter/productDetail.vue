<template lang="html">
  <div class="detail" v-loading='isLoading'>
    <div v-if='detail'>
      <v-share :imgurl="qrcode" />
      <v-swiper :imgList="detail.imgurl"></v-swiper>
      <v-chose :view="detail"></v-chose>
      <v-content :content='detail'></v-content>
      <v-baseline></v-baseline>
      <!-- <v-footer :detail="detail" :carnum="carnum"></v-footer> -->
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

import qs from 'qs'
import * as mockapi from '@/../mockapi'
export default {
  components:{
    'v-swiper':Swiper,
    'v-chose':Chose,
    'v-content':Content,
    'v-footer':Footer,
    'v-baseline':Baseline,
    'v-share': Share
  },
  data() {
    return{
      detail: undefined,
      carnum: undefined,
      isLoading: false,
      qrcode: ''
    }
  },
  mounted() {
    this.getDetail()
    this.getShareProductCode()
    // this.getCarNum()
  },
  methods: {
    getShareProductCode() {
      mockapi.shop.api_Share_GetProductQRCard_get({
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
      mockapi.shop.api_Share_getProduct_get({
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
    }
  },
  beforeCreate(){
    this.$store.dispatch('setDatas');
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 14vw;
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
