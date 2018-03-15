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
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="(item, index) in list" :key='index' @click='goToItemDetail(item)'>
        <div class="item">
          <img :src="$imgHost + '400x80/999/&text=项目背景图'" alt="">
        </div>
      </li>
    </ul>
    <v-footer></v-footer>
  </div>
  
</template>
<script>
  import Footer from '@/common/show/_footer'
  export default{
    components: {
      'v-footer': Footer
    },
    data() {
      return {
        list: [
          1,2,3,4,5,6,7,8,9,0
        ]
      }
    },
    methods: {
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      },
      goToItemDetail(item) {
        this.$router.push('/show/itemNav')
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
</style>
