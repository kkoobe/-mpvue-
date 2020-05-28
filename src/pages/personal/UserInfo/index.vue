<template>
  <div class="userinfo-con">
    <div v-if="false" class="userinfo-content">暂无内容</div>
    <div v-else class="userinfo-content">
      <a class="person-img">
        <div>头像</div>
        <span>></span>
      </a>
      <a class="person-name">
        <div>用户名</div>
        <i class="user-name style">asdasdsa</i>
        <span>></span>
      </a>
      <a  class="person-phone">
        <div >手机号</div>
        <i class="phone style">15281353221</i>
        <span>></span>
      </a>
      <a  class="person-score">
        <div>积分</div>
        <i class="score style">120分</i>
        <span>></span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
name:'PersonInfo'
}
</script>

<style lang="stylus">
  .userinfo-con
    height 100vh
    background-color #ddc
    display flex
    .userinfo-content
      flex 1
      text-liagn center
      display flex
      flex-wrap wrap
      align-content flex-start
      margin 0 20rpx
      & > a
        width 100%
        height 100rpx
        line-height 100rpx
        font-size 16px
        // background-color #eee
        margin-top 10rpx
        border-bottom 1rpx solid gray
        display flex
        &>div
          flex 1
        &>span
          width 50rpx
          margin-right 20rpx
        &>.style
          // width 160rpx
          padding 0 20rpx
          font-size 20rpx
          background-color #eee
          // display inline-block
          border-radius 10rpx
          align-self  center
          margin-right 80rpx
          text-align center
          line-height 60rpx
</style>
