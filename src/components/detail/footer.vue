<template lang="html">
  <footer class="footer">
    <router-link :to="{path:'/shop'}" class="footer-index">
      <span>
        <i class="iconfont icon-shouye"></i>
      </span>
    </router-link>
    <router-link :to="{path:'/shop'}" class="footer-index">
      <span>
        <i class="iconfont icon-kefu"></i>
      </span>
    </router-link>
    <div class="footer-index" @click='collect'>
      <span v-if='star' class='collection'>
        <icon name='star' scale='1.5'></icon>
      </span>
      <span v-else >
        <icon name='star-o'  style='color: #666' scale='1.5'></icon>
      </span>
    </div>
    <span class="footer-addcar" @click="addIntoCar">
      加入购物车
    </span>
    <span class="footer-buy" @click="goPay">
      立即购买
    </span> 
    <!-- 加入购物车 -->
    <mt-popup
      style='overflow: auto; max-height: 95vh'
      v-model="popupVisible"
      position="bottom">
      <div class='shopcar'>
        <div>
          <!-- 选择规格 -->
        <div class="pick type_wrap" v-if='propTypeList' >
          <h1 class='type_title'>请选择商品规格</h1>
            <div v-for='(item, index) in propTypeList' :key='index'>
              
              <div style='cursor:pointer'>
                <p class='sub_title'>{{item.DicTypeName}}：</p>
                <el-radio-group v-model="selectedPropId[index]" size="mini">
                  <el-radio-button size='mini' round v-for='(i, k) in item.EntryList' :disabled='!i.IsChecked' style='cursor:pointer' @click.native.prevent="clickToggle(index, i.EntryCode, i.IsChecked)"  :label="i.EntryCode" :key='k'>{{i.EntryName}}</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          
          <!-- 立即购买选项 -->
          <div v-if='isImmePay'>
            <!-- 联系人信息 -->
            <div class="type_wrap">
                <p class="type_title">信息填写</p>
                <el-form ref="qykForm" :model="qykForm" label-width="65px">
                    <el-form-item label="联系人">
                        <el-input v-model="qykForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="qykForm.phone"></el-input>
                        <span style='font-size: 12px; color:#666; position: relative; top: -8px'><span style='color: #ff4545'>*</span>请准确填写，用于接收通知</span>
                    </el-form-item>
                    <el-form-item label="邮寄地址">
                        <el-input v-model="qykForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="qykForm.idcard"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="备注">
                        <el-input v-model="qykForm.tip"></el-input>
                    </el-form-item> -->
                </el-form>  
              </div>
              <!-- 权益卡度假政策 -->
              <div class="type_wrap" v-if='detail.ProductType == "QYKL"'>
                <p class="type_title">度假政策<span @click.stop="goToXuZhi('DJKSYSM', '度假卡使用说明')" style='color:#ff4800 '>《度假卡使用说明》</span></p>
              </div>
          </div>
          
          <!-- 数量 -->
          <p class='type_wrap'>
            <span class='type_title'>数量：</span>
            <button class='num_btn' @click='reduce("num")'>-</button> 
              <span class='num'>{{num}} </span>
            <button class='num_btn' @click='add("num")'>+</button>
          </p>
  
          <!-- 价格 -->
          <div class='type_wrap'>
            <p class='discountprice' v-if='enabledProp.length != 1'>
              总价：<i>￥</i>{{detail.minPrice}}<i v-if='detail.minPrice != detail.maxPrice'>-{{detail.maxPrice}}</i>
              <!-- 购物返现 -->
              <span class='fx' v-if='detail.maxgwfx != 0 && detail.mingwfx && !fxtype'>
                <i>返</i>￥{{detail.mingwfx}}<span v-if='detail.mingwfx != detail.maxgwfx'>-{{detail.maxgwfx}}</span>
              </span>
              <!-- 分销返现 -->
              <span class='fx' v-if='detail.maxhyfx != 0 && detail.minhyfx && fxtype=="fx"'>
                <i>赚</i>￥{{detail.minhyfx}}<span v-if='detail.minhyfx != detail.maxhyfx'>-{{detail.maxhyfx}}</span>
              </span>
            </p>
            <p class='discountprice' v-if='enabledProp.length == 1'>
              总价：<i>￥</i>{{this.DiscountPrice * this.num}}
              <!-- 购物返现 -->
              <span class='fx' v-if='enabledProp[0].gwfx && enabledProp[0].gwfx != 0 && !fxtype'>
                <i>返</i>￥{{enabledProp[0].gwfx * this.num}}
              </span>
              <!-- 分销返现 -->
              <span class='fx' v-if='enabledProp[0].hyfx && enabledProp[0].hyfx != 0 && fxtype == "fx"'>
                <i>赚</i>￥{{enabledProp[0].hyfx * this.num}}
              </span>
            </p>
            
            <span class='originalprice' v-if='enabledProp.length == 1 && this.DiscountPrice != this.OriginalPrice'>原价￥{{this.OriginalPrice}}</span>
            <p class='discountprice'  v-if='enabledProp.length == 1'>
              <span>已售：{{enabledProp[0].SoldNum}}</span>
              <span>库存：{{enabledProp[0].InventoryNum}}</span>
            </p>
          </div>
            
          <!-- 购物须知 -->
          <div class='read_wrap type_wrap' @click='changeIsRead' v-if='isImmePay && detail.ProductType != "QYKL"'>
            <i v-if='!isRead' class='iconfont icon-circle' style='color: #666'></i>
            <i v-else class='iconfont icon-danxuanxuanzhong' style='color: #ff4800'></i>
            <span>我已仔细阅读<span @click.stop="goToXuZhi('YDXZ', '预定须知')" style='color:#ff4800 '>《预定须知》</span>并同意条款内容</span>
          </div>
          <!-- 权益卡须知 -->
          <div class='read_wrap type_wrap' @click='changeIsRead' v-if='isImmePay && detail.ProductType == "QYKL"'>
            <i v-if='!isRead' class='iconfont icon-circle' style='color: #666'></i>
            <i v-else class='iconfont icon-danxuanxuanzhong' style='color: #ff4800'></i>
            <span>我已仔细阅读<span @click.stop="goToXuZhi('DJKSYSM', '度假卡使用说明')" style='color:#ff4800 '>《度假卡使用说明》</span>并同意条款内容</span>
          </div>
        </div>

        <div class="bottm-btn-group bottom clearfix">
          <div v-if='isImmePay'>
            <mt-button class='confirm-btn' @click='confirmPay'>微信支付</mt-button>
            <mt-button class='concel-btn' @click='consoleAddIntoCar'>取消</mt-button>
          </div>
          <div v-else>
            <mt-button class='confirm-btn' @click='confirmShopCar'>确定</mt-button>
            <mt-button class='concel-btn' @click='consoleAddIntoCar'>取消</mt-button>
          </div>
          
        </div>
      </div>
    </mt-popup>

    <!-- 购物须知 -->
    <mt-popup
      style='overflow: auto; max-height: 95vh'
      v-model="popupVisible2"
      position="bottom">
      <div style='padding: 30px 15px' v-html='content.NewsContent'>

      </div>
      <div style='margin: 10px'>
        <mt-button size='large' type='danger' @click='popupVisible2 = false'>关闭</mt-button>
      </div>
    </mt-popup>

  </footer>
</template>

<script>
import qs from 'qs'
import * as mockapi from '@/../mockapi'
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import {scrollTo} from '@/assets/utils'
export default {
  props: ['detail'],
  data() {
    return {
      star: false,
      num: 1, // 购物车数量
      adult: 1,
      children: 1,
      isRead: false, //是否阅读须知
      isImmePay: false, // 是否是立即购买
      lxrForm: {
        name: '',
        phone: '',
        address: ''
      },
      cxrForm: [
        {
          cxrname: '',
          idcard: '',
        }
      ],
      qykForm: {
        name: '',
        phone: '',
        address: '',
        idcard: '',
        tip: ''
      },
      paynum: 1, // 立即购买数量
      popupVisible: false,
      payVisible: false,
      product: undefined,
      PropId: '', // 用户选择的规格id
      selectedProp: [],
      carnum: '',
      score: '',
      usescore: '',
      scoreRate: '', //提现比例
      // 存储用户选择的规格信息
      radio: [
        {
          radio: ''
        },
        {
          radio: ''
        },
        {
          radio: ''
        }
      ],
      selectedPropId: [undefined, undefined, undefined], // 用户选择的规格
      modal1: [],
      modal2: [],
      modal3: [],
      propTypeList: [],
      propTypeNameList: [], // 可选类别标题
      OriginalPrice: '',
      DiscountPrice: '',
      hyfx: '',
      ywyfx: '',
      gwfx: "",
      minhyfx: '',
      maxhyfx: '',
      minywyfx: '',
      maxywyfx: '',
      mingwfx: '',
      maxgwfx: '',
      fxtype: '',
      enabledProp: [],
      code: '',
      content: '',
      popupVisible2: false
    }
  },
  computed:{
    price() {
      // return this.selectedProp[0].DiscountPrice * this.num
      return 12
    },
    payprice() {
      // return this.selectedProp[0].DiscountPrice * this.paynum
      return 12
    },
    cxrNum() {
      return this.adult + this.children
    }
  },
  mounted() {
    this.fxtype = this.$route.query.type
    this.getItemIntro(code)
  },
  // TODO： 检测数据
  watch: {
    usescore() {
      if (this.usescore > this.score || this.usescore > (this.payprice*this.scoreRate)) {
        this.usescore = this.score > this.payprice*this.scoreRate ? this.payprice*this.scoreRate : this.score
        Toast('不能超过最大可用积分')
      } else if (isNaN(parseInt(this.usescore)) ) {
        // this.usescore = '0'
        Toast('请输入整形数字')
      }
    },
    cxrNum() {
      this.cxrForm = []
      for(let i=0; i<this.cxrNum; i++) {
        this.cxrForm.push({cxrname: '', idcard: ''})
      }
    }
  },
  mounted() {
    for(let i=0; i<this.cxrNum; i++) {
      this.cxrForm.push({cxrname: '', idcard: ''})
    }
    this.openid = this.$route.query.openid ? this.$route.query.openid : ''
    this.initCollectStar()
    this.getMyCarNum()
    this.initPropTypeList()
  },
  methods:{
    scrollTo,
    goToXuZhi(code, title) {
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
    changeIsRead() {
      this.isRead = !this.isRead
    },
    initPropTypeList() {
      mockapi.shop.api_Shop_getProductProp_get({
        params:{
          PId: this.$route.query.pid,
          Prop1: this.selectedPropId[0] ? this.selectedPropId[0] : '',
          Prop2: this.selectedPropId[1] ? this.selectedPropId[1] : '',
          Prop3: this.selectedPropId[2] ? this.selectedPropId[2] : ''
        }
      }).then(res => {
        let allList = res.data.data.diclist
        this.propTypeList = allList

        this.enabledProp = res.data.data.prop
        if (this.enabledProp.length == 1) {
          this.OriginalPrice = this.enabledProp[0].OriginalPrice
          this.DiscountPrice = this.enabledProp[0].DiscountPrice
          this.ywyfx = this.enabledProp[0].ywyfx
          this.gwfx = this.enabledProp[0].gwfx
          this.hyfx = this.enabledProp[0].hyfx
        }
        this.$store.commit('saveSelectedProp', this.enabledProp)
        console.log('获取长度')
        console.log(this.$store.state.selectedProp)

      })
      
    },
    clickToggle(i, code, canSel) {
      if (!canSel) {
        console.log('不能选择')
        return
      }
      console.log(i, code)
      this.selectedPropId = this.selectedPropId.map((val, index) => {
        if (index == i) {
          if (val == code) {
            return undefined
          } else {
            return code
          }
        } else {
          return val
        }
      })

      this.initPropTypeList()
      // this.getRealPrice()
      
    },
    // 弃用老接口
    // getRealPrice() {
    //   mockapi.shop.api_Shop_getProductPropList_get({
    //     params:{
    //       PId: this.$route.query.pid,
    //       Prop1: this.selectedPropId[0] ? this.selectedPropId[0] : '',
    //       Prop2: this.selectedPropId[1] ? this.selectedPropId[1] : '',
    //       Prop3: this.selectedPropId[2] ? this.selectedPropId[2] : ''
    //     }
    //   }).then(res => {
    //     var data = res.data.data
    //     this.enabledProp = data
    //     if (this.enabledProp.length == 1) {
    //       this.OriginalPrice = this.enabledProp[0].OriginalPrice
    //       this.DiscountPrice = this.enabledProp[0].DiscountPrice
    //       this.ywyfx = this.enabledProp[0].ywyfx
    //       this.gwfx = this.enabledProp[0].gwfx
    //       this.hyfx = this.enabledProp[0].hyfx
    //     }
    //     this.$store.commit('saveSelectedProp', this.enabledProp)
    //     console.log('获取长度')
    //     console.log(this.$store.state.selectedProp)
    //   })
    // },
    initCollectStar() {
      mockapi.shop.api_Shop_isMyCollection_get({
        params: {
          token: this.$store.state.userInfo.MemberToken,
          PId: this.detail.PId
        }
      }).then(res => {
        if (res.data.result == 1) {
          this.star = true
        } else {
          this.star = false
        }
      })
    },
    // 收藏相关
    collect() {
      if (this.star) {
        mockapi.shop.api_Shop_cancleCollection_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            PId: this.detail.PId
          })
        }).then(res => {
          this.star = false
          Toast('移除收藏成功')
        })
      } else {
        mockapi.shop.api_Shop_addCollection_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            PId: this.detail.PId
          })
        }).then(res => {
          this.star = true
          Toast('收藏成功')
        })
      }
    },

    // 是否收藏
    isSelected() {
      mockapi.shop.api_Shop_isMyCollection_get({
        params:{
          token: this.$store.state.userInfo.MemberToken,
          PId: this.detail.PId
        }
      }).then(res => {
        var data = res.data.data
        this.star = data.isSelected
      })
    },

    /* 购物车相关 */
    getMyCarNum() {
      mockapi.shop.api_Shop_getMyCarCount_get({
        params:{
          token: this.$store.state.userInfo.MemberToken
        }
      }).then(res => {
        var data = res.data.data
        this.carnum = data
      })
    },

    addIntoCar(){
      this.popupVisible = !this.popupVisible
      this.isImmePay = false
    },
    //  确认添加购物车 
    confirmShopCar() {
      if(this.enabledProp.length != 1) {
        Toast('请选择商品规格')
        return
      }
      mockapi.shop.api_Shop_addToCar_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          PId: this.detail.PId,
          PropId: this.enabledProp[0].PropId,
          Num: this.num,
          FxOpenID: this.openid
        })
      }).then(res => {
        Toast('添加成功')
        this.popupVisible = false
        this.getMyCarNum()
      })
    },
    consoleAddIntoCar() {
      this.popupVisible = false
    },
    add(type) {
      if(this.enabledProp.length != 1) {
        Toast('请选择商品规格')
        return
      }
      if (type=='num') {
        if (this.num < (this.enabledProp[0].TotalNum - this.enabledProp[0].SoldNum)){
          this.num++
        } else {
          Toast('已达到最大数量')
        }
      }
      if (type=='adult') {
        this.adult++
      }
      if (type=='children') {
        this.children++
      }
      
    },
    reduce(type) {
      if(this.enabledProp.length != 1) {
        Toast('请选择商品规格')
        return
      }
      if (type=='num') {
        if (this.num > 1 ){
          this.num--
        } else {
          Toast('商品数量不能小于1')
        }
      }
      if (type=='adult') {
        if (this.adult > 0 ){
          this.adult--
        } else {
          Toast('人数不能小于0')
        }
      }
      if (type=='children') {
        if (this.children > 0 ){
          this.children--
        } else {
          Toast('人数不能小于0')
        }
      }
      

    },
    /* 立即购买相关 */
    goPay(){
      this.popupVisible = !this.popupVisible
      this.isImmePay = true
    },
    confirmPay() {
      if(this.enabledProp.length != 1) {
        Toast('请选择商品规格')
        return
      }
      if(!this.isRead) {
        Toast('请阅读并勾选阅读须知')
        return
      }
      mockapi.shop.api_Shop_generateOrder_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          PId: this.detail.PId,
          PropId: this.enabledProp[0].PropId,
          Num: this.paynum,
          OpenID: this.openid,
          Contacts: this.qykForm.name,
          Phone: this.qykForm.phone,
          Address: this.qykForm.address,
          IdNum: this.qykForm.idcard
        })
      }).then(res => {
        this.popupVisible = false
        var data = res.data.data
        this.$router.push({path: '/shop/order', query: {orderno: data.orderno, orderid: data.orderid}})
      }).catch(err => {
        console.log(err)
      })
    },
    consolePay() {
      this.payVisible = false
    },
    payReduce() {
      if(this.paynum > 1) {
        this.paynum--
      }
    },
    payAdd() {
      if (this.paynum < (this.selectedProp[0].TotalNum - this.selectedProp[0].SoldNum)) {
        this.paynum++
      } else {
        Toast('已达到最大可购买数量')
      }
    }
    
   }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
@import '../../assets/index/style.css';
.type_wrap{
  border-bottom: 1px solid @lightBorder;
  padding-bottom: 10px;
  padding-top: 10px;
  .originalprice{
    text-decoration: line-through;
    font-size: 14px;
    color: #666;
  }
  .type_title{
    font-size: 14px;
    line-height: 35px;
    height: 35px;
    color: @fontBlack;
  }
  .sub_title{
    font-size: 13px;
    color: @fontGray;
    margin-bottom: 4px;
  }
  .num_btn{
    padding: 4px 5px;
    width: 30px;
    border-radius: 4px;
    color: @fontGray;
    font-size: 14px;
  }
  .num{
    color: @fontGray;

  }
}
.iconfont{
  position: relative;
  top: -3px;
  color: @fontGray !important;
}
.pick{
  padding-bottom: 10px;
}
.pick h1{
  font-size: 14px;
  line-height: 35px;
}

.confirm-btn{
  color: #fff;
}


.jf{
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  margin-left: -10px;
  margin-right: -10px;
  border-top: none;
  .totalScore{
    text-align: right;
    padding: 0px 10px;
    span{
      font-size: 12px;
      color: #FFAA00;
    }
  }
}
.footer {
  z-index: 1000;
  width: 100%;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  height: 14vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  -moz-user-select:none;-webkit-user-select:none;
  .bt();
  .footer-index,
  .footer-gocar,
  .footer-addcar{
    text-align: center;
  }
  .footer-buy{
    text-align: center;
  }
  .footer-index {
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    line-height: 14vw;
    height: 14vw;
    padding-top: 1.5vw;
    border-right-color: #f7f7f7;
    border-right-style: solid;
    .fz(border-right-width,1);

    i {
      .fz(font-size,45);
    }
    &:active {
      background-color: #f1f1f1;
    }
  }


  .footer-gocar {
    position: relative;
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    height: 14vw;
    line-height: 14vw;
    padding-top: 1.6vw;
    span {
      height: 5vw;
      width: 5vw;
      line-height: 5vw;
      position: absolute;
      top: .5vw;
      right: 5vw;
      background-color: @cl;
      border-radius: 50%;
      color: #fff;
      .fz(font-size,24);
    }

    &:active {
      background-color: #f1f1f1;
    }
    i {
      .fz(font-size,48);
    }
  }

  .footer-addcar {
    -webkit-flex: 6;
    -ms-flex: 6;
    flex: 6;
    line-height: 14vw;      height: 14vw;

    color:#fff;
    background-color: @cl;
    letter-spacing: .2vw;
    &:active {
      background-color: #ff7d00;
    }
  }
  .footer-buy{
    -webkit-flex: 6;
    -ms-flex: 6;
    flex: 6;
    line-height: 14vw;      height: 14vw;
    color:#fff;
    background-color:  #ff4800;
    letter-spacing: .2vw;
    &:active {
      background-color: #ff9100;
    }
  }
}
.collection{
  color: #ff9100;
}
.mint-popup{
  width: 100%;
}
.shopcar{
  padding: 15px;
  // padding-bottom: 60px;
  p{
    word-break: break-all;
  }
  .bottom{
    // position: absolute;
    // bottom: 0;
    // width: 100vw;
    // left:0;
    button{
      width: 50%;
      float:left;
      box-sizing: border-box;
      border-radius: 0;
    }
  }
}
.footer .mint-popup{
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
