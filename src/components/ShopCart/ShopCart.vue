<template>
    <div>
      <div class="shopcart-item">
        <div class="content">
          <div class="content-left">
            <div class="logo-wrapper"  @click="showShopCart=!showShopCart">
              <div class="logo highlight">
                <img class="icon-shopping_cart highlight" src="./images/shopCar.png" alt="">
              </div>
              <div class="num">{{allCount}}</div>
            </div>
            <div class="price highlight">￥{{sumPrice}}</div>
          </div>
          <div class="content-right">
            <div class="pay not-enough" v-show="addPrice>0"> 还差￥{{addPrice}} 元可支付 </div>
            <div class="pay enough"  v-show="addPrice<=0" @click="toDetail">去支付 </div>
          </div>
        </div>
        <div class="shopcart-list"  v-show="showShopCart">
          <div class="list-header">
            <h1 class="shopcart-title">购物车</h1>
            <span class="empty" @click="delShopCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food,index) in cartFoods.foodList" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="list-mask" style="display: none;"></div>
    </div>
</template>

<script>

import cartcontrol from '../CartControl/CartControl.vue'
export default {
  name:'ShopCart',
    components:{
        cartcontrol
    },
  data(){
    return {
      cartFoods:this.$bus.shopCartFoods,
      showShopCart:false
    }
  },
  computed:{
    allCount(){
      return this.$bus.shopCartFoods.allCount|0
    },
    sumPrice(){
      return this.$bus.shopCartFoods.sumPrice|0
    },
    addPrice(){
      console.log(this.$bus.shopCartFoods.sumPrice,this.$bus.shopCartFoods.allCount,this.$bus.shopInfo.minPrice)
      return this.$bus.shopInfo.minPrice-this.$bus.shopCartFoods.sumPrice
    }
  },
  methods:{
    delShopCart(){
      if(this.$bus.shopCartFoods.allCount!=0){
        this.$bus.shopCartFoods.allCount=0;
        this.$bus.shopCartFoods.foodList=[];
        this.$bus.shopCartFoods.sumPrice=0;
      }
    },
    toDetail(){
      wx.navigateTo({url:'/pages/index/payDetail/main'})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
    .shopcart-item
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 60px
        .content
            display flex
            background #141d27
            font-size 0
            color rgba(255, 255, 255, 0.4)
            .content-left
                flex 1
                .logo-wrapper
                    display inline-block
                    vertical-align top
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    border-radius 50%
                    background #141d27

                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        text-align center
                        background #2b343c
                        &.highlight
                            // background $green
                        .icon-shopping_cart
                            width 44px
                            height 44px
                            &.highlight
                                color #fff
                    .num
                        position absolute
                        top 0
                        right 0
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        border-radius 16px
                        font-size 9px
                        font-weight 700
                        color #ffffff
                        background rgb(240, 20, 20)
                        box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .price
                    display inline-block
                    vertical-align top
                    margin-top 5px
                    line-height 24px
                    padding-right 12px
                    box-sizing border-box
                    font-size 16px
                    font-weight 700
                    color #fff
                    &.highlight
                        color #fff
                .desc
                    display inline-block
                    vertical-align bottom
                    margin-bottom 15px
                    margin-left -45px
                    font-size 10px
            .content-right
                flex 0 0 105px
                width 105px
                .pay
                    height 60px
                    line-height 60px
                    text-align center
                    font-size 24rpx
                    font-weight 700
                    color #fff
                    &.not-enough
                        background #2b333b
                    &.enough
                        background #00b43c
                        color #fff
            .ball-container
                .ball
                  position fixed
                  left 32px
                  bottom 22px
                  z-index 200
                  transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner
                    width 16px
                    height 16px
                    border-radius 50%
                    background $green
                    transition all 0.4s linear
        .shopcart-list
            position absolute
            left 0
            top 0
            z-index -1
            width 100%
            transform translateY(-100%)
            &.swipe-enter-active, &.swipe-leave-active
                transition transform .3s
            &.swipe-enter, &.swipe-leave-to
                transform translateY(0)
            .list-header
                height 40px
                line-height 40px
                padding 0 18px
                background #f3f5f7
                border-bottom 1px solid rgba(7, 17, 27, 0.1)
                .shopcart-title
                    float left
                    font-size 14px
                    color rgb(7, 17, 27)
                .empty
                    float right
                    font-size 12px
                    color rgb(0, 160, 220)
            .list-content
                padding 0 18px
                max-height 217px
                overflow hidden
                background #fff
                .food
                    position relative
                    padding 12px 0
                    box-sizing border-box
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    .name
                        line-height 24px
                        font-size 14px
                        color rgb(7, 17, 27)
                    .price
                        position absolute
                        right 90px
                        bottom 12px
                        line-height 24px
                        font-size 14px
                        font-weight 700
                        color rgb(240, 20, 20)
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        bottom 30px
                        width 150rpx
                        top: 26rpx;

    .list-mask
        position fixed
        top 0
        left 0
        width 100%
        height 100%
        z-index 40
        backdrop-filter blur(10px)
        opacity 1
        background rgba(7, 17, 27, 0.6)
        &.fade-enter-active, &.fade-leave-active
            transition all 0.5s
        &.fade-enter, &.fade-leave-to
            opacity 0
            background rgba(7, 17, 27, 0)
</style>
