<template lang="html">

  <div class="wrap">
    <!-- <v-gologin></v-gologin> -->
    <ul 
    class="something" 
    v-if='carList.length != 0'>
      <li v-if='hasQyk' style='height: 20px;padding-left: 15px'>权益卡类</li>
      <li v-for="(k,i) in carList" v-if='k.producttype == "QYKL"' :key="i">
          <!-- 暂时屏蔽购物车选择，直接全部提交 -->
          <!-- <div class="something-left">
            <label class="true" :class="{false:!k.choseBool}">
              <input type="checkbox" v-model="k.choseBool">
            </label>
          </div> -->
          <div class="something-middle">
            <img :src="k.imgurl[0]">
          </div>
          <div class="something-right">
            <p>{{k.title}}</p>
            <p style="color:rgb(199, 108, 28)"> {{k.propname}}</p>
            <p>数量：<span style="padding: 4px 5px;
  width: 30px;" @click='reduce(k)'>-</span> {{k.num}} <span style="padding: 4px 5px;
  width: 30px;" @click='add(k)'>+</span>
            </p>
            <p>售价：{{k.price * k.num}}元</p>
            <div class="something-right-bottom" @click="cut(k)">
              <span></span>
            </div>
          </div>
      </li>
      <div v-if='hasQyk' class='read_wrap type_wrap' style='padding: 10px 15px;' @click='changeIsRead("qyk")'>
        <i v-if='!qykIsRead' class='iconfont icon-circle' style='color: #666'></i>
        <i v-else class='iconfont icon-danxuanxuanzhong' style='color: #ff4800'></i>
        <span>我已仔细阅读<span @click.stop="goToXuZhi('DJKSYSM', '度假卡使用说明')" style='color:#ff4800 '>《度假卡使用说明》</span>并同意条款内容</span>
      </div>
      <li v-if='hasOther' style='height: 20px;padding-left: 15px'>旅游产品类</li>
      <li v-for="(k,i) in carList" v-if='k.producttype != "QYKL"' :key="i">
          <!-- 暂时屏蔽购物车选择，直接全部提交 -->
          <!-- <div class="something-left">
            <label class="true" :class="{false:!k.choseBool}">
              <input type="checkbox" v-model="k.choseBool">
            </label>
          </div> -->
          <div class="something-middle">
            <img :src="k.imgurl[0]">
          </div>
          <div class="something-right">
            <p>{{k.title}}</p>
            <p style="color:rgb(199, 108, 28)"> {{generateTypeName(k.producttype)}}</p>
            <p>数量：<span style="padding: 4px 5px;
  width: 30px;" @click='reduce(k)'>-</span> {{k.num}} <span style="padding: 4px 5px;
  width: 30px;" @click='add(k)'>+</span>
            </p>
            <p>售价：{{k.price * k.num}}元</p>
            <div class="something-right-bottom" @click="cut(k)">
              <span></span>
            </div>
          </div>
      </li>
      <div v-if='hasOther' class='read_wrap type_wrap' style='padding: 10px 15px;' @click='changeIsRead("fqyk")'>
        <i v-if='!isRead' class='iconfont icon-circle' style='color: #666'></i>
        <i v-else class='iconfont icon-danxuanxuanzhong' style='color: #ff4800'></i>
        <span>我已仔细阅读<span @click.stop="goToXuZhi('YDXZ', '预定须知')" style='color:#ff4800 '>《预定须知》</span>并同意条款内容</span>
      </div>

    </ul>
    <div v-else>
      <v-nomore></v-nomore>
    </div>

    <!-- 购物须知 -->
    <mt-popup
      style='overflow: auto; max-height: 80vh; width: 100%; border-top-left-radius: 20px;border-top-right-radius: 20px'
      v-model="popupVisible2"
      position="bottom">
      <div style='padding: 30px 15px' v-html='content.NewsContent'>

      </div>
      <div style='margin: 10px'>
        <mt-button size='large' type='danger' @click='popupVisible2 = false'>关闭</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Baseline from '@/common/_baseline.vue'
import qs from 'qs'
import * as mockapi from '@/../mockapi'
// 提示登录组件
import {Toast} from 'mint-ui'
import NorMore from '@/components/nomore'

export default {
  components: {
    'v-baseline': Baseline,
    'v-nomore': NorMore
  },
  data() {
    return{
      num: 1,
      pageNo: 1,
      pageSize: 10,
      carList: [],
      token: '',
      selectedProp: [],
      isRead: false,
      qykIsRead: false,
      canSubmit: false,
      hasQyk: false,
      hasOther: false,
      code: '',
      content: '',
      popupVisible2: false
    }
  },
  watch: {
    carList: function (newVal, oldVal) {
      var allMoney = 0
      if (this.carList.length > 0) {
        console.log(this.carList)
        for(var i = 0; i< newVal.length; i++) {
          allMoney = allMoney + parseFloat( newVal[i].price * newVal[i].num )
        }
        this.$store.commit('updateAllMoney', allMoney)
        this.$store.commit('updateAllJs', newVal.length)
        this.$store.commit('saveCarlist', newVal)
      } else {
        this.$store.commit('updateAllMoney', 0)
        this.$store.commit('updateAllJs', 0)
      }
    }
  },
  mounted() {
    this.selectedProp = this.$store.state.selectedProp
    this.token = this.$store.state.userInfo.MemberToken
    this.getMyCar()
  },
  methods: {
    goToXuZhi(code, title) {
      // this.$router.push({path: '/shop/xz', query: {code: code, title: title}})
      this.popupVisible2 = true
      // this.$router.push({path: '/shop/xz', query: {code: code, title: title}})
      this.$store.commit('SET_LOADING', true)
        mockapi.show.api_Show_getXMJJ_get({
            params: {
                typeCode: code
            }
        }).then(response => {
            this.$store.commit('SET_LOADING', false)
            var data = response.data.data
            this.content = data
            console.log(this.content)
        }).catch(error => {
            this.$store.commit('SET_LOADING', false)
            console.log(error)
        })
    },
    checkType() {
      this.carList.forEach(item => {
        if (item.producttype == 'QYKL') {
          this.hasQyk = true
        } else if (item.producttype != 'QYKL') {
          this.hasOther = true
        }
      })
    },
    changeIsRead(type) {
      if (type == 'qyk') {
        this.qykIsRead = !this.qykIsRead
      } else {
        this.isRead = !this.isRead
      }

      if (this.hasQyk && !this.qykIsRead) {
        this.canSubmit = false
      } else if (this.hasOther && !this.isRead) {
        this.canSubmit = false
      } else {
        this.canSubmit = true
      }

      this.$emit('canSubmit', this.canSubmit)
      
      
    },
    generateTypeName(type) {
      switch (type) {
        case 'QYKL':
         return '权益卡类'
         break
        case 'LTDBL':
         return '旅游产品类'
         break
        case 'DDL':
         return '单独类'
         break
      }
    },
    getMyCar() {
      this.$store.commit('SET_LOADING', true)
      mockapi.shop.api_Shop_getMyCar_get({
        params: {
          token: this.token,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.$store.commit('SET_LOADING', false)
        var data = res.data.data
        this.carList = data
        // 检验是否含有权益卡类
        this.checkType()
      }).catch(err => {
        this.$store.commit('SET_LOADING', false)
        console.log(err)
      })
    },
    updateMycar() {
      mockapi.shop.api_Shop_getMyCar_get({
        params: {
          token: this.token,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(res => {
        var data = res.data.data
        // var isLastPage = res.data.data.pager.isLastPage
        // if (isLastPage) {
        //   this.isLoadMore = false
        // }
        this.carList = data
      })
    },
    add(k) {
      // if (this.num < (this.selectedProp[0].TotalNum - this.selectedProp[0].SoldNum)){
      //   mockapi.shop.api_Shop_updateCar_post({
      //     data: qs.stringify({
      //       token: this.$store.state.userInfo.MemberToken,
      //       PId: this.detail.PId,
      //       PropId: this.PropId,
      //       Num: this.num + 1
      //     })
      //   }).then(res => {
      //     this.num++
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // } else {
      //   Toast('已达到最大数量')
      // }

      // 暂时不限制最大购买量
      mockapi.shop.api_Shop_updateCar_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          PId: k.id,
          PropId: k.propid,
          Num: k.num + 1
        })
      }).then(res => {
        this.getMyCar()
      }).catch(err => {
        console.log(err)
      })
    },
    reduce(k) {
      if (k.num > 1) {
        mockapi.shop.api_Shop_updateCar_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            PId: k.id,
            PropId: k.propid,
            Num: k.num - 1
          })
        }).then(res => {
          this.getMyCar()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    cut(k) {
      mockapi.shop.api_Shop_deleteCar_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          PId: k.id,
          PropId: k.propid
        })
      }).then(res => {
        this.updateMycar()
      }).catch(err => {
        console.log(err)
      })
    }

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.wrap {
    width: 100%;
    .something {
        width: 100%;
        > li {
            background: #fff;
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 4vw 2vw;
            position: relative;
            height: 26vw;
            .bd();
            .something-left {
                -ms-flex: 2;
                -webkit-box-flex: 2;
                flex: 2;

                label {
                    float: left;
                    background: url("../../assets/car/images/t.svg") no-repeat center center/50% 50%;
                    input {
                        height: 14vw;
                        width: 14vw;
                        opacity: 0;
                        filter: alpha(opacity=0);
                    }
                }
                .false {
                    background: url("../../assets/car/images/f.svg") no-repeat center center /50% 50%!important;
                }

            }
            .something-middle {
                -ms-flex: 3;
                -webkit-box-flex: 3;
                flex: 3;
                height: 26vw;
                padding-left: 2vw;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .something-right {
                -ms-flex: 7;
                -webkit-box-flex: 7;
                flex: 7;
                height: 100%;
                display: -ms-flex;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-flow: column wrap;
                flex-flow: column wrap;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                padding-left: 6vw;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    height: 20px;
                    -webkit-box-orient: vertical;
                    .fz(font-size,26);
                    span{
                      padding: 10px 10px !important;
                      background: #eee;
                    }
                }
                p:last-of-type {
                    font-size: 13px;
                    line-height: 25px;
                    color: rgb(168, 168, 168);
                }
                .something-right-bottom {

                    > div {
                        display: -ms-flex;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        input {
                            width: 6vw;
                            text-align: center;
                        }

                        span {
                            height: 7vw;
                            line-height: 7vw;
                            width: 8vw;
                            display: inline-block;
                            border: 0.2vw solid #f1f1f1;
                            border-radius: 1vw;
                            text-align: center;
                            font-size: 20px;
                            cursor: pointer;
                        }
                    }
                    > span {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 13vw;
                        height: 13vw;
                        background: url("../../assets/car/images/laji.svg") no-repeat center/50%;
                    }
                }
            }
        }
    }
    label,
    span {
        &:active {
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }
    }
}
</style>
