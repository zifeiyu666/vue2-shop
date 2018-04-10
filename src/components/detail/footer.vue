<template lang="html">
  <footer class="footer">
    <div class="footer-index" @click='collect'>
      <span v-if='star' class='collection'>
        <icon name='star' scale='1.5'></icon>
      </span>
      <span v-else>
        <icon name='star-o' scale='1.5'></icon>
      </span>
      
    </div>
    <router-link :to="{path:'/shop/car'}" class="footer-gocar">
      <i class="icon-car"></i>
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
          商品名称:<span class="title">{{detail ? detail.p.ProductName : undefined}}</span> 
        </p>
        <p>
          商品类型:<span class="title">{{detail ? detail.p.ProductType : undefined}}</span> 
        </p>
        <p>
          价格:<span class="title">{{detail ? detail.p.DiscountPrice : undefined}}</span>
        </p>
        <p>
          规格:<span class="title">{{detail ? detail.p.ProductUnit : undefined}}</span>
        </p>
        <p>
          数量：<button style="padding: 4px 5px;
  width: 30px;" @click='reduce'>-</button> {{num}} <button style="padding: 4px 5px;
  width: 30px;" @click='add'>+</button>
        </p>
        <div class="bottom clearfix">
          <mt-button type="primary" @click='confirmShopCar'>确定</mt-button>
          <mt-button type="default" @click='consoleAddIntoCar'>取消</mt-button>
        </div>
      </div>
    </mt-popup>
    <!-- 立即购买 -->
    <mt-popup
      v-model="payVisible"
      position="bottom">
      <div class='shopcar'>
        <p>
          商品名称:dddddddddd<span class="title">{{detail ? detail.p.ProductName : undefined}}</span> 
        </p>
        <p>
          商品类型:<span class="title">{{detail ? detail.p.ProductType : undefined}}</span> 
        </p>
        <p>
          价格:<span class="title">{{detail ? detail.p.DiscountPrice : undefined}}</span>
        </p>
        <p>
          规格:<span class="title">{{detail ? detail.p.ProductUnit : undefined}}</span>
        </p>
        <p>
          数量：<button style="padding: 4px 5px;
  width: 30px;" @click='payReduce'>-</button> {{paynum}} <button style="padding: 4px 5px;
  width: 30px;" @click='payAdd'>+</button>
        </p>
        <div class="bottom clearfix">
          <mt-button type="primary" @click='confirmPay'>确定</mt-button>
          <mt-button type="default" @click='consolePay'>取消</mt-button>
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
export default {
   computed:{
     count(){
       //页面刷新后 数据会消失,解决:加判断
       if(this.$store.state.detail.count=='') {
          this.$store.commit('CHANGE_COUNT');
       }
       return this.$store.state.detail.count
     },
     productDatasView(){
       return this.$store.state.detail.productDatas.view
     },
     colSelected(){
       return this.$store.state.detail.colSelected
     },
     sizeSelected(){
       return this.$store.state.detail.sizeSelected
     }
   },
  props: ['detail', 'carnum'],
  data() {
    return {
      star: false,
      num: 1, // 购物车数量
      paynum: 1, // 立即购买数量
      popupVisible: false,
      payVisible: false,
      product: undefined
    }
  },
  methods:{
    // 收藏相关
    collect() {
      if (this.star) {
        mockapi.shop.api_Shop_cancleCollection_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            PId: this.detail.p.PId
          })
        }).then(res => {
          this.star = false
          Toast('移除收藏成功')
        })
      } else {
        mockapi.shop.api_Shop_addCollection_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            PId: this.detail.p.PId
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
          PId: this.detail.p.PId
        }
      }).then(res => {
        var data = res.data.data
        this.star = data.isSelected
      })
    },

    /* 购物车相关 */
    //  TODO: 获取购物车商品数量（缺少接口）
    getMyCarNum() {
      mockapi.shop.api_Shop_something_get({
        params: {
          token: this.$store.state.userInfo.MemberToken,
          PId: this.detail.p.PId,
          PropId: this.detail.prop.PropId,
          Num: this.num
        }
      }).then(res => {

      })
    },
    addIntoCar(){
      //  mint-ui的弹出式提示框
      this.product = [{
        title:this.productDatasView.title,
        price:this.productDatasView.price,
        size:this.productDatasView.chose[this.sizeSelected].size,
        col:this.productDatasView.chose[this.colSelected].col,
        id:this.productDatasView.id,
        imgPath:this.$store.state.detail.productDatas.swiper[0].imgSrc,
        choseBool:false
      }];
      this.popupVisible = !this.popupVisible
    },
    //  确认添加购物车 
    confirmShopCar() {
      mockapi.shop.api_Shop_addToCar_post({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          PId: this.detail.p.PId,
          PropId: this.detail.prop.PropId,
          Num: this.num
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
      if (this.num < (this.detail.p.TotalNum - this.detail.p.SoldNum)){
        mockapi.shop.api_Shop_updateCar_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            PId: this.detail.p.PId,
            PropId: this.detail.prop.PropId,
            Num: this.num + 1
          })
        }).then(res => {
          this.num++
        }).catch(err => {
          console.log(err)
        })
      } else {
        Toast('已达到最大数量')
      }
    },
    reduce() {
      if (this.num > 1) {
        mockapi.shop.api_Shop_updateCar_post({
          data: qs.stringify({
            token: this.$store.state.userInfo.MemberToken,
            PId: this.detail.p.PId,
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
      //  mint-ui的弹出式提示框
      this.product = [{
        title:this.productDatasView.title,
        price:this.productDatasView.price,
        size:this.productDatasView.chose[this.sizeSelected].size,
        col:this.productDatasView.chose[this.colSelected].col,
        id:this.productDatasView.id,
      }];
      this.payVisible = !this.payVisible
    },
    confirmPay() {
      this.payVisible = false
      console.log(1111)
      mockapi.shop.shop_generateOrder_get({
        data: qs.stringify({
          token: this.$store.state.userInfo.MemberToken,
          PId: this.detail.p.PId,
          PropId: this.detail.prop[0].PropId,
          Num: this.paynum
        })
      }).then(res => {
        this.$router.push({path: '/shop/order', query: {PId: this.detail.p.PId,
            PropId: this.detail.prop[0].PropId,}})
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
      if (this.paynum < (this.detail.p.TotalNum - this.detail.p.SoldNum)) {
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
      height: 5.5vw;
      width: 5.5vw;
      line-height: 5.5vw;
      position: absolute;
      top: .5vw;
      right: 5.5vw;
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
  padding-bottom: 60px;
  p{
    word-break: break-all;
  }
  .bottom{
    position: absolute;
    bottom: 0;
    width: 100vw;
    left:0;
    button{
      width: 50%;
      float:left;
      box-sizing: border-box;
      border-radius: 0;
    }
  }
}
</style>
