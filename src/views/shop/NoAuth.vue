<template>
  <div class='noauth' v-loading='isLoading'>
    <div class="img">
      <img ref='QRcode' :src='imgUrl' alt="" style='min-height: 40vh'>
      <div class="dec" v-if='!openid'>
        <p style='color: #666; text-align: center; margin-top: 10px'>长按上方二维码进行关注</p>
      </div>
      <div v-else>
        <p style='text-align: center; color: #666; margin-top: 10px'>长按图片识别二维码进行关注</p>
      </div>
    </div>

  </div>
  
</template>
<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      imgUrl: '',
      isLoading: true,
      openid: undefined
    }
  },
  created() {
    
  },
  mounted() {
    console.log(this.$refs)
    this.$refs.QRcode.onload = () => {
      console.log('loaded')
      this.isLoading = false
      Toast('您还未关注，请先关注。')
    }
    this.openid = this.$route.query.openid ? this.$route.query.openid : undefined
    this.getQRCard()
   
  },
  methods: {
    getQRCard() {
      if (!this.openid) {
        this.imgUrl = require('../../assets/qrcode.jpg')
        console.log(this.imgUrl)
        return
      }
      console.log(2223333)
      mockapi.shop.api_Shop_getUserSharedQRCode_get({
        params:{
          openid: this.openid
        }
      }).then(res => {
        this.imgUrl = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
  img{
    display: block;
    width: 100%;
    /* border: 1px solid #eee; */
  }
  .img{
    width: 90%;
    margin: 0 auto;
    padding: 20px 10px;
    box-sizing: border-box;
    background: #fff;
  }
  .noauth{
    padding-top: 20px;
    background: #999;
    height: 100%;
    box-sizing: border-box;
  }
  .dec{
    text-align: center;
    line-height: 20px;
    color: #333;
  }

</style>
