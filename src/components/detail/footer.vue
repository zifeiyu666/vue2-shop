<template lang="html">
  <footer class="footer">
    <div class="footer-index" @click='collect'>
      <span v-if='star' class='collection'>
        <icon name='star' scale='1.5'></icon>
      </span>
      <span v-else >
        <icon name='star-o'  style='color: #666' scale='1.5'></icon>
      </span>
      
    </div>
    <router-link :to="{path:'/shop/car'}" class="footer-gocar">
      <i class="iconfont icon-gouwuche3-copy-copy-copy-copy"></i>
      <span v-if="carnum">{{carnum}}</span>
    </router-link>
    <span class="footer-addcar" @click="addIntoCar">
      加入购物车
    </span>
    <span class="footer-buy" @click="goPay">
      立即购买
    </span> 
    <!-- 加入购物车 -->
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class='shopcar'>
        <p>
          商品名称:<span class="title">{{detail ? detail.ProductName : undefined}}</span> 
        </p>
        <!-- 选择规格 -->
        <div class="pick" >
          <div v-if='propTypeNameList' v-for='(item, index) in propTypeNameList' :key='index + "a"'>
            <h1>请选择{{item}}:</h1>
            <div style='cursor:pointer'>
              <el-radio-group v-model="selectedPropId[index]" @change='changeSelect' size="medium">
                <el-radio-button :disabled='i.canSel' style='cursor:pointer' @click.native.prevent="clickToggle(index, i.code, i.canSel)" v-for='(i, k) in propTypeList[index]' :label="i.code" :key='k'>{{i.name}}</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
        <p>
          价格:<span class="title">{{price ? price : ''}}</span>
        </p>
        <p>
          规格:<span class="title">{{detail ? detail.ProductUnit : undefined}}</span>
        </p>
        <p>
          数量：<button style="padding: 4px 5px;
  width: 30px;" @click='reduce'>-</button> {{num}} <button style="padding: 4px 5px;
  width: 30px;" @click='add'>+</button>
        </p>
        <div class="bottm-btn-group bottom clearfix">
          <mt-button class='confirm-btn' @click='confirmShopCar'>确定</mt-button>
          <mt-button class='concel-btn' @click='consoleAddIntoCar'>取消</mt-button>
        </div>
      </div>
    </mt-popup>
    <!-- 立即购买 -->
    <mt-popup
      v-if='selectedProp[0]'
      v-model="payVisible"
      position="bottom">
      <div class='shopcar'>
        <p>
          商品名称:<span class="title">{{detail ? detail.ProductName : undefined}}</span> 
        </p>
        <p>
          商品类型:<span class="title">{{detail ? detail.ProductTypeName : undefined}}</span> 
        </p>
        <p>
          价格:<span class="title">{{payprice}}</span>
        </p>
        <p>
          规格:<span class="title">{{detail ? detail.ProductUnit : undefined}}</span>
        </p>
        <p>
          数量：<button style="padding: 4px 5px;
  width: 30px;" @click='payReduce'>-</button> {{paynum}} <button style="padding: 4px 5px;
  width: 30px;" @click='payAdd'>+</button>
        </p>
        <div class="jf" v-if='score'>
          <mt-field label="积分抵扣:" placeholder="请输入要使用的积分" type="number" v-model="usescore" ></mt-field>
          <div class="totalScore">
            <span>当前可用积分：{{score}}</span>
            <p>可抵扣金额：{{usescore/scoreRate}}元</p>
          </div>
        </div>

        <div class="bottm-btn-group bottom clearfix">
          <mt-button class='confirm-btn' @click='confirmPay'>确定</mt-button>
          <mt-button class='concel-btn' @click='consolePay'>取消</mt-button>
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
      enabledProp: [],
      modal1: [],
      modal2: [],
      modal3: [],
      propTypeList0: [], //类别1
      propTypeList1: [], // 类别2
      propTypeList2: [], // 类别3
      propTypeList: [],
      propTypeNameList: [], // 可选类别标题
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
    }
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
    }
  },
  mounted() {
    this.openid = this.$route.query.openid ? this.$route.query.openid : ''
    this.initCollectStar()
    this.getMyCarNum()
    this.changeSelect()
    this.initPropTypeList()
  },
  methods:{
    scrollTo,
    initPropTypeList() {
      
      var allList = this.detail.prop
      // if (selectedPropId) {
      //   console.log('进入类别选择')
      //   var canSelList = []
      //   allList.forEach((item, index) => {
      //     if (item.Prop1.code == selectedPropId[0]) {
      //       canSelList.push(item)
      //     }
      //     if (index == 1 && item.Prop2.code == propCode) {
      //       canSelList.push(item)
      //     }
      //     if (index == 2 && item.Prop3.code == propCode) {
      //       canSelList.push(item)
      //     }
      //   })
      //   allList = canSelList
      //   console.log('筛选后的类别')
      //   console.log(allList)
      // }
      
      this.propTypeNameList = this.detail.PropertyName
      console.log('进入类别选择')
      console.log(this.selectedPropId[0])
      var that = this
      var canSelList = []
      allList.forEach((item, index) => {
        if (!that.selectedPropId[0] && !that.selectedPropId[1] && !that.selectedPropId[2]) {
          that.$set(item.Prop1, 'canSel', false)
          that.$set(item.Prop2, 'canSel', false)
          that.$set(item.Prop3, 'canSel', false)
        } else {
          // 这里保证已选属性可选，未做出选择的属性都不可选，后续再筛选出可选的
          that.$set(item.Prop1, 'canSel', !that.selectedPropId[0])
          that.$set(item.Prop2, 'canSel', !that.selectedPropId[1])
          that.$set(item.Prop3, 'canSel', !that.selectedPropId[2])
        }
        if (
           ((that.selectedPropId[0] && item.Prop1.code == that.selectedPropId[0]) || !that.selectedPropId[0]) &&
           ((that.selectedPropId[1] && item.Prop2.code == that.selectedPropId[1]) || !that.selectedPropId[1]) &&
           ((that.selectedPropId[2] && item.Prop3.code == that.selectedPropId[2]) || !that.selectedPropId[2]) 
        ) {
          canSelList.push(item)
        }
        that.propTypeList0.push(item.Prop1)
        that.propTypeList1.push(item.Prop2)
        that.propTypeList2.push(item.Prop3)
      })
      console.log('可选列表')
      console.log(canSelList)

      var canSelList0 = []
      var canSelList1 = []
      var canSelList2 = []

      canSelList.forEach((item, index) => {
        canSelList0.push(item.Prop1)
        canSelList1.push(item.Prop2)
        canSelList2.push(item.Prop3)
      })

      this.propTypeList0 = uniqeByKeys(this.propTypeList0, ['code'])
      this.propTypeList1 = uniqeByKeys(this.propTypeList1, ['code'])
      this.propTypeList2 = uniqeByKeys(this.propTypeList2, ['code'])
      this.propTypeList0 = this.propTypeList0.map((val, index) => {
        if (!val.canSel) {
          return val
        } else if (val.code == canSelList0[index].code) {
          return {
            'code': val.code,
            'name': val.name,
            'canSel': false
          }
        }
      })
      this.propTypeList1 = this.propTypeList1.map((val, index) => {
        console.log('aaaa')
        console.log(val.name)
        console.log('原code')
        console.log(val.code)
        console.log('现code')
        console.log(canSelList1[index].code)
        console.log()
        if (!val.canSel) {
          return val
        } else if (val.code == canSelList1[index].code) {
          console.log('进入设置')
          console.log(val)
          console.log('valaaaaa')
          return {
            'code': val.code,
            'name': val.name,
            'canSel': false
          }
        }
      })
      this.propTypeList2 = this.propTypeList2.map((val, index) => {
        if (!val.canSel) {
          return val
        } else if (val.code == canSelList2[index].code) {
          return {
            'code': val.code,
            'name': val.name,
            'canSel': false
          }
        }
      })
      console.log('筛完的数组')
      console.log(this.propTypeList1)


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
    },
    changeSelect() {
      console.log('change')

      
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
      console.log('购物车')

      this.popupVisible = !this.popupVisible
      console.log(this.popupVisible)
      //  mint-ui的弹出式提示框
      // this.selectedProp = this.$store.state.selectedProp
      // if (this.selectedProp.length == 1) {
      //   this.PropId = this.selectedProp[0].PropId
      //   this.popupVisible = !this.popupVisible
      // } else {
      //   Toast('请选择商品规格')
      //   this.scrollTo('400')
      // }
      
    },
    //  确认添加购物车 
    confirmShopCar() {
      mockapi.shop.api_Shop_addToCar_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          PId: this.detail.PId,
          PropId: this.PropId,
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
    add() {
      if (this.num < (this.selectedProp[0].TotalNum - this.selectedProp[0].SoldNum)){
        // mockapi.shop.api_Shop_updateCar_post({
        //   data: qs.stringify({
        //     token: this.$store.state.userInfo.MemberToken,
        //     PId: this.detail.PId,
        //     PropId: this.PropId,
        //     Num: this.num + 1
        //   })
        // }).then(res => {
        //   this.num++
        // }).catch(err => {
        //   console.log(err)
        // })
        this.num++
      } else {
        Toast('已达到最大数量')
      }
    },
    reduce() {
      if (this.num > 1) {
        mockapi.shop.api_Shop_updateCar_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            PId: this.detail.PId,
            PropId: this.detail.prop.PropId,
            Num: this.num - 1
          })
        }).then(res => {
          this.num--
        }).catch(err => {
          console.log(err)
        })
      }
    },
    /* 立即购买相关 */
    goPay(){
      this.selectedProp = this.$store.state.selectedProp
      if (this.selectedProp.length == 1) {
        this.PropId = this.selectedProp[0].PropId
        //  mint-ui的弹出式提示框
        this.payVisible = !this.payVisible
      } else {
        Toast('请选择商品规格')
        this.scrollTo('400')
      }
    },
    confirmPay() {
      if(this.usescore && isNaN(parseInt(this.usescore))) {
        Toast('请输入正确的积分格式')
        return 
      }
      this.payVisible = false
      mockapi.shop.api_Shop_generateOrder_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          PId: this.detail.PId,
          PropId: this.PropId,
          Num: this.paynum,
          // Score: this.usescore ? this.usescore : 0,
          OpenID: this.openid
        })
      }).then(res => {
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
  // border-bottom: 1px solid #eee;
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
