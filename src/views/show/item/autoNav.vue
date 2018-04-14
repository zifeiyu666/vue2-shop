<template>
  <div class='nav-wrap'>
    <mt-header title="项目信息">
      <span @click='goBack()' slot="left">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <div id="container"></div>
    <div id="panel"></div>
  </div>
  
</template>
<script>
  import qs from 'qs'
  import * as mockapi from '@/../mockapi'
  export default{
    data() {
      return {
        zoom:11,
        location: {}
      }
    },
    mounted() {
      this.getLocation()
      //构造路线导航类
      // var driving = new AMap.Driving({
      //     map: map,
      //     // panel: "panel" // 移动端暂时不显示panel
      // }); 
      // // 根据起终点经纬度规划驾车导航路线
      // driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719));
    },
    methods: {
      getLocation() {
        mockapi.show.api_Show_getNavCoordinate_get({
          params: {
            itemId: this.$route.query.id
          }
        }).then(res => {
          var data = res.data.data
          console.log(data)
          this.location = data
          var scale = new AMap.Scale({
              visible: false
          }),
          toolBar = new AMap.ToolBar({
              visible: false
          }),
          overView = new AMap.OverView({
              visible: false
          }),
          map = new AMap.Map('container', {
              resizeEnable: true,
              zoom:11,
              // center: [116.397428, 39.90923]
              center: [this.location.x, this.location.y]
          });
          map.addControl(scale);
          map.addControl(toolBar);
          map.addControl(overView);
          scale.show()
          toolBar.show()
          overView.show()
          overView.open();
          marker = new AMap.Marker({
            position: [this.location.x, this.location.y],
            title: '项目位置',
            map: map
          });
          
        })
      },
      goBack(){
        this.$router.push({path: '/show/itemNav', query: {id: this.$route.query.id}})
      }
    }
  }
</script>
<style lang=less>
.nav-wrap{
  height: 100%;
  #container{
    margin-top: 40px;
    width: 100%;
    height: 100%;
  }
}
.item{
  box-shadow: 0px 1px 3px #eee;
  margin: 10px;
  height: 80px;
}

 #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
}
</style>
