<template>
  <div class="coupon-com">
    <div class="coupon-detail">
      <div class="coupon-price">
        <div>￥2</div>
        <div>满2元可用</div>
      </div>
      <div class="coupon-msg">
        <span>2元优惠券</span>
        <span>全场可用</span>
        <span>2020.03.30-2020.04.08</span>
      </div>
    </div>
    <div class="coupon-use">
      <div class="coupon-time">即将到期</div>
      <button class="use-soupon">立即使用</button>
    </div>
  </div>
</template>

<script>
export default {
 name:'CouponComponent'
}
</script>

<style lang="stylus">
  .coupon-com
    height 146rpx
    margin 10rpx 10rpx
    // border solid gray 1rpx
    border-radius 10rpx
    background-color #fff
    padding 10rpx 20rpx
    overflow hidden
    display flex
    .coupon-detail::before
      content "."
      display block
      width 8px
      height 8px
      border 1px solid gray
      border-radius 16rpx
      position absolute
      right: -10rpx;
      top: -20rpx;
      background-color: #ddc;
    .coupon-detail::after
      content "."
      display block
      width 8px
      height 8px
      border 1px solid gray
      border-radius 16rpx
      position absolute
      right: -10rpx;
      bottom : -20rpx;
      background-color: #ddc;
    .coupon-detail
      flex 1
      border-right 1rpx dashed gray
      display flex
      position relative
      :first-child
        flex 0 0 150rpx
        margin-right 20rpx
        text-align center
        :first-child
          color red
          font-size 50rpx
        :last-child
          font-weight bold
          font-size 24rpx
      :last-child
        flex 1
        display flex
        flex-wrap wrap
        &>span
          width 100%
          font-size 20rpx
          color #222
        :first-child
          font-size 28rpx
    .coupon-use
      margin-top 20rpx
      flex 0 0 200rpx
      text-align center
      :first-child
        color #dd0000
        font-size 20rpx
      :last-child
        width 176rpx
        background-color #f00
        border-radius 50rpx
        color white
        text-align center
        font-size 26rpx
        margin-top 10rpx
</style>
