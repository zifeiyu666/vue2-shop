<template lang="html">
  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <footer class="footer" style='position: fixed; z-index: 100' @click.stop='gotoRouter'>
    <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="首页">
      <i slot="icon" class="icon-index"></i>
        首页
    </mt-tab-item>
    <mt-tab-item id="客服">
      <i slot="icon" class="iconfont icon-kefu"></i>
      客服
    </mt-tab-item>
    <mt-tab-item id="购物车">
      <i slot="icon" class="iconfont icon-cart1"></i>
      购物车
    </mt-tab-item>
    <mt-tab-item id="我的订单">
      <i slot="icon" class="iconfont icon-icon-"></i>
      我的订单
    </mt-tab-item>
    <mt-tab-item id="会员中心">
      <i slot="icon" class="icon-user"></i>
      会员中心
    </mt-tab-item>
    
    
  </mt-tabbar>
  </footer>
</template>

<script>
import { MessageBox } from 'mint-ui'
  export default {
    methods: {
      gotoRouter() {
        if (this.selected == '客服') {
          MessageBox.confirm('是否拨打客服热线？').then(action => {
            window.location.href="tel:19906421598"
          })
          return
        }
        this.$router.push({
          name: this.selected
        })
      }
    },
    data() {
      return {
        //对应mt-tab-item 的id值
        selected: ''
      }
    },
    mounted() {

      //获取当前路由名称，根据该名称给当前footer添加is-selected
      let Rname = this.$route.name;
      console.log('routername')
      console.log(this.$route)
      console.log(Rname)
      switch (Rname) {
        case '首页':
          this.selected = '首页';
          break;
        case '客服':
          this.selected = '客服';
          break;
        case '购物车':
          this.selected = '购物车';
          break;
        case '我的订单':
          this.selected = '我的订单';
          break;
        case '会员中心':
          this.selected = '会员中心';
          break;
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';

.mint-tab-item-label:hover {
  color:#333;

}
.iconfont{
  font-size: 22px !important;
}
  .footer {


    .mint-tabbar {
      background-color: #fff;
      background-image: none;
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      -webkit-box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      .is-selected {
        color: @cl;
        background-color: #fff;
        i {
          &::before {
            color: @cl;
          }
        }
      }
      i {
        .fz(font-size, 42);
      }
    }
  }
</style>
