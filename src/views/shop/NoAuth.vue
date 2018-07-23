<template>
  <div class='noauth'>
    <div class="img">
      <img src="../../assets/qrcode.jpg" alt="">
      <div class="dec">
        <p>长按上方二维码进行关注</p>
      </div>
    </div>
    

  </div>
  
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  mounted() {
    Toast('您还未关注，请先关注。')
  }
}
</script>
<style scoped>
  img{
    display: block;
    width: 100%;
    /* border: 1px solid #eee; */
  }
  .img{
    width: 90%;
    margin: 0 auto;
    padding: 20px 10px;
    box-sizing: border-box;
    background: #fff;
  }
  .noauth{
    padding-top: 20px;
    background: #999;
    height: 100%;
    box-sizing: border-box;
  }
  .dec{
    text-align: center;
    line-height: 20px;
    color: #333;
  }

</style>
