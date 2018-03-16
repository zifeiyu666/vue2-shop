<template lang="html">
  <div class="wrap">
    <!-- <v-header class="header">
      <h1 slot="title">商品分类</h1>
    </v-header> -->
    <section class="view">
      <v-aside :datas="allData"></v-aside>
      <router-view :datas="allData"></router-view>
    </section>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import Footer from '@/common/_footer.vue'
import Aside from '@/components/category/aside.vue'
import category from '@/http/mock.js' //模拟数据
export default {
  components:{
    'v-header':Header,
    'v-aside': Aside,
    'v-footer': Footer
  },
  data(){
    return {
      allData:'',
      datas: ''
    }
  },
  beforeCreate() {

    this.$api({
      method: 'post',
      url: '/index'
    }).then((response) => {
      this.datas = response.data;
    }).catch(function(error) {
      alert(error)
    })
  },
  created(){
    this.$api({
      method:'post',
      url:'/category'
    }).then((res)=>{
      this.allData = res.data;
    }).catch((error)=>{
      console.log(error);
    })
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-flow: column nowrap;
            flex-flow: column nowrap;

    .view {
      width: 100%;
      height:100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
  }
</style>
