<template lang="html">
  <div class="search-wrap">
    <!-- <icon name='angle-left' scale="1.5"></icon>   -->
    <div style='background: #eee;height: 40px;'>
      <div class="back" @click="back">
        <icon name='angle-left' scale="1.5"></icon>
      </div>
      <div class="input-wrap">
        <div class='input-inner-wrap'>
          <icon name='search'></icon>  
          <input type="text" placeholder='搜索'>
        </div>
      </div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">分类1</mt-tab-item>
      <mt-tab-item id="2">分类2</mt-tab-item>
      <mt-tab-item id="3">分类3</mt-tab-item>
    </mt-navbar>
    <div class="search-history">
      <h2 class='title'>搜索历史<icon name='trash'></icon></h2>
      <button>历史一</button>
      <button>历史二</button>
      <button>历史三</button>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      selected: '1'
    }
  },
  methods: {
    back() {
      this.$router.go('-1')
    }
  }
}
</script>

<style lang="less" scoped>
.back{
  position: absolute;
  z-index: 1000;
  width: 40px;
  height: 40px;
}
.mint-header{
  background: #eee;
  color: #666;
}
.null{
    height: 10px;
  }
.input-wrap{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  padding-left: 40px;
  padding-top: 5px;
  box-sizing: border-box;
}
.mint-navbar{
  background: #fff;
}
.search-wrap{
  background: #F8FCFF;
  height: 100%;
  .fa-icon{
    position: relative;
    left: 10px;
    top: 6px;
  }
}
.input-inner-wrap{
  margin-right: 20px;
  position: relative;
  .fa-icon{
    position: absolute;
    top: 6px;
    left: 8px;
  }
}
input{
  width: 100%;
  background: #fff;
  border: 1px solid #eee;
  line-height: 18px;
  padding: 5px 10px 5px 30px;
  box-sizing: border-box;
  border-radius: 4px;
}
.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #FFAA00;
    color: #FFAA00;
    margin-bottom: -3px;
}
.search-history{
  margin-top: 10px;
  .title{
    margin: 10px;
  }
  .fa-icon{
    float: right;
    margin-right: 10px;
    color: #666;
    margin-top: 1px;
  }
  button{
    padding: 8px 12px;
    border-radius: 22px; 
    margin: 5px 8px;
  }
}
</style>
