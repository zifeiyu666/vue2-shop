<template>
  <div class="product_list_wrap">
    <ul
      class="something"
      v-if='allList.length != 0'
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="0"
      >
      <li style='height: auto' v-for="(k,i) in allList" @click='gotoDetail(k)' :key="i">
        <div class="something-middle">
          <img  v-lazy="k.BiaoTiTuPianList[0]">
        </div>
        <div class="something-right">
          <p>{{k.FangYuanBiaoTi}}</p>
          <p>{{k.JianJie}}</p>
        </div>
      </li>
    </ul>
    <div v-else>
      <v-nomore></v-nomore>
    </div>
    <v-baseline v-if='isLastPage'></v-baseline>
    <!-- 酒店详情 -->
    <mt-popup
      v-if='currentHotel'
      class='popup'
      v-model="popupVisible"
      position="bottom">
      <div style='max-height: 80vh; overflow: auto'>
        <div>
          <img v-lazy="currentHotel.BiaoTiTuPianList[0]" alt="">
        </div>
        <div>
          <div v-html='currentHotel.XiangQing'></div>
        </div>
        <div class='btn-wrap'>
          <mt-button class='book-btn' size='large' type='danger' @click='bookHotel'>预定</mt-button>
        </div>
      </div>
    </mt-popup>

  </div>
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import NorMore from '@/components/nomore'
import Baseline from '@/common/_baseline.vue'
import { Toast } from 'mint-ui'

export default {
  components: {
    'v-nomore': NorMore,
    'v-baseline': Baseline,
  },
  props: {
    startTime: {
      required: true
    },
    endTime: {
      required: true
    }
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      isLastPage: false,
      allList: [],
      isLoading: false,
      currentHotel: '',
      popupVisible: false
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    // 所有商品加载更多
    getList(isSearch) {
      if (isSearch) {
        this.pageNo = 1
      }
      this.isLoading = true
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_FangYuan_GetKeYuYongList_get({
        params: {
          token: this.$store.state.userInfo.MemberToken,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          QuanYiKaHao: this.$route.query.id,
          KaiShiSJ: this.startTime,
          JieShuSJ: this.endTime
        }
      }).then(res => {
        if (res.data.msg) {
          Toast(res.data.msg)
        }
        if (res.data.result == 1){
          var data = res.data.data.list
          this.pageNo++
          this.allList = this.allList.concat(data)
          this.isLastPage = res.data.data ? res.data.data.pager.isLastPage : ''
        }
        this.$store.commit('SET_LOADING', false)
        this.isLoading = false
      }).catch(err => {
        this.$store.commit('SET_LOADING', false)
        this.isLoading = false
        console.log(err)
      })
    },
    loadMore() {
      if (!this.isLastPage) {
        this.getList()
      }
    },
    gotoDetail(k) {
      this.currentHotel = k
      this.popupVisible = true
    },
    bookHotel() {
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_FangYuan_YuDing_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          QuanYiKaHao: this.$route.query.id,
          FangYuanID: this.currentHotel.ID,
          KaiShiSJ: this.startTime,
          JieShuSJ: this.endTime,
          LianXiRenXingM: '',
          LianXiRenDianH: ''
        })
      }).then(res => {
        Toast(res.data.msg)
        if (res.data.msg) {
          Toast(res.data.msg)
        } else if (res.data.result == 1) {
          Toast('预定成功')
        }
        this.$store.commit('SET_LOADING', false)
      }).catch(err => {
        this.$store.commit('SET_LOADING', false)
        console.log(err)
      })
    }
  }
}

</script>

<style lang='less' scoped>
@import '../assets/utils.less';
.popup{
  max-height: 80vh;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  img{
    display: block;
    width: 100%;
  }
  .btn-wrap{
    margin: 10px;
  }
  .book-btn{
    border-radius: 40px;
  }
}
</style>
