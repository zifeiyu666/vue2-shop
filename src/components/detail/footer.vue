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
    <router-link  :to="{name:'购物车页'}" class="footer-gocar">
      <i class="icon-car"></i>
      <span v-if="count">{{count}}</span>
    </router-link>
    <span class="footer-addcar" @click="addIntoCar">
      加入购物车
    </span>
    <span class="footer-buy" @click="goPay">
      立即购买
    </span>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class='shopcar'>
        <p>
          商品名称:<span class="title">{{product ? product[0].title : undefined}}</span> 
        </p>
        <p>
          价格:<span class="title">{{product ? product[0].price : undefined}}</span>
        </p>
        <p>
          规格:<span class="title">{{product ? product[0].size : undefined}}</span>
        </p>
        <p>
          颜色:<span class="title">{{product ? product[0].col : undefined}}</span>
        </p>
        <p>
          商品ID:<span class="title">{{product ? product[0].id : undefined}}</span>
        </p>
        <p>
          数量：<button style="padding: 4px 5px;
  width: 30px;" @click='reduce'>-</button> {{num}} <button style="padding: 4px 5px;
  width: 30px;" @click='add'>+</button>
        </p>
        <div class="bottom clearfix">
          <mt-button type="primary" @click='confirmAddIntoCar'>确定</mt-button>
          <mt-button type="default" @click='consoleAddIntoCar'>取消</mt-button>
        </div>
        
      </div>
    </mt-popup>
  </footer>
</template>

<script>
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
  data() {
    return {
      star: false,
      num: 1,
      popupVisible: false,
      product: undefined
    }
  },
   methods:{
     collect() {
       this.star = !this.star
       if (this.star) {
         Toast('收藏成功')
       } else{
         Toast('移除收藏成功')
       }
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
     confirmAddIntoCar() {
      this.$store.dispatch('setLocalCount',true);
      this.$store.dispatch('addCarList',this.product);
      console.log('购物车商品数量')
      console.log(this.$store.state.detail.carList)
      Toast({
        message:'添加成功',
        duration:1000
      });
      this.popupVisible = false
     },
     consoleAddIntoCar() {
       this.popupVisible = false
     },
     //点击跳转到支付页
    goPay(){
        //  mint-ui的弹出式提示框
      const product = [{
        title:this.productDatasView.title,
        price:this.productDatasView.price,
        size:this.productDatasView.chose[this.sizeSelected].size,
        col:this.productDatasView.chose[this.colSelected].col,
        id:this.productDatasView.id,
        imgPath:this.$store.state.detail.productDatas.swiper[0].imgSrc,
        choseBool:true //这里直接设置为true
      }];

      this.$store.dispatch('addCarList',product).then(
        res=> {
          console.log(123)
          console.log(this.$store.state.carList)
          // 直接跳转到生成订单页面
            this.$router.push('/shop/order')
        }
      )
    },
    add() {
      console.log(1111)
      this.num++
    },
    reduce() {
      if (this.num >0) {
        this.num--
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
