<template>
  <div class='timeline-wrap'>
    <mt-header title="发展历程">
      <span @click='goBack()' slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>

    <timeline v-if='historyList' v-for="(i, index) in historyList" :key='index'>
      <timeline-title>{{i.title}}</timeline-title>
      <timeline-item color="#9dd8e0" :hollow="true">{{i.publishTime.slice(0,10)}}{{i.newsAbstract}}</timeline-item>
      <!-- <timeline-item :hollow="true">2017-6-12运营平台入驻</timeline-item>
      <timeline-item :hollow="true">2017-6-12运营平台入驻</timeline-item> -->
    </timeline>
    <!-- <timeline>
      <timeline-title>2016</timeline-title>
      <timeline-item color="#9dd8e0">2017-3-12仙境海岸成立</timeline-item>
      <timeline-item :hollow="true">2017-6-12运营平台入驻</timeline-item>
      <timeline-item :hollow="true">2017-6-12运营平台入驻</timeline-item>
    </timeline>
    <timeline>
      <timeline-title>2017</timeline-title>
      <timeline-item color="#9dd8e0">2017-3-12仙境海岸成立</timeline-item>
      <timeline-item :hollow="true">2017-6-12运营平台入驻</timeline-item>
      <timeline-item :hollow="true">2017-6-12运营平台入驻</timeline-item>
    </timeline> -->
    <!-- <v-footer></v-footer> -->
  </div>
</template>
<script>
  import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
  import Footer from '@/common/show/_footer'
  import qs from 'qs'
  import * as mockapi from '@/../mockapi'
  export default{
    components: {
      'v-footer': Footer,
      Timeline,
      TimelineItem,
      TimelineTitle
    },
    data() {
      return {
        historyList: [],
        query: {
          pageNo: 1,
          pageSize: 10,
          typeCode: undefined
        }
      }
    },
    computed: {

    },
    mounted() {
      this.query.typeCode = this.$route.query.code
      this.getHistoryList()
    },
    methods: {
      getHistoryList() {
        mockapi.show.api_Show_getWzNewsList_get({
          params: this.query
        }).then(response => {
          var data = response.data.data.list
          this.historyList = data
          this.loading = false
          this.busy = false
        }).catch(error => {
          console.log(error)
        })
      },
      goBack(){
        this.$router.push({path: '/show/itemNav', query: {id: this.$route.query.id}})
      }
    }
  }
</script>
<style lang=less>
h3{
  font-size: 22px;
  font-weight: 500;
}
</style>
