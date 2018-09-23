<template>
  <div class="awardRotate">
    <div class="goback" @click='goBack'>
      <i class='iconfont icon-fanhui'></i>
    </div>
    <div class="result-wrap">
      <div class="enable" v-if='enable'>快来试试今天的手气吧！</div>
      <div class="disable" v-else>
        今日已经抽过，明天再来。
        <div class="result">
          今天您抽到的奖品是：{{todayLottery.Title}}
        </div>
      </div>
    </div>
    <img src="../../assets/img/jp.png" id="shan-img" style="display:none; width: 10px; height: 10px" />
    <img src="../../assets/img/fail.png" id="sorry-img" style="display:none;  width: 10px; height: 10px" />
    <div class="banner">
      <div class="turnplate">
        <canvas style='width: 100%' id="wheelcanvas" width="422px" height="422px"></canvas>
        <img class="pointer" src="../../assets/img/pointer.png"  v-on:click="pointer"/>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import $ from 'jquery'
import {myfun} from '../../assets/awardRotate'
// import 'mint-ui/lib/style.css'
import {Toast} from 'mint-ui'
export default {
  name: 'awardRotate',
  data () {
    return {
      msg: '',
      turnplate: {  
        restaraunts: [],
        colors: [], 
        outsideRadius: 192,
        textRadius: 155,
        insideRadius: 68,
        startAngle: 0,
        bRotate: false
      },
      net_err: false,
      actDetail: undefined,
      enable: true
    }
  },
  created () {
    this.$nextTick(() => {
      // this.turnplate.restaraunts = ['50M免费流量包', '10Q币', '谢谢参与', '5Q币', '10M免费流量包', '20M免费流量包', '20Q币 ', '30M免费流量包', '100M免费流量包', 
// '2Q币', 'VUE示例', 'TEST选项']
      // this.turnplate.colors = ['#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6',  '#FFFFFF']
      // this.rotateTimeOut()
      // this.rotateFn()
      // this.drawRouletteWheel()
      this.getTodayLottery()
      this.getRestaraunts()
    })
  },
  components: {
    myfun
  },
  methods: {
    goBack() {
      this.$router.push('/shop/user')
    },
    getTodayLottery() {
      mockapi.shop.api_Shop_getTodayLottery_get({
        params: {
          token: this.$store.state.userInfo.MemberToken
        }
      }).then(res => {
        var data = res.data.data
        if (!data) {
          this.enable = true
        } else {
          this.enable = false
          this.todayLottery = data[0]
        }
      })
    },
    getRestaraunts() {
      mockapi.shop.api_Shop_getActivity_get({
        params: {
        }
      }).then(res => {
        var that = this
        var data = res.data.data
        data.activity_Options.forEach((item, i) => {
          that.turnplate.restaraunts.push(item)
          if (i%2 == 0) {
            that.turnplate.colors.push('#FFF4D6')
          } else {
            that.turnplate.colors.push('#FFFFFF')
          }
        })
        console.log('获取转盘数组')
        console.log(that.turnplate.restaraunts)
        this.actDetail = data
        this.drawRouletteWheel()
      })
    },
    rotateTimeOut: function () {
      $('#wheelcanvas').rotate({
        angle: 0,
        animateTo: 7200,
        duration: 36000,
        callback: function () {
          Toast({message: '网络超时，请检查您的网络设置！', position: 'middle'})
          $('#wheelcanvas').stopRotate()
          this.net_err = true
        }
      })
    },
    rotateFn: function (item, txt) {
      var angles = item * (360 / this.turnplate.restaraunts.length) - (360 / (this.turnplate.restaraunts.length * 2))
      if (angles < 270) {
        angles = 270 - angles
      } else {
        angles = 360 - angles + 270
      }
      var bRotateT = this.turnplate.bRotate
      this.$nextTick(() => {
        $('#wheelcanvas').stopRotate()
        $('#wheelcanvas').rotate({
          angle: 0,
          animateTo: angles + 1800,
          duration: 5000,
          callback: function () {
            Toast({message: txt.title, position: 'middle'})
            console.log(txt)
            if (bRotateT) {
              bRotateT = false
            } else {
              bRotateT = true
            }
          }
        })
      })
      this.turnplate.bRotate = bRotateT
    },
    pointer () {
      this.drawRouletteWheel()
      // this.net_err = false
      // TODO:接口有问题
      if (!this.enable) {
        var that =this
        this.rotateTimeOut()
        mockapi.shop.api_Shop_Lottery_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            ActId: this.actDetail.activity.ActId
          })
        }).then(res => {
          var data = res.data.data
          var index = ''
          this.actDetail.activity_Options.forEach((item,i) => {
            if (item.optionid === data.optionid) {
              index = i
              console.log('返回的抽奖结果')
              console.log(index) 
              console.log(data.optionid)
            }
          })
          console.log('txt信息')
          console.log(that.turnplate.restaraunts[index - 1])
          // if (this.turnplate.bRotate) return
          that.turnplate.bRotate = !that.turnplate.bRotate
          // 获取随机数(奖品个数范围内)
          // var item = Math.floor(Math.random() * (that.turnplate.restaraunts.length - 1 + 1) + 1)
          // 奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
          that.rotateFn(index+1, that.turnplate.restaraunts[index])
        })
      } else {
        Toast('今日已经抽过，明天再来。')
      }
      // setTimeout(function() {
      //   // if (this.turnplate.bRotate) return
      // that.turnplate.bRotate = !that.turnplate.bRotate
      // // 获取随机数(奖品个数范围内)
      // // var item = Math.floor(Math.random() * (that.turnplate.restaraunts.length - 1 + 1) + 1)
      // var item = 3
      // // 奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
      // that.rotateFn(item, that.turnplate.restaraunts[item - 1])
      // },3000)
      
    },
    drawRouletteWheel () {
      var canvas = document.getElementById('wheelcanvas')
      if (canvas.getContext) {
        // 根据奖品个数计算圆周角度
        var arc = Math.PI / (this.turnplate.restaraunts.length / 2)
        var ctx = canvas.getContext('2d')
        // 在给定矩形内清空一个矩形
        ctx.clearRect(0, 0, 422, 422)
        // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
        ctx.strokeStyle = '#FFBE04'
        // font 属性设置或返回画布上文本内容的当前字体属性
        ctx.font = '16px Microsoft YaHei'
        for (var i = 0; i < this.turnplate.restaraunts.length; i++) {
          var angle = this.turnplate.startAngle + i * arc
          ctx.fillStyle = this.turnplate.colors[i]
          ctx.beginPath()
          //  arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
          ctx.arc(211, 211, this.turnplate.outsideRadius, angle, angle + arc, false)
          ctx.arc(211, 211, this.turnplate.insideRadius, angle + arc, angle, true)
          ctx.stroke()
          ctx.fill()
          // 锁画布(为了保存之前的画布状态)
          ctx.save()

          // ----绘制奖品开始----
          ctx.fillStyle = '#E5302F'
          var text = this.turnplate.restaraunts[i].title
          var lineHeight = 17
          // translate方法重新映射画布上的 (0,0) 位置
          ctx.translate(211 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * this.turnplate.textRadius)

          // rotate方法旋转当前的绘图
          ctx.rotate(angle + arc / 2 + Math.PI / 2)

          /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
          if (text.indexOf('M') > 0) { // 流量包
            var texts = text.split('M')
            for (var j = 0; j < texts.length; j++) {
              ctx.font = j === 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei'
              if (j === 0) {
                ctx.fillText(texts[j] + 'M', -ctx.measureText(texts[j] + 'M').width / 2, j * lineHeight)
              } else {
                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * lineHeight)
              }
            }
          } else if (text.indexOf('M') === -1 && text.length > 6) { // 奖品名称长度超过一定范围
            text = text.substring(0, 6) + '||' + text.substring(6)
            var textst = text.split('||')
            for (var ji = 0; ji < textst.length; ji++) {
              ctx.fillText(textst[ji], -ctx.measureText(textst[ji]).width / 2, ji * lineHeight)
            }
          } else {
            // 在画布上绘制填色的文本。文本的默认颜色是黑色
            // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
          }

          // 添加对应图标
          if (text.indexOf('Q币') > 0) {
            var img = document.getElementById('shan-img')
            img.onload = function () {
              // ctx.drawImage(img, -15, 10) //本来第一次加载大转盘抽奖就会出现奖品图片，但是有点瑕疵没有解决所以注释了，现在第二次加载就会出现，
              //谁解决了来说下，帮助大家
            }
            ctx.drawImage(img, -15, 10)
          } else if (text.indexOf('谢谢参与') >= 0) {
            img = document.getElementById('sorry-img')
            img.onload = function () {
              // ctx.drawImage(img, -15, 10) //本来第一次加载大转盘抽奖就会出现奖品图片，但是有点瑕疵没有解决所以注释了，现在第二次加载就会出现，
              //谁解决了来说下，帮助大家 
            }
            ctx.drawImage(img, -15, 10)
          }
          // 把当前画布返回（调整）到上一个save()状态之前
          ctx.restore()
          // 绘制奖品结束
        }
      }
    }
  }
}
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
  .goback{
    position: fixed;
    z-index: 1000;
    width: 20px;
    height: 20px;
    border-radius: 14px;
    background: rgba(0,0,0,.3);
    left: 10px;
    top: 10px;
    padding: 2px;
    i{
      font-size: 14px;
      color: #fff;
      position: relative;
      left: 2px;
    }
  }
  .awardRotate{
    background: rgb(230, 45, 45);
    height :100%;
    // max-width: 375px;
    margin: 0px auto;
  }
  ul,ol{list-style-type:none;}
  select,input,img,select{vertical-align:middle;}
  input{ font-size:12px;}
  a{ text-decoration:none; color:#000;}
  a:hover{color:#c00; text-decoration:none;}
  .clear{clear:both;}

  /* 大转盘样式 */
  .banner{display:block;width:95%;margin-left:auto;margin-right:auto;margin-bottom: 20px; padding-top:120px;}
  .banner .turnplate{display:block;width:100%;position:relative;background-image:url(../../assets/img/bg.png);background-size:100% 100%;}
  .banner .turnplate canvas.item{width:100%;}
  .banner .turnplate img.pointer{position:absolute;width:31.5%;height:42.5%;left:34.6%;top:23%;}

  // 抽奖结果
  .disable{
    position: absolute;
    width: 100%;
    top: 40px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    .result{
      margin-top: 5px;
      font-size: 16px;

    }
  }
  .enable{
    position: absolute;
    width: 100%;
    top: 40px;
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
</style>