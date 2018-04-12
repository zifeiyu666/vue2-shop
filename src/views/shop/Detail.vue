<template lang="html">
  <div class="detail" v-if="detail">
    <v-swiper :imgList="detail.imgurl"></v-swiper>
    <v-chose :view="detail"></v-chose>
    <v-content :content='detail'></v-content>
    <v-baseline></v-baseline>
    <v-footer :detail="detail" :carnum="carnum"></v-footer>
  </div>
</template>

<script>
import Swiper from '@/components/detail/swiper.vue'
import Chose from '@/components/detail/chose.vue'
import Content from '@/components/detail/content.vue'
import Footer from '@/components/detail/footer.vue'
import Baseline from '@/common/_baseline.vue'

import qs from 'qs'
import * as mockapi from '@/../mockapi'
export default {
  components:{
    'v-swiper':Swiper,
    'v-chose':Chose,
    'v-content':Content,
    'v-footer':Footer,
    'v-baseline':Baseline
  },
  data() {
    return{
      detail: undefined,
      carnum: undefined
    }
  },
  mounted() {
    this.getDetail()
    this.getCarNum()
  },
  methods: {
    getDetail() {
      mockapi.shop.api_Shop_getProduct_get({
        params:{
          Pid: this.$route.query.pid
        }
      }).then(res => {
        var data = res.data.data
        this.detail = data
      })
    },
    getCarNum() {
      mockapi.shop.api_Shop_getMyCarCount_get({
        params:{
          token: this.$store.state.userInfo.MemberToken
        }
      }).then(res => {
        var data = res.data.data
        this.carnum = data
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
  padding-bottom: 14vw;
}
.banner{
  width: 100%;
  display: block;
  height: 200px;
}
</style>
