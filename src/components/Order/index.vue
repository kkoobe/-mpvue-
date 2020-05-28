<template>
<div>
  <div class="order">
    <div class="order-com" v-for="(food,index) in order" :key="index">
      <!-- 完成订单 -->
      <div class="order-con">
        <div class="food-name">{{food.foodName}}等{{food.foodCount}}件餐品</div>
        <div class="order-status">{{food.orderStatus==true?"已完成":"未完成"}}</div>
      </div>
      <div class="food-detail">
        <div class="food-img">
          <img :src="food.foodIcon" alt="食品图片">
        </div>
        <div class="order-msg">
          <div class="order-time">下单时间：{{food.orderTime}}</div>
          <div class="total-price">总价：{{food.sumPrice}}￥</div>
        </div>
      </div>
      <div v-if="food.orderStatus" class="order-operate">
        <button plain="true" @click="toRating(food)">评价</button>
        <button plain="true" @click="handleBuyAgain(index)">再来一单</button>
      </div>
      <div v-else class="order-operate">
        <button plain="true" @click="reminder">催单</button>
        <button plain="true" @click="cancelOrder">取消订单</button>
      </div>
    </div>
  </div>
  <view class="subMsg-view" v-show="showMsgView">
    {{subMsg}}
  </view>
</div>

</template>

<script>
export default {
name:'Order',
props:['order'],
data(){
  return {
    showMsgView:false,
   subMsg:''
  }
},
methods:{
  handleBuyAgain(index){
     wx.switchTab({url:'/pages/index/main'})
    //  let sumPrice=0
    // //  Vue.prototype.$bus.shopCartFoods={foodList:[],allCount:0,sumPrice:0}
    // // name:this.food.name,count:1,price:this.food.price,foodImg:this.food.icon
    // console.log( Array.isArray(this.$bus.userOrder.foodPriceList[0]))
    // this.$bus.userOrder.foodPriceList[index].forEach((element, i) => {
    //   this.$bus.shopCartFoods.foodList={foodList:[],allCount:0,sumPrice:0}
    //    this.$bus.shopCartFoods.foodList.push({name:this.$bus.userOrder.foodsNameList[index][i],count:this.$bus.userOrder.foodCountList[index][i],price:this.$bus.userOrder.foodPriceList[index][i],foodImg:this.$bus.userOrder.foodIconList[index][i]})
    //    sumPrice+=this.$bus.userOrder.foodCountList[index][i]*this.$bus.userOrder.foodPriceList[index][i]
    // });
    //   this.$bus.shopCartFoods.allCount= this.$bus.userOrder.foodList.length
    //    this.$bus.shopCartFoods.sumPrice=sumPrice
  },
  reminder(){
    wx.request({
      url:'http://192.168.1.104:3000/setMsg',
      data:{
        type:1
      },
      method:'POST'
    })
    this.subMsg='催单成功！'
    this.showMsgView=true
    setTimeout(()=>{
      this.showMsgView=false
    },1000)
  },
  cancelOrder(){
     wx.request({
      url:'http://192.168.1.104:3000/setMsg',
      data:{type:2},
      method:'POST'
    })
    this.subMsg='已通知取消订单，等待商家确认！'
    this.showMsgView=true
    setTimeout(()=>{
      this.showMsgView=false
    },1000)
  },
  toRating(food){
   this.$bus.ratingFood=food
    wx.navigateTo({url:'/pages/order/Rating/main'})
  }
},
// mounted(){
//   this.animation=wx.createAnimation({
//     duration:5000,
//   })
//   this.animation=this.animation.opacity(1).export()
// }
}
</script>

<style lang="stylus">
// @import '../../common/stylus/mixins.styl'
.subMsg-view {
    text-align center
    color red
    font-size 16px
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    background-color #fff
  }
  .fade-enter-active,.fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
.order
  margin 0rpx 20rpx
  margin-left 10rpx
  padding-bottom 20rpx
  background-color #ddc
  .order-com
    height 300rpx
    display flex
    flex-wrap wrap
    background-color #fff
    .order-con
      flex 1
      display flex
      margin 0rpx 10rpx
      border-bottom 1rpx solid gray
      .food-name
        flex 1
        padding-top 6rpx
        padding-left 10rpx
      .order-status
        flex 0 0 200rpx
        text-align center
        padding-top 6rpx
        padding-right 10rpx
    .food-detail
      flex 0 0 100%
      margin-top 10rpx
      margin-left 10rpx
      display  flex
      .food-img
        img
          width 140rpx
          height 140rpx
          margin-top 20rpx
          margin-left 30rpx
      .order-msg
        flex 1
        padding-left 50rpx
    .order-operate
      width 100%
      display flex
      & > button
        border solid gray 1rpx
        border-radius 20rpx
        text-align center
        padding 0rpx 36rpx
        margin-bottom 10rpx
        font-size 25rpx
        height 64rpx
        background-color #eee
      :first-child
        margin-left 280rpx
      :last-child
        margin 0 50rpx
</style>
