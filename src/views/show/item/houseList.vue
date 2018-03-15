<template>
  <div>
    <mt-header title="户型鉴赏">
      <router-link to="/show/itemNav" slot="left">
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
      <li v-for="(item, index) in list" :key='index' @click='goToHouseDetail(item)'>
        <div class="item">
          <img :src="$imgHost + '400x80/999/&text=户型图'" alt="">
        </div>
      </li>
    </ul>

  </div>
  
</template>
<script>
  export default{
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
      goToHouseDetail(item) {
        this.$router.push('/show/houseDetail')
      } 
    }
  }
</script>
<style lang=less>
.item{
  box-shadow: 0px 1px 3px #eee;
  margin: 10px;
  img{
    width: 100%;
  }
}
</style>
