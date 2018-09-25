<template>
  <div class="product_list_wrap">
      <h3 class='title' v-if='!hideHead'>
        全部商品
        <span class="more" @click='goToSearch("全部商品")'>查看更多></span>
      </h3>
      <ul 
        class="something" 
        v-if='allList.length != 0'
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isLoading"
        infinite-scroll-distance="0"
        >
        <li v-for="(k,i) in allList" @click='gotoDetail(k)' :key="i">
          <div class="something-middle">
            <img :src="k.imgurl[0]">
          </div>
          <div class="something-right">
            <p>{{k.title}}</p>
            <!-- <p style="color:rgb(199, 108, 28);"> {{k.intro}}</p> -->
            <p>
              ￥{{k.price}}元
              <!-- <span class='fx' v-if='k.ywyfx && k.ywyfx!=0'>
                <i>赚</i>￥{{k.ywyfx}}
              </span> -->
            </p>
          </div>
        </li>
      </ul>
      <div v-else>
        <v-nomore></v-nomore>
      </div>
      <v-baseline v-if='isLastPage'></v-baseline>
    </div>
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import NorMore from '@/components/nomore'
import Baseline from '@/common/_baseline.vue'

export default {
  components: {
    'v-nomore': NorMore,
    'v-baseline': Baseline,
  },
  props: {
    hideHead: {
      required: false
    },
    searchForm: {
      required: false,
      default() {
        return {
          ProductType: '',
          ProjectType: '',
          Title: '',
          SuitableUser: '',
          DestinationType: '',
          KeyWord: '',
          City: '',
          Classification: '',
          IsMain: '',
          IsLimitTime: ''
        }
      }
    },
    fxtype: {
      required: false
    }

  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      isLastPage: false,
      allList: [],
      isLoading: false,
    }
  },
  mounted() {
    this.getAllProductList()
  },
  methods: {
    goToSearch(title) {
      this.$router.push({path: '/shop/search', query: {title: title}})
    },
    // 所有商品加载更多
    getAllProductList(isSearch) {
      if (isSearch) {
        this.pageNo = 1
        this.allList = []
      }
      this.isLoading = true
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_Share_getProductList_get({
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          ...this.searchForm
        }
      }).then(res => {
        var data = res.data.data.list
        this.pageNo++
        this.allList = this.allList.concat(data)
        this.isLastPage = res.data.data.pager.isLastPage
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
        this.getAllProductList()
      }
    },
    gotoDetail(i) {
      console.log()
      this.$router.push({path: '/channelcenter/detail', query: {pid: i.id, type: this.fxtype}})
    },
  }
}

</script>

<style lang='less'>
@import '../../assets/utils.less';
</style>
