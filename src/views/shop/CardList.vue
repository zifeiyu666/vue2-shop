<template>
  <div class="card_wrap">
    <v-header>
      <h1 slot="title">我的度假卡</h1>
    </v-header>
    <ul class="list">
      <li class="add" @click='addCard()'>
        <i class='iconfont icon-tianjia'></i>
      </li>
      <li v-for='item in 4'>
        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1401141749,1060310951&fm=26&gp=0.jpg" alt="">
        <div class="btn-list">
          <mt-button class='btn' size='small'>修改密码</mt-button>
          <mt-button class='btn' size='small'>解除绑定</mt-button>
          <mt-button class='btn' size='small' @click='goToBooking("123")'>预定酒店</mt-button>
          <mt-button class='btn' size='small' @click='goToHistory("123")'>预定记录</mt-button>
        </div>
      </li>
    </ul>
    <mt-popup
      class='popup'
      v-model="popupVisible"
      position="right">
      <mt-field label="卡号" placeholder="请输入卡号" v-model="cardnum"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-modal="password"></mt-field>
      <div class="btn-list">
        <mt-button size='large' class='confirm_btn' @click='confirmBanding()'>绑定</mt-button>
        <mt-button size='large' class='console_btn' @click='popupVisible = false'>取消</mt-button>
      </div>
    </mt-popup>

  </div>
</template>
<script>
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'

export default{
  components: {
    'v-header':Header,
  },
  data() {
    return {
      popupVisible: false,
      cardnum: '',
      password: ''
    }
  },
  methods: {
    addCard() {
      this.popupVisible = true
    },
    confirmBanding() {

    },
    goToHistory() {

    },
    goToBooking(id) {
      this.$router.push({path: '/shop/changecard', query: {id: id}})
    }
  }
}
</script>
<style lang='less'>
@import '../../assets/utils.less';
  .card_wrap{
    .list{
      width: 100%;
      li{
        margin: 15px;
        img{
          display: block;
          width: 100%;
          border-radius: 10px;
        }
      }
      .add{
        .iconfont{
          font-size: 40px;
          color: #bbb;
          line-height: 45vw;
        }
        background: #fff;
        text-align: center;
        height: 45vw;
        border: 2px dashed #ccc;
        border-radius: 10px;
      }
    }

    .popup{
      height: 100vh;
      width: 90vw;
      padding-top: 40px;
      .btn-list{
        margin: 10px;
        margin-top: 30px;
      }
      .confirm_btn{
        background:@fontRed;
        color: #fff;
        margin: 10px 0;
      }
      .console_btn{
        background: @bgCol;
        color: #333;
      }
    }
    
  }
</style>
