<template lang="html">
  <footer class="footer">     
    <div class="footer-result">
      <p>共 {{count}} 件商品</p>
      <p>合计：<span> {{allpay}} </span>元</p>
    </div>
    <!-- 加入购物车 -->
    <mt-popup
      style='overflow: auto; max-height: 95vh'
      v-model="popupVisible"
      position="bottom">
      <div class='shopcar'>
        <div>
          <!-- 联系人信息 -->
          <div class="type_wrap">
              <p class="type_title">信息填写</p>
              <el-form ref="form" :model="form" label-width="65px">
                  <el-form-item label="联系人">
                      <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话">
                      <el-input v-model="form.phone"></el-input>
                      <span style='font-size: 12px; color:#666; position: relative; top: -8px'><span style='color: #ff4545'>*</span>请准确填写，用于接收通知</span>
                  </el-form-item>
                  <el-form-item label="邮寄地址">
                      <el-input v-model="form.address"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号">
                      <el-input v-model="form.idCard"></el-input>
                  </el-form-item>
              </el-form>  
              
            </div>
            <div class="type_wrap">
              <p>合计：<span> {{allpay}} </span>元</p>
            </div>

        </div>

        <div class="bottm-btn-group bottom clearfix">
          <div>
            <mt-button class='confirm-btn' @click='goPay'>微信支付</mt-button>
            <mt-button class='concel-btn' @click='consolePay'>取消</mt-button>
          </div>         
        </div>
      </div>
    </mt-popup>
    <!-- <router-link :to="{ path: '/shop/all'}" class="footer-goon" >
      继续购物
    </router-link> -->
    <a class="footer-pay" @click="addContact">
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
  props: ['canSubmit'],
  data() {
    return {
      params: [],
      form: {
        name: '',
        address: '',
        idCard: '',
        phone: ''
      },
      popupVisible: false,
    }
  },
  watch: {
    carList() {
      this.carList.forEach((item, i) => {
        this.params.push({propid: item.propid, num: item.num})
      })
    }
  },
  mounted() {

  },
  methods:{
    addContact() {
      if (this.canSubmit) {
        this.popupVisible = true
      } else {
        Toast('请先仔细阅读须知并勾选')
      }
    },
    consolePay() {
      this.popupVisible = false
    },
    //点击跳转到支付页
    goPay(){
      console.log(this.$store.state.userInfo.MemberToken)
      console.log(this.params)
      mockapi.shop.api_Shop_generateCarOrder_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          // TODO: 这里参数传递有问题，需要后台解析
          params: this.params,
          Contacts: this.form.name,
          Address: this.form.address,
          Phone: this.form.phone,
          IdNum: this.form.idCard
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
  .mint-popup{
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .confirm-btn{
    color: #fff;
  }
  .shopcar{
    padding: 15px;
    // padding-bottom: 60px;
    p{
      word-break: break-all;
    }
    .bottom{
      // position: absolute;
      // bottom: 0;
      // width: 100vw;
      // left:0;
      button{
        width: 50%;
        float:left;
        box-sizing: border-box;
        border-radius: 0;
      }
    }
  }
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
