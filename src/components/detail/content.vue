<template lang="html">
  <section class="content">
    <div v-html="content.ProductDescription" style='padding:3vw'>
    </div>
  </section>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style lang="less">
  .content {
    background: #fff;
    width: 100%;
    overflow: hidden;
    // margin-top: 10px;
    // border-top: 20px solid #F8FCFF;
    img {
        // display: block !important;
        width: 94vw !important;
        height: auto !important;
      }
    .img-wrap {
    height: 120vw;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
