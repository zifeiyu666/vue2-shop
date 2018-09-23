<template lang="html">
  <section class="chose" v-if="view">
    <div class="chose-view">
      <h1 class="chose-view-title">
        {{view.ProductTitle}} 
        <!-- <p style='color: red'>规格：{{radio[0].radio}}-{{radio[1].radio}}-{{radio[2].radio}}</p> -->
      </h1>
      <p class="chose-view-intro">{{view.ProductIntro}}</p>
      <div class='item-wrap'>
        <p class='discountprice' v-if='enabledProp.length != 1'>
          <i>￥</i>{{view.minPrice}}-{{view.maxPrice}}
          <span class='fx' v-if='!fxtype && this.maxgwfx != 0'><i>返</i>￥{{this.mingwfx}}--{{this.maxgwfx}}</span>
          <span class='fx' v-if='fxtype == "fxzx" && this.maxhyfx != 0 '><i>赚</i>￥{{this.minhyfx}}--{{this.maxhyfx}}</span>
          <span class='fx' v-if='fxtype == "ywyzx" && this.maxywyfx != 0 '><i>赚</i>￥{{this.minywyfx}}--{{this.maxywyfx}}</span>
        </p>
        <p class='discountprice' v-if='enabledProp.length == 1'>
          <i>￥</i>{{this.DiscountPrice}}
          <span class='fx' v-if='!fxtype && this.gwfx!=0'><i>返</i>￥{{this.gwfx}}</span>
          <span class='fx' v-if='fxtype == "fxzx" && this.hyfx!=0 '><i>赚</i>￥{{this.hyfx}}</span>
          <span class='fx' v-if='fxtype == "ywyzx" && this.ywyfx!=0'><i>赚</i>￥{{this.ywyfx}}</span>
        </p>
        <span class='originalprice' v-if='enabledProp.length == 1 && this.DiscountPrice != this.OriginalPrice'>原价{{this.OriginalPrice}}元</span>
        
      </div>
      <div class='item-wrap'>
        <span>浏览次数： {{view.VisitTimes}}</span>
        <span>所属项目：{{view.ProjectTypeName}}</span>
      </div>
      <div class='item-wrap'>
        <span v-if='view.DBTypeName'>打包类型： {{view.DBTypeName}}</span>
        <span v-if='view.DestinationTypeName'>目的地类别： {{view.DestinationTypeName}}</span>
        <span v-if='view.AvailableNum'>使用天数：{{view.AvailableNum}}</span>
        <span v-if='view.HouseTypeName'>房型类别： {{view.HouseTypeName}}</span>
        <span v-if='view.UseStartTim'>可使用开始日期： {{parseTime(view.UseStartTime)}}</span>
        <span v-if='view.UseEndTime'>可使用截止日期：{{parseTime(view.UseEndTime)}}</span>
        <span v-if = 'view.Unable'>不可使用日期: {{view.Unable}}</span>
        <span v-if = 'view.SuitableUserName'>适用人群：{{view.SuitableUserName}}</span>
      </div>
      <div class='line'></div>
      <!-- <div class="pick" v-for='(i, index) in view.diclist' >
        <mt-button @click='toggleSelected(item)' size="small" :type="item.IsChecked ? 'primary' : 'default'" v-for="(item, k) in i.EntryList ">
          {{item.EntryName}}
        </mt-button>
        <div>
          <el-radio-group v-model="radio[index].radio">
            <el-radio-button v-for="(item, k) in i.EntryList" :label="item.EntryName"></el-radio-button>
          </el-radio-group>
        </div>
      </div> -->
      <div class="pick" >
        <div  v-if='view.diclist[0]'>
          <h1>请选择{{view.diclist[0].DicTypeName}}:</h1>
          <div style='cursor:pointer'>
            <el-radio-group v-model="radio[0].radio" @change='changeSelect' size="medium">
              <el-radio-button style='cursor:pointer' @click.native.prevent="clickToggle0(item.code)" v-for="(item, k) in modal1" :label="item.code" :key='k'>{{item.name}}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div v-if='view.diclist[1]'>
          <h1>请选择{{view.diclist[1].DicTypeName}}:</h1>
          <!-- @click.native的情况下无法实现toggle效果 -->
          <div  style='cursor:pointer'>
            <el-radio-group v-model="radio[1].radio" @change='changeSelect' size="medium">
              <el-radio-button style='cursor:pointer' @click.native.prevent="clickToggle1(item.code)"  v-for="(item, k) in modal2" :label="item.code"  :key='k'>{{item.name}}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div v-if='view.diclist[2]'>
          <h1>请选择{{view.diclist[2].DicTypeName}}:</h1>
          <div>
            <el-radio-group v-model="radio[2].radio" @change='changeSelect' size="medium">
              <el-radio-button style='cursor:pointer' @click.native.prevent="clickToggle2(item.code)"  v-for="(item, k) in modal3" :label="item.code"  :key='k'>{{item.name}}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class='line'></div>
      
    </div>
  <!-- 添加空函数 解决Safari浏览器 :active无效 -->
    <!-- <div class="chose-mychosed" ontouchstart="">
      <div class="colChose">
        <span
           v-for="(k,i) in view.chose"
           :class="{active:colSelected==i}"
           @click="colChose(i)"
         >{{k.col}}</span>
      </div>
      <div class="sizeChose" >
        <span
          v-for="(k,i) in view.chose"
          :class="{active:sizeSelected==i}"
          @click="sizeChose(i)"
        >
          {{k.size}}
        </span>
      </div>
    </div> -->



  </section>


</template>

<script>
import {
  MessageBox
} from 'mint-ui';
import {
  mapState
} from 'vuex'

import {parseTime} from '@/util/data.js'
import * as mockapi from '@/../mockapi'
export default {
  props: [
    'view'
  ],
  data() {
    return {
      selectedPropId: '', // 用户选择的规格
      type: 'default',
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
      enabledProp: [],
      modal1: [],
      modal2: [],
      modal3: [],
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
      fxtype: ''
    }
  },
  computed: {
    // 当前可选的规格
    // modal1 () {
    //   return this.view.diclist[0] ? this.view.diclist[0].EntryList : undefined
    // },
    // modal2 () {
    //   return this.view.diclist[1] ? this.view.diclist[1].EntryList : undefined
    // },
    // modal3 () {
    //   return this.view.diclist[2] ? this.view.diclist[2].EntryList : undefined
    // },
    abledModal() {
      return this.view.prop
    }
  },
  mounted() {
    this.fxtype = this.$route.query.type
    this.changeSelect()
  },
  methods: {

    //点击后把i赋值给colSelected,再通过判断决定是否添加选中样式 (active)
    // colChose(i) {
    //   this.$store.commit('CHANGE_COL_SELECTED', i);
    // },
    // sizeChose(i) {
    //   this.$store.commit('CHANGE_SIZE_SELECTED', i);
    // },
    parseTime: parseTime,
    toggleSelected(item) {
      item.IsChecked = !item.IsChecked
    },
    changeSelect() {
      mockapi.shop.api_Shop_getProductPropList_get({
        params:{
          PId: this.$route.query.pid,
          Prop1: this.radio[0].radio,
          Prop2: this.radio[1].radio,
          Prop3: this.radio[2].radio
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
        this.modal1 = []
        this.modal2 = []
        this.modal3 = []
        for(var i = 0; i < this.enabledProp.length; i++ ) {
          this.modal1.push(this.enabledProp[i].Prop1)
          this.modal2.push(this.enabledProp[i].Prop2)
          this.modal3.push(this.enabledProp[i].Prop3)
        }
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
        //进行去重
        this.modal1 = uniqeByKeys(this.modal1,['code']);
        this.modal2 = uniqeByKeys(this.modal2,['code']);
        this.modal3 = uniqeByKeys(this.modal3,['code']);
      })
    },

    clickToggle0(e) {
      console.log(1111111111111)
      e === this.radio[0].radio ? this.radio[0].radio = '' : this.radio[0].radio = e
      this.changeSelect()
    },

    clickToggle1(e) {
      console.log(2222222222222)
      e === this.radio[1].radio ? this.radio[1].radio = '' : this.radio[1].radio = e
      this.changeSelect()
    },

    clickToggle2(e) {
      console.log(3333333333333)
      e === this.radio[2].radio ? this.radio[2].radio = '' : this.radio[2].radio = e
      this.changeSelect()
    }

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.originalprice{
  text-decoration:line-through;
}
.fx{
  margin-left: 15px;
  padding-right: 15px;
  display: inline!important;
  i{
    background: @fontRed;
    color: #fff;
    // padding: 4px;
    text-align: center;
    line-height: 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  font-size: 12px;
}
.discountprice{
  font-size: 16px;
  color: red;
  i{
    font-size: 12px;
  }
}
.chose {
    background: #fff;
    padding: 3vw;
    .chose-view {
        > h1 {
            .fz(font-size,36);
            color: #2c3e50;
            > span {
                color: rgb(238, 113, 80);
            }
        }
        > span {
            line-height: 10vw;
            color: @cl;
            .fz(font-size,34);
            font-weight: 600;
        }

    }

    .chose-mychosed {

        background-color: #fff;
        > div {
            padding-top: 20px;
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;

            span {
                .fz(font-size,26);
                padding: 6px 10px;
                border: 1px solid rgb(111, 111,111);
                margin-right: 6vw;
                color: rgb(111, 111, 111);
                &.active,
                &:active {
                    color: @cl;
                    border-color: @cl;
                    -webkit-transform: scale(1.1);
                    transform: scale(1.1);
                }

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
        -moz-user-select: none;
        -webkit-user-select: none;
        .bt();
        .footer-addcar,
        .footer-gocar,
        .footer-index {
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
                top: 0.5vw;
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
            line-height: 14vw;
            height: 14vw;

            color: #fff;
            background-color: @cl;
            letter-spacing: 0.2vw;
            &:active {
                background-color: #ff7d00;
            }
        }
    }
}
.pick{
  padding-bottom: 10px;
}
.pick h1{
  font-size: 14px;
  line-height: 35px;
}
.chose-view-intro{
  color:#ff7d00;
  margin-top: 10px;
  margin-bottom: 10px;
}
.item-wrap span{
  font-size: 12px;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  padding-right: 10px;
  color: #999;
}
</style>
