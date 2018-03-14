<template>
  <div class="titleWrap">
    <h2>{{title}}</h2>
    <span class='more' @click='triggerClick'>更多 <icon name='angle-double-right' ></icon> </span>
  </div>
</template>
<script>
  export default{
    props: {
      title: {
        required: true
      }
    },
    data() {
      return {

      }
    },
    methods: {
      triggerClick() {
        console.log(22222222222)
        this.$emit('clickMore')
      }
    }
  }
</script>
<style lang=less>
  .titleWrap {
  padding: 10px 4px;
  position: relative;
}
.titleWrap> h2{
  font-size: 14px;
  color: #333;
  text-align: center;
}
.titleWrap> .more{
  .fa-icon{
    position: relative;
    top: 3px;
  }
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 12px;
}
</style>