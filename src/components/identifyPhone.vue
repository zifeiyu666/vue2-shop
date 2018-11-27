<template>
    <div class="forgrtCode">
        <!-- <mt-header title="忘记密码" class="headerBox">
            <mt-button
                    icon="back"
                    slot="left"
                    class="backBox"
                    @click="backAction">返回</mt-button>
        </mt-header> -->
 
        <div class="codeInputBox">
            <!-- 原手机号 -->
            <div class='oldPhone'>
                <span>已绑定手机号：</span>
                {{oldPhone}}
            </div>
            <!--手机号-->
            <el-input
                    class="phoneNum"
                    type="tel"
                    v-model="phoneNum"
                    placeholder="新手机号"
            >
            </el-input>
 
            <!--验证码-->
            <div class="codeBox">
                <el-input
                        class="codeNum"
                        type="tel"
                        v-model="codeNum"
                        placeholder="验证码"
                >
                </el-input>
                <!--/倒计时触发按钮-->
                <mt-button
                        class="codeBtn"
                        :class="{hwDisables:captchaDisable}"
                        type="default"
                        @click="codeBtnAction"
                        v-bind:disabled="captchaDisable"
                >{{captchaLabel}}</mt-button>
            </div>
        </div>
 
        <!--注册-->
        <mt-button
                class="nextBottomBtn"
                type="default"
                @click.native="registerBottomBtnAction"
                v-bind:disabled="isClickAble">
        确定</mt-button>
 
    </div>
</template>
 
<script>
    import kTimer from '@/util/timer'
    import {Toast} from 'mint-ui'
    import * as mockapi from '@/../mockapi'
    import qs from 'qs'
    export default {
 
        data:function () {
          return {
              oldPhone: '1231231',
              phoneNum:'',
              codeNum:'',
              captchaLabel:"获取验证码",
              seconds:15,
              captchaDisable:false,
          }
        },
        methods:{
            //导航返回
            backAction:function () {
                this.$router.back()
            },
            //获取验证码点击
            codeBtnAction:function () {
                if(this.phoneNum==""){
                    Toast('请填写手机号!');
                    return;
                }
                //发送网络请求
                mockapi.shop.api_Shop_generateVeriCode_post({
                    data: qs.stringify({
                        token: this.$store.state.userInfo.MemberToken,
                        phoneNum: this.phoneNum
                    })
                }).then(res => {
                    if (res.data.result == 1) {
                        Toast( {
                            message: '验证码获取成功，请查看手机短信'
                        })
                    } else {
                        Toast( {
                            message: '验证码获取失败，请重试'
                        })
                    }
                
                }).catch(err => {
                    console.log(err)
                })
 
                this.captchaDisable = true;
                //立即显示重发提示不必等待倒计时启动
                this.captchaLabel =this.seconds+'秒后重新发送';
 
                //启动1s步长倒计时
                var interval = setInterval(()=>{
                    kTimer.countdown(this)
                    console.log(this.seconds)
 
                    if(this.seconds == 15){
                        //停止倒计时
                        clearTimeout(interval)
                    }
 
                },1000);
            },
            registerBottomBtnAction() {
                mockapi.shop.api_Shop_bindPhone_post({
                    data: qs.stringify({
                        codeNum: this.codeNum,
                        phoneNum: this.phoneNum
                    })
                }).then(res => {
                    if(res.data.result == 1) {
                        Toast( {
                            message: '绑定成功'
                        })
                        this.oldPhone = this.phoneNum
                    }
                }).catch(err => {
                    console.log(err)
                    Toast( {
                            message: '绑定失败，请重试'
                        })
                })
            }
        },
 
        computed:{
            isClickAble:function () {
                if(this.phoneNum!==''&&this.codeNum!==''){
                    return false
                }
                return true;
            }
        }
    }
</script>

<style lang='less'>
    .oldPhone{
        color: #999;
        font-size: 12px;
        span{
            color: #333;
        }
        width: 80%;
        margin: 0 auto;
        margin-top: -20px;
        margin-bottom: 10px;
    }
    .forgrtCode{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white;
    }
    .forgrtCode .headerBox{
        background: #FFAA00 !important;
    }
    /*输入框*/
    .codeInputBox{
        margin-top: 100px;
    }
    .registerBox .inputBox{
        padding: 0 10px;
        margin-top: 20px;
    }
    /*普通状态*/
    .forgrtCode .phoneNum input{
        border-color: white;
        border-radius: 0 ;
        border-bottom: 1px solid #eeeeee ;
        width: 90%;
        margin-left: 5%;
        margin-top: 10px;
    }
    /*高亮状态下面添加直线*/
    .forgrtCode .phoneNum :focus{
        border-bottom: 1px solid #FFAA00 ;
        padding-right: 100px;
 
    }
 
    /*验证码容器*/
    .forgrtCode .codeBox{
        margin-top: 20px;
        width:90%;
        margin-left: 5%;
        position: relative;
    }
    /*输入框普通状态*/
    .forgrtCode .codeNum input{
        border-color: white;
        border-radius: 0 ;
        border-bottom: 1px solid #eeeeee ;
    }
    /*高亮状态下面添加直线*/
    .forgrtCode .codeNum :focus{
        border-bottom: 1px solid #FFAA00 ;
 
    }
    .forgrtCode .codeBox .codeNum{
        margin-right: 10px !important;
 
    }
    .forgrtCode .codeBox .codeBtn{
        position: absolute;
        right: 0;
        top: -8px;
        font-size: 13px;
        height: 32px;
        color: white;
        background: #FFAA00;
    }
 
    /*按钮*/
    .nextBottomBtn{
        margin-top: 40px;
        width: 90%;
        margin-left: 5%;
        background: #FFAA00 !important;
        color: white;
    }
 
</style>