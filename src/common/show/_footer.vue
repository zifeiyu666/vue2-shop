<template lang="html">
  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <footer class="footer" @click.stop='gotoRouter'>
    <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="showIndex">
      <i slot="icon" class="icon-index"></i>
        首页
    </mt-tab-item>
    <mt-tab-item id="showItem">
      <i slot="icon" class="icon-category"></i>
      项目
    </mt-tab-item>
    <mt-tab-item id="showNews">
      <i slot="icon" class="icon-car"></i>
      资讯
    </mt-tab-item>
    <mt-tab-item id="showHistory">
      <i slot="icon" class="icon-user"></i>
      历程
    </mt-tab-item>
  </mt-tabbar>
  </footer>
</template>

<script>
  export default {
    methods: {
      gotoRouter() {
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
      switch (Rname) {
        case 'showIndex':
          this.selected = 'showIndex';
          break;
        case 'showItem':
          this.selected = 'showItem';

          break;
        case 'showNews':
          this.selected = 'showNews';

          break;
        case 'showHistory':
          this.selected = 'showHistory';
          break;
      }
    }

  }
</script>

<style lang="less" scoped>
 @import '../../assets/fz.less';
  @import '../../assets/index/style.css';

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
