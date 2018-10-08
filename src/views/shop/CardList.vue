<template>
  <div class="card_wrap">
    <v-header>
      <h1 slot="title">我的度假卡</h1>
    </v-header>
    <div class="add" @click='showPopup(1)'>
      <i class='iconfont icon-add'></i>
    </div>
    <ul 
      v-if='QYKlist.length > 0 && QYKlist[0]'
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      class="list">
      
      <li v-for='item in QYKlist' :key='item.Id'>
        <img v-lazy='item.ImageUrl' style='border: 1px solid #ddd' alt="">
        <div class="btn-list">
          <mt-button class='btn' size='small' @click='showPopup(2, item.Deliverable)'>修改密码</mt-button>
          <mt-button class='btn' size='small' @click='showPopup(3, item.Deliverable)'>解除绑定</mt-button>
          <mt-button class='btn' size='small' @click='goToBooking(item.Deliverable)'>预定酒店</mt-button>
          <mt-button class='btn' size='small' @click='goToHistory(item.Deliverable)'>预定记录</mt-button>
        </div>
      </li>
    </ul>
    <div v-else>
      <v-nomore></v-nomore>
    </div>
    <v-baseline v-if='isLastPage && QYKlist.length > 0'></v-baseline>
    <mt-popup
      class='popup_wrap'
      v-model="popupVisible"
      position="right">
      <div style='margin-top:18vw'></div>
      <mt-field label="卡号" placeholder="请输入卡号" v-model="cardnum"></mt-field>
      <mt-field v-if='showType==2' label="原密码" placeholder="请输入原密码" v-model="oldPw"></mt-field>
      
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pw"></mt-field>
      <div class="btn-list">
        <mt-button v-if='showType==1' size='large' class='confirm_btn' @click='confirmBanding()'>
          <span>绑定</span>
        </mt-button>
        <mt-button v-if='showType==2' size='large' class='confirm_btn' @click='changePw()'>
          <span >确定</span>
        </mt-button>
        <mt-button v-if='showType==3' size='large' class='confirm_btn' @click='cancelBanding()'>
          <span >解绑</span>
        </mt-button>
        <mt-button size='large' class='console_btn' @click='popupVisible = false'>取消</mt-button>
      </div>
    </mt-popup>

  </div>
</template>
<script>
import * as mockapi from '@/../mockapi'
import Header from '@/common/_header.vue'
import NoMore from '@/components/nomore'
import Baseline from '@/common/_baseline.vue'
import qs from 'qs'
import { Toast } from 'mint-ui'

export default{
  components: {
    'v-header':Header,
    'v-baseline': Baseline,
    'v-nomore': NoMore
  },
  data() {
    return {
      QYKlist: [],
      popupVisible: false,
      cardnum: '',
      pw: '',
      oldPw: '',
      showType: '',
      pageNo: 1,
      pageSize: 10,
      loading: false,
      isLastPage: false,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.isloading = true
      this.$store.commit('SET_LOADING', true);
      mockapi.shop.api_QYK_GetMyQuanYiKa_get({
        params: {
          token: this.$store.state.userInfo.MemberToken,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(res => {
        var data = res.data.data.list
        this.pageNo++
        this.QYKlist = this.QYKlist.concat(data)
        this.pageNo++
        this.isLastPage = res.data.data.pager.isLastPage
        this.$store.commit('SET_LOADING', false);
        this.isloading = false
      }).catch(err => {
        console.log(err)
        this.$store.commit('SET_LOADING', false);
        this.isloading = false
      })
    },
    loadMore() {
      console.log('loadmore')
      console.log({isLastPage: this.isLastPage})
      if (!this.isLastPage) {
        this.getList()
      }
    },
    showPopup(id, code) {
      this.cardnum = ''
      this.pw = ''
      this.oldPw = ''
      this.showType=id
      this.cardnum = code ? code : ''
      this.popupVisible = true
    },
    // 绑定
    confirmBanding() {
      this.$store.commit('SET_LOADING', true);
      mockapi.shop.api_QYK_BangDing_post({
        data: qs.stringify(
          {
            token: this.$store.state.userInfo.MemberToken,
            QuanYiKaHao: this.cardnum,
            QuanYiKaMiMa: this.pw
          }
        ) 
      }).then(res => {
        this.pageNo = 1
        this.QYKlist = []
        this.getList()
        Toast(res.data.msg)
        this.popupVisible = false
        this.$store.commit('SET_LOADING', false);
      }).catch(err => {
        console.log(err)
        this.$store.commit('SET_LOADING', false);
      })
    },
    // 解除绑定
    cancelBanding() {
      this.$store.commit('SET_LOADING', true);
      mockapi.shop.api_QYK_JieBang_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          QuanYiKaHao: this.cardnum,
          QuanYiKaMiMa: this.pw
        })
      }).then(res => {
        this.pageNo = 1
        this.QYKlist = []
        this.getList()
        Toast(res.data.msg)
        this.popupVisible = false
        this.$store.commit('SET_LOADING', false);
      }).catch(err => {
        console.log(err)
        this.$store.commit('SET_LOADING', false);
      })
    },
    // 修改密码
    changePw() {
      this.$store.commit('SET_LOADING', true);
      mockapi.shop.api_QYK_XiuGaiMiMa_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          QuanYiKaHao: this.cardnum,
          QuanYiKaMiMa: this.oldPw,
          NewQuanYiKaMiMa: this.pw
        })
      }).then(res => {
        this.pageNo = 1
        this.QYKlist = []
        this.getList()
        Toast(res.data.msg)
        this.popupVisible = false
        this.$store.commit('SET_LOADING', false);
      }).catch(err => {
        console.log(err)
        this.$store.commit('SET_LOADING', false);
      })
    },

    goToHistory(id) {
      this.$router.push({path: '/shop/bookhistory', query: {id: id}})
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
    .add{
      margin: 15px;
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
    .list{
      width: 100%;
      li{
        margin: 15px;
        
        img{
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .btn-list{
          margin-top:5px;
          padding-bottom: 10px;
          // margin-left: 10px;
          .btn{
            background: #fff;
          }
        }
      }
      
    }

    .popup_wrap{
      height: 100vh;
      width: 90vw;
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
