<template>
  <section class='share-btn'>
    <i class='icon' @click='showPost'>分享海报</i>
    
      <transition name="el-fade-in-linear">
        <div v-show='isShow' class="wrap">
          <div class="img-wrap">
            <i class="close iconfont icon-guanbi" @click='close()'></i>
            <img v-lazy="imgurl" alt="post">
          </div>
        </div>
      </transition>
    
  </section>
</template>
<script>

export default {
  props: {
    imgurl: {
      required: true
    }
  },
  data() {
    return {
      isShow: false
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
@import '../assets/utils.less';
.share-btn{
  .icon{
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
    z-index: 700;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .close{
    position: absolute;
    top: -15px;
    right: -15px;
    font-size: 30px;
    line-height: 30px;
    color: #ff4545;
    background: rgba(256,256,256,.9);
    padding:0;
    margin:0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    z-index: 10
  }
}
.wrap{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .7);
  left: 0;
  top: 0;
  z-index: 800;
  .img-wrap{
    background: rgba(256,256,256,.9);
    z-index: 900;
    position: fixed;
    width: 80vw;
    height: 80vh;
    margin: 10vh auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0px 3px #fff;
    img{
      width: 100%;
      display: block;
      max-width: 100%;
      max-height: 100%;
      margin: auto;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
