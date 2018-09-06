<template lang="html">
  <div class="detail" v-loading='isLoading'>
    <div v-if='detail'>
      <v-share imgurl="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=91a426229082d158a4825fb1b00819d5/0824ab18972bd4077557733177899e510eb3096d.jpg" />
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
      isLoading: false
    }
  },
  mounted() {
    this.getDetail()
    // this.getCarNum()
  },
  methods: {
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
