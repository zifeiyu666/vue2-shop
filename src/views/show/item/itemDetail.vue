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
        this.$store.commit('SET_LOADING', true)
        mockapi.show.api_Show_getXMJJ_get({
          params: {
            typeCode: this.$route.query.code
          }
        }).then(response => {
          this.$store.commit('SET_LOADING', false)
          var data = response.data.data
          this.content = data
          console.log(this.content)
        }).catch(error => {
          this.$store.commit('SET_LOADING', false)
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
  img{
    width: 90vw !important;
    display: block !important;
    margin: 0 auto !important;
  }
  .item-title{
    background: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #333;
    box-shadow: 0px 1px 2px #ccc;
    border-radius: 30px;
  }
  p{
    padding: 8px;
    color: #666;
    background: #fff;
    margin-top: 10px;
  }
}

</style>
