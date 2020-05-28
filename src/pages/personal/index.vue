<template>
  <div class="personal-page">
    <div class="person-msg" v-if="userInfo.nickName">
     <img :src="userInfo.avatarUrl" alt="">
      <p type=“userNickName”>{{userInfo.nickName}}</p>
    </div>
    <div class="person-msg" v-else>
       <button open-type="getUserInfo"  @getuserinfo="handleGetUserInfo">{{'登录'}}</button>
    </div>
    <div class="person-menu">
      <div class="person-menu-item"  @click="toPersonInfo">
        <a  href="javascript:;">个人信息</a>
        <span class="menu-item-icon">></span>
      </div>
      <div class="person-menu-item"  @click="toCoupon">
        <a  href="javascript:;">优惠劵</a>
        <span class="menu-item-icon">></span>
      </div>
      <div class="person-menu-item">
        <a href="javascript:;">客服电话:15281353221</a>
        <span>></span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
name:'Personal',
data(){
  return {
    userInfo:{}
  }
},
methods:{
  toPersonInfo(){
    wx.navigateTo({url:'/pages/personal/UserInfo/main'})
  },
  toCoupon(){
    wx.navigateTo({url:'/pages/personal/Coupon/main'})
  },
  toMenberCenter(){
    wx.navigateTo({url:'/pages/personal/MenberCenter/main'})
  },
  handleGetUserInfo(res){
    console.log(res);
    if(res.mp.detail.userInfo){
          this.userInfo = res.mp.detail.userInfo
        }
  }
},
mounted(){
 this.userInfo=this.$bus.userInfo
}
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl'
  .person-msg
    display flex
    flex-wrap nowrap
    align-items center
    width 100%
    height 100px
    background-color #ddc
    padding-left 10px
    img
      width 40px
      height 40px
      border solid 1px $green
      border-radius 10px
    .per-name
      margin-left 20px
      margin-top 20px
      font-size 16px
    .login
      margin auto
  .person-menu
    margin-top 10px
    padding 0 20rpx
    .person-menu-item
      display flex
      height 40px
      align-items center
      border-bottom solid $green 1rpx
      a
        flex 1
      :active
        background-color #fff
      span
        flex 0 0 30px
        right 5px
</style>
