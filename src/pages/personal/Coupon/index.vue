<template>
  <div class="coupon-con">
    <div class="coupon-content" v-if="false">暂无内容</div>
    <div class="coupon-content" v-else>
      <CouponComponent></CouponComponent>
    </div>
  </div>
</template>

<script>
import CouponComponent from '../../../components/Coupon'
export default {
name:'Coupon',
  components:{
    CouponComponent
  }
}
</script>

<style lang="stylus">
  .coupon-con
    height 100vh
    background-color #ddc
    padding-top 20rpx
    display flex
    .coupon-content
      margin 0 auto

</style>
