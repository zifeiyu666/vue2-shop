<template>
  <header>
    <router-link
     class="icon-go"
     :to="{ name: '首页'}"
     v-if="$route.matched[0].path=='/category'">
    </router-link>
    <span class="icon-go" @click="$router.go(-1)" v-else></span>
    <slot name="title" ></slot>
  </header>
</template>


<style lang="less" scoped>
@import '../assets/fz.less';
@import '../assets/utils.less';
@import '../assets/index/style.css';
header {
  background-color: #fff;
  text-align: center;
  position: relative;
  height: 12vw;
  display: flex;
  align-items: center;
  padding: 0 4vw;
  .shadow();
  cursor: pointer;
  h1 {
    .fz(font-size,32);
    letter-spacing: .2vw;
    font-weight: normal;
    margin-right: 36vw;
    margin-left: 2vw;
    position: relative;
    top: 2px;
    color: @fontBlack;
  }
  span,a {
    display: inline-block;
    .fz(font-size,46);
    transform: rotate(-180deg);
    &::before {
      color:#333;
    }
  }
}


</style>


<script>
export default {

}
</script>
