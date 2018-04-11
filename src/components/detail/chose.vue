<template lang="html">
  <section class="chose" v-if="view">
    <div class="chose-view">
      <h1 class="chose-view-title">
        {{view.ProductTitle}} 
        <!-- <p style='color: red'>规格：{{radio[0].radio}}-{{radio[1].radio}}-{{radio[2].radio}}</p> -->
      </h1>
      <div>
        <span>原价：{{view.OriginalPrice}}元</span>
        <span>折扣价：{{view.DiscountPrice}}元</span>
      </div>
      <div>
        <span>浏览次数： {{view.VisitTimes}}</span>
        <span>所属项目：{{view.ProjectTypeName}}</span>
        
      </div>
      <div>
        <span>打包类型： {{view.DBTypeName}}</span>
        <span>目的地类别： {{view.DestinationTypeName}}</span>
        <span>使用天数：{{view.AvailableNum}}</span>
        <span>房型类别： {{view.HouseTypeName}}</span>
        <span>可使用开始日期： {{view.UseStartTime}}</span>
        <span>可使用截止日期：{{view.UseEndTime}}</span>
        <span>不可使用日期: {{view.Unable}}</span>
        <span>适用人群：{{view.SuitableUser}}</span>
      </div>
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
          <h1>{{view.diclist[0].DicTypeName}}:</h1>
          <el-radio-group v-model="radio[0].radio" @change='changeSelect'>
            <el-radio-button v-for="(item, k) in modal1" :label="item.EntryCode">{{item.EntryName}}</el-radio-button>
          </el-radio-group>
        </div>
        <div v-if='view.diclist[1]'>
          <h1>{{view.diclist[1].DicTypeName}}:</h1>
          <el-radio-group v-model="radio[1].radio" @change='changeSelect'>
            <el-radio-button v-for="(item, k) in modal2" :label="item.EntryCode">{{item.EntryName}}</el-radio-button>
          </el-radio-group>
        </div>
        <div v-if='view.diclist[2]'>
          <h1>{{view.diclist[2].DicTypeName}}:</h1>
          <el-radio-group v-model="radio[2].radio" @change='changeSelect'>
            <el-radio-button v-for="(item, k) in modal3" :label="item.EntryCode">{{item.EntryName}}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <p class="chose-view-intro">{{view.ProductIntro}}</p>
    </div>
  <!-- 添加空函数 解决Safari浏览器 :active无效 -->
    <div class="chose-mychosed" ontouchstart="">
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
    </div>



  </section>


</template>

<script>
import {
  MessageBox
} from 'mint-ui';
import {
  mapState
} from 'vuex'


export default {
  props: [
    'view'
  ],
  data() {
    return {
      selected: ['版本1', '红色', '32g'], // 用户选择的规格
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
      ]
    }
  },
  computed: {
    // 当前可选的规格
    modal1 () {
      return this.view.diclist[0] ? this.view.diclist[0].EntryList : undefined
    },
    modal2 () {
      return this.view.diclist[1] ? this.view.diclist[1].EntryList : undefined
    },
    modal3 () {
      return this.view.diclist[2] ? this.view.diclist[2].EntryList : undefined
    },
    abledModal() {
      return this.view.prop
    }
  },
  methods: {

    //点击后把i赋值给colSelected,再通过判断决定是否添加选中样式 (active)
    colChose(i) {
      this.$store.commit('CHANGE_COL_SELECTED', i);
    },
    sizeChose(i) {
      this.$store.commit('CHANGE_SIZE_SELECTED', i);
    },
    toggleSelected(item) {
      item.IsChecked = !item.IsChecked
    },
    changeSelect() {

    }

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.chose {
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
                height: 5.5vw;
                width: 5.5vw;
                line-height: 5.5vw;
                position: absolute;
                top: 0.5vw;
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
</style>
