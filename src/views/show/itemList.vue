<template>
  <div class='index'>
    <mt-header fixed title="项目信息">
      <router-link to="/show" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div class="itemlist">
      
    </div>
    <ul
      class='container'>
      <li v-for="(item, index) in list" :key='index' @click='goToItemDetail(item)'>
        <div class="item">
          <!-- <img :src="$imgHost + '400x80/999/&text=项目背景图'" alt=""> -->
          <item-show :itemData="item"></item-show>
        </div>
      </li>
    </ul>
    <v-footer></v-footer>
  </div>
  
</template>
<script>
  import * as mockapi from '@/../mockapi'
  import qs from 'qs'
  import Footer from '@/common/show/_footer'
  import ItemShow from '@/components/show/ItemShow'
  export default{
    components: {
      'v-footer': Footer,
      ItemShow,
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
      getItemList() {
        mockapi.show.api_Show_getItemList_get({
          params: {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          } 
        }).then(response => {
          var data = response.data.data
          this.list = this.list.concat(data.list)
          this.loading=false
        }).catch(error => {
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
  background-color: #EBEBEB;
}
.item{
  box-shadow: 0px 1px 3px #eee;
  padding: 10px;
  img{
    width: 100%;
  }
}
.container{
  margin-bottom: 100px;
}
</style>
