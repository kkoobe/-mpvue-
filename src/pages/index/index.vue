<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item">
       <a @click="handleTrigger(0)" href="javascript:;" :class="{ 'link-active' : index==0}">点餐</a>
      </div>
      <div class="tab-item">
        <a @click="handleTrigger(1)" href="javascript:;"  :class="{ 'link-active' : index==1}" >评价</a>
      </div>
      <div class="tab-item">
        <a @click="handleTrigger(2)" href="javascript:;" :class="{ 'link-active' : index==2}">商家</a>
      </div>
    </div>
    <div class="trigger-menu" ref="wrapper">
      <div v-show="index==0">
        <ShopGoods  />
      </div>
      <div v-show="index==1">
        <shop-ratings  />
      </div>
      <div v-show="index==2" >
        <ShopInfo />
      </div>
    </div>
  </div>
</template>

<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
  import ShopGoods from './ShopGoods/ShopGoods.vue'
  import ShopRatings from './ShopRatings/ShopRatings.vue'
  import ShopInfo from './ShopInfo/ShopInfo.vue'
  export default {
    // mounted () {
    //   this.$store.dispatch('getShopInfo')
    // },
    data(){
      return {
         index:0
      }
    },
    components: {
      ShopHeader,
      ShopGoods,
      ShopRatings,
      ShopInfo
    },
    methods:{
      handleTrigger(ind){
        this.index=ind
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float  left
      width 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.link-active
          color $green
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background $green
</style>
