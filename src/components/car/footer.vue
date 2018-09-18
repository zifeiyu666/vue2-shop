<template lang="html">
  <footer class="footer">
    <!-- 去掉购物积分相关 -->
    <!-- <div class="jf" v-if="score">
      <mt-field label="积分抵扣:" placeholder="请输入要使用的积分" type="number" v-model="usescore" ></mt-field>
      <div class="totalScore">
        <span>当前可用积分：{{score}}</span>
        <p>可抵扣金额：{{usescore/scoreRate}}元</p>
      </div>
    </div> -->
        
    <div class="footer-result">
      <p>共 {{count}} 件商品</p>
      <p>合计：<span> {{allpay}} </span>元</p>
    </div>
    <!-- <router-link :to="{ path: '/shop/all'}" class="footer-goon" >
      继续购物
    </router-link> -->
    <a class="footer-pay" @click="goPay">
      去结算
    </a>
  </footer>

</template>

<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import * as mockapi from '@/../mockapi'
import qs from 'qs'

export default {
  computed:{
    // 勾选的商品数量
    // count(){
    //   // 如果已选择列表为空 就返回0
    //   if(this.$store.getters.selectedList==undefined) {
    //     return 0
    //   }else {

    //     return this.$store.getters.selectedList.length
    //   }
    // },
    carList() {
      return this.$store.state.carList
    },
    count() {
      return this.$store.state.allJS ? this.$store.state.allJS : 0
    },
    allpay() {
      return this.$store.state.allMoney ? this.$store.state.allMoney : 0
    }
  },
  data() {
    return {
      params: [],
      score: '',
      usescore: '',
      scoreRate: '' //提现比例
    }
  },
  watch: {
    carList() {
      console.log('carlist')
      console.log(this.carList)
      this.carList.forEach((item, i) => {
        this.params.push({propid: item.propid, num: item.num})
      })
      console.log('params')
      console.log(this.params)
      console.log(qs.stringify({params: this.params}))
      // this.params = JSON.stringify(this.params)
    },
    usescore() {
      if (this.usescore > this.score || this.usescore > (this.allpay*this.scoreRate)) {
        this.usescore = this.score > this.allpay*this.scoreRate ? this.allpay*this.scoreRate : this.score
        Toast('不能超过最大可用积分')
      } else if (isNaN(parseInt(this.usescore)) ) {
        // this.usescore = '0'
        Toast('请输入整形数字')
      }
    }
  },
  mounted() {
    this.getScore()
    this.getScoreRate()
  },
  methods:{
    getScore() {
      mockapi.shop.api_Shop_getMyScore_get({
        params: {
          type: 1,
          token: this.$store.state.userInfo.MemberToken
        }
      }).then(res => {
        var data = res.data.data
        this.score = data
      })
    },
    getScoreRate() {
      mockapi.shop.api_Shop_getRatio_get({
        params: {
          type: 1,
          token: this.$store.state.userInfo.MemberToken
        }
      }).then(res => {
        var data = res.data.data
        this.scoreRate = data
      })
    },
    //点击跳转到支付页
    goPay(){
      if(this.usescore && isNaN(parseInt(this.usescore))) {
        Toast('请输入正确的积分格式')
        return 
      }
      console.log(this.$store.state.userInfo.MemberToken)
      console.log(this.params[0].propid)
      mockapi.shop.api_Shop_generateCarOrder_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          // TODO: 这里参数传递有问题，需要后台解析
          params: this.params,
          Score: this.usescore ? this.usescore : 0
        })
      }).then(res => {
        var data = res.data.data
        this.$router.push({path: '/shop/order', query: {orderno: data.orderno, orderid: data.orderid}})
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/utils.less';
  .jf{
    position: fixed;
    bottom: 16vw;
    padding: 10px 5px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    margin-top: 20px;
    border-top: none;
    .totalScore{
      text-align: right;
      padding: 0px 10px;
      span{
        font-size: 12px;
        color: #FFAA00;
      }
    }
  }
  .footer {
    width: 100%;
    height: 16vw;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    .footer-result,a {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
    }

    .footer-result {
      p {
        font-size: 12px;
        color: #999;
      }

      p:last-of-type {

        padding: 1vw 0  1vw 0;
        font-size: 16px;
        color: @fontBlack;
        span {
          color:@cl;
          font-size: 20px;
        }
      }
    }

    .footer-goon {
      background-color: #ff4800;
      color: #fff;
      line-height: 16vw;
    }

    .footer-pay {
      background-color: @cl;
      line-height: 16vw;
      color:#fff;
    }

  }
</style>
