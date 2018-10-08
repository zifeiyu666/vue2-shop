<template>
  <div class='index'>
    <mt-header fixed title="项目信息">
      <span @click='goHome()' slot="left" class='fixicon'>
        <mt-button icon="back">返回</mt-button>
      </span>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div class="itemlist">
      
    </div>
    <ul v-if='list && list.length != 0' class='container'>
      <li v-for="(item, index) in list" :key='index' @click='goToItemDetail(item)'>
        <div class="item">
          <item-show :itemData="item"></item-show>
        </div>
      </li>
      <v-baseline></v-baseline>
    </ul>
    <v-nomore v-else></v-nomore>
    
    
    <v-footer></v-footer>
    
  </div>
  
</template>
<script>
  import * as mockapi from '@/../mockapi'
  import qs from 'qs'
  import Footer from '@/common/show/_footer'
  import ItemShow from '@/components/show/ItemShow'
  import Baseline from '@/common/_baseline.vue'
  import NoMore from '@/components/nomore.vue'
  export default{
    components: {
      'v-footer': Footer,
      ItemShow,
      'v-nomore': NoMore,
      'v-baseline': Baseline
    },
    data() {
      return {
        list: [],
        pageNo: 1,
        pageSize: 10
      }
    },
    mounted() {
      this.getItemList()
    },
    methods: {
      goHome() {
        this.$router.push('/show')
      },
      getItemList() {
        this.$store.commit('SET_LOADING', true)
        mockapi.show.api_Show_getItemList_get({
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          } 
        }).then(response => {
          this.$store.commit('SET_LOADING', false)
          var data = response.data.data.list
          this.list = this.list.concat(data)
          this.loading=false
        }).catch(error => {
          this.$store.commit('SET_LOADING', false)
          console.log(error)
        })
      },
      loadMore() {
        if(this.loading) {
          return
        }
        this.loading = true;
        this.pageNo++
        this.getItemList()
      },
      goToItemDetail(item) {
        console.log(1111133)
        this.$router.push({ path: '/show/itemNav', query: { id: item.id }})
      } 
    }
  }
</script>
<style lang=less>
.index{
  padding-bottom: 90px;
  padding-top: 40px;
  /* background-color: #EBEBEB; */
  box-sizing: border-box;
}
.item{
  box-shadow: 0px 1px 3px #eee;
  /* padding: 10px; */
  img{
    width: 100%;
  }
}
.container{
  margin-bottom: 100px;
}
.fixicon .mint-button-icon{
  position: static !important;
}
</style>
