<template>
  <div class='timeline-wrap'>
    <mt-header title="发展历程">
      <router-link to="/show/itemNav" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>

    <timeline>
      <timeline-title>2015</timeline-title>
      <timeline-item color="#9dd8e0" :hollow="true">2017-3-12仙境海岸成立</timeline-item>
      <timeline-item :hollow="true">2017-6-12运营平台入驻</timeline-item>
      <timeline-item :hollow="true">2017-6-12运营平台入驻</timeline-item>
    </timeline>
    <timeline>
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
    </timeline>
    <!-- <v-footer></v-footer> -->
  </div>
  
</template>
<script>
  import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
  import Footer from '@/common/show/_footer'
  export default{
    components: {
      'v-footer': Footer,
      Timeline,
      TimelineItem,
      TimelineTitle
    },
    data() {
      return {

      }
    },
    computed: {

    },
    mounted() {

    }
  }
</script>
<style lang=less>
h3{
  font-size: 22px;
  font-weight: 500;
}
</style>
