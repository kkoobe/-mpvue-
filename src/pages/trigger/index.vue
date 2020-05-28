<template>
  <div class="trigger-page">
    <swiper class="swiper" indicator-dots indicator-active-color="#365fa8" autoplay interval="2000" circular>
      <swiper-item class="trigger-item"><img src="../../../static/images/trigger1.jpeg" alt=""></swiper-item>
      <swiper-item class="trigger-item"><img src="../../../static/images/trigger2.jpeg" alt=""></swiper-item>
      <swiper-item class="trigger-item"><img src="../../../static/images/trigger3.jpeg" alt=""></swiper-item>
    </swiper>
    <div class="res-style">
      <img src="../../../static/images/resturant.png" alt="">
      <div class="res-name">zjj餐厅</div>
    </div>
    <input @click="handleEntery" type="button" value="开始点餐" class="entry-btn">
  </div>
</template>

<script>
export default {
  name:'trigger',
  methods:{
    handleEntery(){
      wx.switchTab({
        url:'/pages/index/main'
      })
    }
  }
}
</script>

<style>

.res-style {
  /* display: flex; */
  /* justify-content: center;
  flex-wrap: wrap; */
  text-align: center;
  margin-top: 50rpx;
}
.res-style img {
  margin-top: 20rpx;
  width:150rpx;
  height:150rpx;
}
.entry-btn {
  margin-top: 50rpx;
  width: 300rpx;
  height:80rpx;
  text-align: center;

}
.swiper {
  height: 270px;
}
.trigger-item img {
  width: 100%;
  height: 100%;
}


</style>
