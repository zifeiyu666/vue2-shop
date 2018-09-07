<template lang="html">

  <div class="wrap">
    <ul
    class="something" 
    v-if='list.length != 0'>
      <li v-for="(k,i) in list" @click='goToDetail(k)'>
          <div class="something-middle">
            <img :src="k.imgurl[0]">
          </div>
          <div class="something-right">
            <p style='height:36px; overflow:hidden'>{{k.title}}</p>
            <p style="color:rgb(199, 108, 28);height:20px;"> {{k.intro}}</p>
            <p>售价：{{k.price}}元</p>
            <div class="something-right-bottom">
              <span @click='deleteCollection(k)'></span>
            </div>
          </div>
      </li>

    </ul>
    <div v-else>
        <v-nomore></v-nomore>
    </div>

    <div style='text-align: center' v-if='list.length != 0'>
        <mt-button @click='loadMore' v-if='isLoadMore'>加载更多</mt-button>
        <v-baseline v-else></v-baseline>
    </div>
  </div>
</template>

<script>
// 提示登录组件
import Gologin from '@/components/car/gologin.vue'
import Util from '../../util/common'
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import { Toast } from 'mint-ui';
import Baseline from '@/common/_baseline.vue'
import NorMore from '@/components/nomore'

export default {
  components: {
    'v-baseline': Baseline,
    'v-gologin': Gologin,
    'v-nomore': NorMore
  },
  props: ['list', 'isLoadMore'],
  mounted() {
  },

  methods: {
    deleteCollection(k) {
      var that = this
      mockapi.shop.api_Shop_cancleCollection_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          PId: k.id
        })
      }).then(res => {
        if (res.data.result == 1) {
          that.$emit('updatelist')
          Toast({
          message: '操作成功'
          });
        } 
      })
    },
    toggle() {
      setTimeout(() => {
          // 每点击一下都会改变choseBool的布尔值,所以要重置数组
          this.$store.dispatch('cutCarList',this.carList)
      }, 0);
    },
    goToDetail(k) {
        this.$router.push('')
    },
    loadMore() {
        this.$emit('loadmore')
    }

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
@import '../../assets/utils.less';
.wrap {
    width: 100%;
    .something {
        width: 100%;
        background: #fff;
        > li {
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
                    -webkit-box-orient: vertical;
                    .fz(font-size,26);
                    color: @fontBlack;
                }
                p:last-of-type {
                    .fz(font-size,22);
                    color: @fontGray;
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
