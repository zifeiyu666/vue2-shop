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
          <mt-button class='btn' size='small'>预定酒店</mt-button>
          <mt-button size="large">确定</mt-button>
          <mt-button size="large">取消</mt-button>
        </div>
      </li>
    </ul>
    <mt-popup
      class='popup'
      v-model="popupVisible"
      position="right">
      <mt-field label="username" placeholder="Input username" v-model="username"></mt-field>
<mt-field label="email" placeholder="Input email" type="email" v-model="email"></mt-field>
<mt-field label="password" placeholder="Input password" type="password" v-modal="password"></mt-field>
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
      popupVisible: false
    }
  },
  methods: {
    addCard() {
      this.popupVisible = true
    }
  }
}
</script>
<style lang='less'>
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
    }
    
  }
</style>
