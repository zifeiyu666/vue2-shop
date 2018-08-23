<template>
  <section class='share-btn'>
    <i class='icon' @click='showPost'>分享海报</i>
    <div v-if='isShow' class="wrap">
      <div class="img-wrap">
        <i class="close"></i>
        <img v-lazy="imgurl" alt="post">
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      imgurl: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=91a426229082d158a4825fb1b00819d5/0824ab18972bd4077557733177899e510eb3096d.jpg'
    }
  },
  methods: {
    showPost() {
      this.isShow = true
      
    },
    close() {
      this.isShow = false
    }
  }
}
</script>
<style lang='less' scoped>
.share-btn{
  position: fixed;
  top: 12px;
  right: 0;
  height: 24px;
  width: 50px;
  line-height: 24px;
  background: rgba(0,0,0,0.7);
  color: #fff;
  font-size: 12px;
  padding: 0 6px 0 10px;
  z-index: 1000;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
.wrap{
  
}
</style>
