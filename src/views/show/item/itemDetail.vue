<template>
  <div>
    <mt-header title="项目简介">
      <router-link to="/show/itemNav" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div class="item-wrap" v-html="content">
    </div>
  
  </div>
  
</template>
<script>
  import * as mockapi from '@/../mockapi'
  export default{
    data() {
      return {
        content: ''
      }
    },
    mounted() {
      this.getItemIntro()
    },
    methods: {
      getItemIntro() {
        mockapi.show.getItemIntro_get({
          typeId: 1,
          id: 2
        }).then(response => {
          var data = response.data.data
          this.content = data.content
          console.log(this.content)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang=less>
.item-wrap{
  padding: 10px;
  .banner{
    width: 100%;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .item-title{
    margin-top: 15px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    color: #333;
  }
  p{
    padding: 5px;
  }
}

</style>
