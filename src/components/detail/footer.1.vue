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
    <!-- <router-link :to="{path:'/shop/car'}" class="footer-gocar">
      <i class="iconfont icon-gouwuche3-copy-copy-copy-copy"></i>
      <span v-if="carnum">{{carnum}}</span>
    </router-link> -->
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
        <div class="pick type_wrap" >
            <div v-if='propTypeNameList' v-for='(item, index) in propTypeNameList' :key='index + "a"'>
              <h1 class='type_title'>请选择商品规格</h1>
              <div style='cursor:pointer'>
                <p class='sub_title'>{{item}}：</p>
                <el-radio-group v-if='propTypeList[index]' v-model="selectedPropId[index]" size="medium">
                  <el-radio-button  v-for='(i, k) in propTypeList[index]' :disabled='i.canSel' style='cursor:pointer' @click.native.prevent="clickToggle(index, i.code, i.canSel)"  :label="i.code" :key='k'>{{i.name}}</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>

          
  
          <!-- 请选择人数 -->
          <!-- <div class='type_wrap' v-if='detail.ProductType != "QYKL"'>
              <p class='type_title'>请选择人数</p>
              <p style='margin-bottom: 4px'>
                <span class='sub_title'>大人：</span>
                <button class='num_btn' @click='reduce("adult")'>-</button>
                 <span class="num">{{adult}}位</span>
                <button class='num_btn' @click='add("adult")'>+</button>
              </p>
              <p>
                <span class='sub_title'>小孩：</span>
                <button class='num_btn' @click='reduce("children")'>-</button>
                 <span class="num">{{children}}位</span>
                <button class='num_btn' @click='add("children")'>+</button>
              </p>
          </div> -->
          
          <!-- 立即购买选项 -->
          <div v-if='isImmePay'>
            <!-- 联系人信息 -->
            <div class="type_wrap" v-if='detail.ProductType == "QYKL"'>
                <p class="type_title">信息填写</p>
                <el-form ref="qykForm" :key='index' :model="qykForm" label-width="65px">
                    <el-form-item label="联系人">
                        <el-input v-model="qykForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="qykForm.name"></el-input>
                        <span style='font-size: 12px; color:#666; position: relative; top: -8px'><span style='color: #ff4545'>*</span>请准确填写，用于接收通知</span>
                    </el-form-item>
                    <el-form-item label="邮寄地址">
                        <el-input v-model="qykForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="qykForm.idcard"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="qykForm.tip"></el-input>
                    </el-form-item>
                </el-form>  
              </div>
              <!-- 出行人信息 -->
              <!-- <div class="type_wrap" v-if='detail.ProductType != "QYKL"'>
                <p class="type_title">出行人信息</p>
                <el-form v-for='(i, index) in cxrNum' ref="cxrForm" :key='index' :model="cxrForm[index]" label-width="65px">
                    <el-form-item label="姓名">
                        <el-input v-model="cxrForm[index].cxrname"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" style='margin-bottom: -14px;'>
                        <el-input v-model="cxrForm[index].idcard"></el-input>
                    </el-form-item>
                </el-form>  
              </div> -->
              <!-- 权益卡度假政策 -->
              <div class="type_wrap" v-if='detail.ProductType == "QYKL"'>
                <p class="type_title">度假政策<a>《度假卡使用说明》</a></p>
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
              <span class='fx' v-if='detail.prop[0].gwfx && detail.prop[0].gwfx != 0 && !fxtype'>
                <i>返</i>￥{{detail.prop[0].gwfx * this.num}}
              </span>
              <!-- 分销返现 -->
              <span class='fx' v-if='detail.prop[0].hyfx && detail.prop[0].hyfx != 0 && fxtype == "fx"'>
                <i>赚</i>￥{{detail.prop[0].hyfx * this.num}}
              </span>
            </p>
            <span class='originalprice' v-if='enabledProp.length == 1 && this.DiscountPrice != this.OriginalPrice'>原价￥{{this.OriginalPrice}}</span>
          </div>
            
          <!-- 购物须知 -->
          <div class='read_wrap type_wrap' @click='changeIsRead' v-if='isImmePay && detail.ProductType != "QYKL"'>
            <i v-if='!isRead' class='iconfont icon-circle' style='color: #666'></i>
            <i v-else class='iconfont icon-danxuanxuanzhong' style='color: #ff4800'></i>
            <span>我已仔细阅读《购物须知》并同意条款内容</span>
          </div>
          <!-- 权益卡须知 -->
          <div class='read_wrap type_wrap' @click='changeIsRead' v-if='isImmePay && detail.ProductType == "QYKL"'>
            <i v-if='!isRead' class='iconfont icon-circle' style='color: #666'></i>
            <i v-else class='iconfont icon-danxuanxuanzhong' style='color: #ff4800'></i>
            <span>我已仔细阅读《权益卡使用须知》并同意条款内容</span>
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
      propTypeList0: [], //类别1
      propTypeList1: [], // 类别2
      propTypeList2: [], // 类别3
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
      enabledProp: []
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
    changeIsRead() {
      this.isRead = !this.isRead
    },
    initPropTypeList() {
      
      let allList = this.detail.prop
      // 初始化原始数组
      this.propTypeList0 = []
      this.propTypeList1 = []
      this.propTypeList2 = []
      
      this.propTypeNameList = this.detail.PropertyName
      console.log('进入类别选择')
      console.log(this.selectedPropId)
      var that = this
      var canSelList = []
      allList.forEach((item, index) => {
        // 用户未作出选择之前必须都是可选的
        if (!that.selectedPropId[0] && !that.selectedPropId[1] && !that.selectedPropId[2]) {
          if (item.Prop1) {
            that.$set(item.Prop1, 'canSel', false)
          }
          if (item.Prop2) {
            that.$set(item.Prop2, 'canSel', false)
          }
          if (item.Prop3) {
            that.$set(item.Prop3, 'canSel', false)
          }
           
        } else {
          // 这里保证已选属性可选，未做出选择的属性都不可选，后续再筛选出可选的     
          if(that.selectedPropId[0] && item.Prop1 && item.Prop1.code==that.selectedPropId[0]) {
            that.$set(item.Prop1, 'canSel', false)
          } else {
            that.$set(item.Prop1, 'canSel', true)
          }

          if(that.selectedPropId[1] && item.Prop2 && item.Prop2.code==that.selectedPropId[1]) {
            that.$set(item.Prop2, 'canSel', false)
          } else {
            if (item.Prop2) {
              that.$set(item.Prop2, 'canSel', true)
            }
            
          }

          if(that.selectedPropId[2] && item.Prop3 && item.Prop3.code==that.selectedPropId[2]) {
            that.$set(item.Prop3, 'canSel', false)
          } else {
            if (item.Prop3) {
              that.$set(item.Prop3, 'canSel', true)
            }
          }
        } 


        if (
           ((that.selectedPropId[0] && item.Prop1.code == that.selectedPropId[0]) || !that.selectedPropId[0]) &&
           ((that.selectedPropId[1] && item.Prop2.code == that.selectedPropId[1]) || !that.selectedPropId[1]) &&
           ((that.selectedPropId[2] && item.Prop3.code == that.selectedPropId[2]) || !that.selectedPropId[2]) 
        ) {
          canSelList.push(item)
        }
        if (item.Prop1) {
          that.propTypeList0.push(item.Prop1)
        }
        if (item.Prop2) {
          that.propTypeList1.push(item.Prop2)
        }
        if (item.Prop3) {
          that.propTypeList2.push(item.Prop3)
        }
      })
      console.log('可选列表')
      console.log(canSelList)

      var canSelList0 = []
      var canSelList1 = []
      var canSelList2 = []

      canSelList.forEach((item, index) => {
        if (item.Prop1) {
          canSelList0.push(item.Prop1)
        }
        if (item.Prop2) {
          canSelList1.push(item.Prop2)
        }
        if (item.Prop3) {
          canSelList2.push(item.Prop3)
        }
        
      })
      if (canSelList0.length != 0) {
        canSelList0 = uniqeByKeys(canSelList0, ['code'])
      }
      if (canSelList0.length != 0) {
        canSelList1 = uniqeByKeys(canSelList1, ['code'])
      }
      if (canSelList0.length != 0) {
        canSelList2 = uniqeByKeys(canSelList2, ['code'])
      }
      
      
      
      console.log('可选列表子列表')
      console.log(canSelList0)
      console.log(canSelList1)
      console.log(canSelList2)


      if (this.propTypeList0.length != 0) {
        this.propTypeList0 = uniqeByKeys(this.propTypeList0, ['code'])
      }
      if (this.propTypeList1.length != 0) {
        this.propTypeList1 = uniqeByKeys(this.propTypeList1, ['code'])
      }
      if (this.propTypeList2.length != 0) {
        this.propTypeList2 = uniqeByKeys(this.propTypeList2, ['code'])
      }
      

      console.log('原数组')
      console.log(this.propTypeList0)
      console.log(this.propTypeList1)
      console.log(this.propTypeList2)

      this.propTypeList0 = this.propTypeList0.map((val, index) => {
        let isSel = true
        canSelList0.forEach(item => {
          if (val.code == item.code) {
            isSel = false
          }
        })
        if (!val.canSel) {
          return val
        } else if (!isSel) {
          console.log('可选项')
          let _val = {'code': val.code, 'name': val.name, 'canSel': false}
          console.log(_val)
          return _val
        } else {
          console.log('不可选')
          let _val = {'code': val.code, 'name': val.name, 'canSel': true}
          console.log(_val)
          return _val
        }
      })
      
      this.propTypeList1 = this.propTypeList1.map((val, index) => {
        let isSel = true
        canSelList1.forEach(item => {
          if (val.code == item.code) {
            console.log('code 相同')
            isSel = false
          }
        })
        if (!val.canSel) {
          console.log('可选项直接返回')
          return val
        }else if (!isSel) {
          console.log('可选项')
          let _val = {'code': val.code, 'name': val.name, 'canSel': false}
          console.log(_val)
          return _val
        } else {
          console.log('不可选')
          let _val = {'code': val.code, 'name': val.name, 'canSel': true}
          console.log(_val)
          return _val
        }
      })

      this.propTypeList2 = this.propTypeList2.map((val, index) => {
        console.log('对比')
        console.log(this.propTypeList2)
        console.log(canSelList2)
        let isSel = true
        canSelList2.forEach(item => {
          if (val.code == item.code) {
            isSel = false
          }
        })
        if (!val.canSel) {
          return val
        }else if (!isSel) {
          console.log('可选项')
          let _val = {'code': val.code, 'name': val.name, 'canSel': false}
          console.log(_val)
          return _val
        } else {
          console.log('不可选')
          let _val = {'code': val.code, 'name': val.name, 'canSel': true}
          console.log(_val)
          return _val
        }
      })

      console.log('筛完的数组')
      console.log(this.propTypeList0)
      console.log(this.propTypeList1)
      console.log(this.propTypeList2)

      this.propTypeList = [this.propTypeList0, this.propTypeList1, this.propTypeList2]


      //将对象元素转换成字符串以作比较
      function obj2key(obj, keys){  
          var n = keys.length,  
              key = [];  
          while(n--){  
              key.push(obj[keys[n]]);  
          }  
          return key.join('|');  
      }  
      //去重操作  
      function uniqeByKeys(array,keys){
          var arr = [];  
          var hash = {};  
          for (var i = 0, j = array.length; i < j; i++) {  
              var k = obj2key(array[i], keys);  
              if (!(k in hash)) {  
                  hash[k] = true;  
                  arr .push(array[i]);  
              }  
          }  
          return arr ;  
      }
    },
    clickToggle(i, code, canSel) {
      if (canSel) {
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
      console.log('准备进入')
      this.initPropTypeList()
      this.getRealPrice()
    },
    getRealPrice() {
      mockapi.shop.api_Shop_getProductPropList_get({
        params:{
          PId: this.$route.query.pid,
          Prop1: this.selectedPropId[0] ? this.selectedPropId[0] : '',
          Prop2: this.selectedPropId[1] ? this.selectedPropId[0] : '',
          Prop3: this.selectedPropId[2] ? this.selectedPropId[0] : ''
        }
      }).then(res => {
        var data = res.data.data
        this.enabledProp = data
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
          OpenID: this.openid
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
