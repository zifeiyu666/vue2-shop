<template>
  <div>
    <span ref="timerbtn" class="btn btn-default timer" @click='startTimer'>
      <span v-if='isFeatching'>{{timer}}秒后重试</span>
      <span v-else>获取dd验证码</span>
    </span>
  </div>
</template>
<script>
/* 
 * isReady: 是否可以开始进行倒计时，用于判断父组件环境是否准备必要的好触发条件
 * timeout: 倒计时时间，以秒为单位，默认为60
 * tip: 如果父级环境没有转备好触发条件，那么应该如何提示用户
 */
import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        isFeatching: false,
        timer: '',
        timerStore: '',
      }
    },
    props: ['isReady', 'timeout', 'tip'],
    props: {
      isReady: {  // 是否可以发起倒计时 boolean
        required: true,
        type: Boolean
      },
      timeout: {   // 可选字段，有默认值
        default: 60
      },
      tip: {
        default: '请填写完整必要信息'
      }
    },
    mounted() {
      this.timer = this.timeout
      this.timerStore = this.timeout
    },
    methods: {
      startTimer() {
        if(!this.isReady) {
          Toast(this.tip)
          return
        }

        if (this.isFeatching) {
          Toast('您已经获取验证码，请稍后重试')
          return
        }

        this.isFeatching = true
        this.$emit('getCode')
        var that = this
        var interval = setInterval(() => {
          that.timer -- 
          if (that.timer == 0 ) {
            clearInterval(interval)
            that.timer = that.timerStore
            that.isFeatching = false
          }
        }, 1000)
      }
    }
  }
</script>
<style>
  .timer{
    position: absolute;
    right: 0px;
    z-index: 1000;
    top: 12vw;
    height: 48px;
    padding: 0 6px;
    font-size: 13px;
    color: #666;
    background: #eee;
    line-height: 48px;
  }
</style>
