<template lang="html">
  <div class="index">
    
  </div>
</template>

<script>

import index from '@/http/mock.js' //模拟数据
export default {
  components: {
  },
  data() {
    return {
      datas: '',
      loading:true
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
  }
}
</script>


<style lang="less" scoped>
.index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
}
</style>
