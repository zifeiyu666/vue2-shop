<template>
  <div id="app" v-loading='fetchLoading'>
    <!-- <transition name='fade'> -->
        <router-view></router-view>
    <!-- </transition> -->
    <!-- <v-loading v-show="fetchLoading"></v-loading> -->
  </div>
</template>

<script>
import Loading from '@/common/_loading'
export default {
  components:{
    'v-loading':Loading
  },
  computed:{
    fetchLoading(){
      return this.$store.state.detail.fetchLoading
    }
  }
}
</script>

<style lang="less">
html,body,#app{
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  background: #f3f5f7;
}

body,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
img,
legend,
li,
ol,
p,
ul {
    margin: 0;
    padding: 0;
    -moz-user-select:none;
    -webkit-user-select:none;
    -webkit-tap-highlight-color:transparent;
}

button,
fieldset,
img,
input {
    border: none;
    padding: 0;
    margin: 0;
    outline-style: none;
}

ul,li {
//   background-color: #ffffff;
}
ol,
ul {
    list-style: none;
}

input {
    padding-top: 0;
    padding-bottom: 0;
    font-family: "SimSun", "宋体";
}

input,
select {
    vertical-align: middle;
}

input,
select,
textarea {
    font-size: 12px;
    margin: 0;
}
textarea {
    resize: none;
}

/*防止拖动*/
img {
    border: 0;
    // vertical-align: middle;
}

/*  去掉图片低测默认的3像素空白缝隙*/
table {
    border-collapse: collapse;
}
//去斜体
i {
  font-style:normal
}
body {
    font-family: PingFangSC-Light,helvetica,'Heiti SC';
}

a {
    color: #666;
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    text-decoration: none;
    font-weight: normal;
    font-size: 100%;
    font-family: PingFangSC-Light,helvetica,'Heiti SC';
}

.ac {
    text-align: center;
}

// 自定义全局样式
p{
    font-size: 14px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.title{
    font-size: 16px;
    line-height: 26px;
    color: #333;
}
.index{
    width: 100%;
    height: 100%;
}
.line{
    height: 1px ;
    background: #eee;
    margin: 8px 0;
}
.mainbg{
    background: #EBEBEB;
}
.fl{
    float: left;
}
.clearfix:after {
   content:""; 
   display: block; 
   clear:both; 
}
.mint-header{
    background: #FFAA00 !important;
}
.nomore{
    text-align: center;
    padding: 20px;
}
.el-radio-button:focus:not(.is-focus):not(:active) {
    -webkit-box-shadow: 0 0 0 0 !important;
    box-shadow: 0 0 0 0 !important;
}
.mint-button--default{
    background: #f3f5f7;
}

</style>
