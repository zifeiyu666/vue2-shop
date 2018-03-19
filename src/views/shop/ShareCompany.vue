<template>
  <div>
    <v-header>
      <h1 slot="title">分销商</h1>
    </v-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">一级</mt-tab-item>
      <mt-tab-item id="3">二级</mt-tab-item>
      <mt-tab-item id="4">三级</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="company-wrap">
          <div class="avatar">
            <img :src="this.$imgHost + '80x80&text=avatar'" alt="">
          </div>
          <div class="content">
            <ul>
              <li>昵称：zifieyu</li>
              <li>地区：山东省青岛市</li>
              <li>分销级别：一级分销商</li>
              <li>时间：2017-6-12</li>
            </ul>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :key='n' :title="'content ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6" :key='n' :title="'content ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <mt-cell v-for="n in 6" :key='n' :title="'content ' + n" />
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
  
</template>
<script>
import Header from '@/common/_header.vue'
  export default{
    data() {
      return {
        selected: '1'
      }
    },
    components: {
      'v-header':Header
    }
  }
</script>
<style lang=less>
  .company-wrap{
    margin-top: 20px;
    padding-left: 10px;
    .avatar{
      float: left;
      padding: 10px;
    }
    .content{
      padding: 10px;
      font-size: 14px;
      float: left;
    }
  }
</style>
