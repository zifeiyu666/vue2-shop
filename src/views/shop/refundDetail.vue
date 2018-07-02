<template>
  <div>
    <v-header>
      <h1 slot="title">退款详情</h1>
    </v-header>
    <div class="time">
      <div v-if='productDetail.IsRefund=="1"'>
        <div class="left">
          <span><i class='icon-clock iconfont'></i> 退款成功</span>
          <p>退款时间：{{productDetail.RefundTime.slice(0, 10) + ' ' + productDetail.RefundTime.slice(11, 19)}}</p>
        </div>
      </div>
      <div v-if='productDetail.IsRefund=="0"'>
        <div class="left">
          <span><i class='icon-clock iconfont'></i> 未退款</span>
          <p>申请时间：{{productDetail.RefundTime.slice(0, 10) + ' ' + productDetail.RefundTime.slice(11, 19)}}</p>
        </div>
      </div>
      
    </div>
    <div class='wrap' v-if='productDetail'>
      <p style=' font-size: 16px;'>{{productDetail.producttitle}}</p>
      <!-- <p style="color:rgb(199, 108, 28);height: 20px;"> {{productDetail.intro}}</p> -->
      <p style="color:rgb(199, 108, 28);height: 20px;">退款原因：{{productDetail.RefundReason}}</p>
      <p>退款状态： {{ productDetail.IsRefund == 1 ? '已退款' : '未退款'}}</p>
      <p style="color:rgb(199, 108, 28);height: 20px;">退款金额：{{productDetail.RefundAmount}}</p>
      <p>申请时间：{{ productDetail.ApplyTime.slice(0, 10) + ' ' + productDetail.ApplyTime.slice(11, 19) }}</p>
    </div>
  </div>
  
</template>
<script>
import {Toast} from 'mint-ui'
import Footer from '@/common/_footer.vue'
import * as mockapi from '@/../mockapi'

import Header from '@/common/_header.vue'
  export default{
    data() {
      return {
        productDetail: undefined,
        reason: ''
      }
    },
    components: {
      'v-header':Header
    },
    mounted() {
      this.getRefundDetail()
    },
    methods: {
      getRefundDetail() {
        mockapi.shop.api_Shop_getRefundApply_get({
          params: {
            token: this.$store.state.userInfo.MemberToken,
            Id: this.$route.query.pid
          }
        }).then(res => {
          this.productDetail = res.data.data
        })
      }
    }
  }
</script>
<style lang="less" scoped>
@import '../../assets/fz.less';
.time{
  padding: 30px 20px 40px 20px;
  background: linear-gradient(120deg, rgb(252, 64, 44),  rgb(252, 90, 44), rgb(252, 130, 48));
  color: #fff;
  .left{
    float: left;
    font-size: 18px;
  }
  .right{
    font-size: 14px;
    float: right;
  }
}
.time:after{
  content: '';
  display: block;
  clear: both;
}
.wrap{
  p{
    // margin-bottom: 5px;
    padding: 8px 10px;
    border-bottom: 1px solid #eee;
  }
}
</style>

