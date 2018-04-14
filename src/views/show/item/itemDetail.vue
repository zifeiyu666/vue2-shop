<template>
  <div>
    <mt-header title="项目简介">
      <span @click='goBack()' slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div v-if='content' class="item-wrap">
      <h2 class='item-title'>{{content.NewsTitle}}</h2>
      <p>{{content.NewsAbstract}}</p>
      <div v-html="content.NewsContent"></div>
    </div>
    <div v-else class='nomore'>暂无更多内容</div>
  </div>
  
</template>
<script>
  import * as mockapi from '@/../mockapi'
  import qs from 'qs'
  import {goBack} from '@/mixin'
  export default{
    data() {
      return {
        content: ''
      }
    },
    mixins: [goBack],
    mounted() {
      this.getItemIntro()
    },
    methods: {
      getItemIntro() {
        mockapi.show.api_Show_getXMJJ_get({
          params: {
            typeCode: this.$route.query.code
          }
        }).then(response => {
          var data = response.data.data
          this.content = data
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
