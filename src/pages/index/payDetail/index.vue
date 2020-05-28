<template>
<div>
  <div class="detail-content">
    <div class="order-method">
      <button  :class="{current:selectMethod}" @click="selectMethod=true">餐厅就餐</button>
      <button :class="{current:!selectMethod}" @click="selectMethod=false">打包带走</button>
    </div>
    <div class="order-wait">
      <span>预计就餐时间：12:00</span>
    </div>
    <div class="order-detail" v-for="(food,index) in shopCartFoodList" :key="index">
      <div class="detail-left">
        <div>
           <img :src="food.foodImg" alt="">
        </div>
        <div class="detail-name">
          {{food.name}}
        </div>
      </div>
      <div class="detail-count">
        <div>x{{food.count}}</div>
      </div>
      <div class="detail-right">
        <div>{{food.price*food.count}}￥</div>
      </div>
    </div>
    <div class="order-mark">
      <a href="javascript:;" @click="handleRemark">订单备注 <span>></span> </a>
      <input type="text" class="remarkArea" :focus="showRemarkArea" placeholder="请添加备注信息" v-model="remark" v-show="showRemarkArea">
    </div>
  </div>
  <div class="order-pay">
    <div class="content-left">
      <div class="num">应付￥{{shopCart.sumPrice}}</div>
      <div class="price highlight">以优惠￥10</div>
    </div>
    <div class="content-right">
      <!-- <div class="pay not-enough"> 还差￥20 元可支付 </div> -->
      <div class="pay enough" @click="submitOrder">去支付 </div>
    </div>
  </div>
  <view class="msg-view" v-show="showMsg">{{subMsg}}</view>
</div>
</template>

<script>
export default {
  name:'payDetail',
  data(){
    return {
      shopCartFoodList:[],
      showRemarkArea:false,
      shopCart:{},
      subMsg:'',
      showMsg:false,
      remark:'未添加备注！',
      selectMethod:true,
    }
  },
  sockets:{
    connect:function(){
      console.log('连接成功')
    },
  },
  mounted(){
    this.shopCartFoodList=this.$bus.shopCartFoods.foodList
    this.shopCart=this.$bus.shopCartFoods;
    console.log(this.shopCartFoodList)
  },
  methods:{
    handleRemark(){
      this.showRemarkArea=true
    },
  // "orderStatus":Boolean,
  // "tableId":Number,
  // "foodsName":Array,
  // "foodsCount":Array,
  // "sumPrice":String,
  // "remarkInfo":String,
  // "orderId":String,
  // "orderTime":Date
    submitOrder(){
      let foodsName=[]
      let foodsCount=[]
      this.shopCartFoodList.forEach(element => {
        foodsName.push(element.name)
        foodsCount.push(element.count)

      });
      let sumPrice=this.shopCart.sumPrice.toString()
      let remarkInfo=this.remark
      wx.request({
        url:'http://192.168.1.104:3000/setMsg',
        data:{type:0,foodsName,foodsCount,sumPrice,remarkInfo,openid:this.$bus.openid},
        method:'POST'
      })
    this.subMsg='下单成功'
    this.showMsg=true
    setTimeout(()=>{
      this.showMsg=false
    },1000)
    }
  }
}
</script>

<style lang="stylus">
.msg-view {
  text-align center
  position absolute
  top 50%
  left 50%
  transform translate(-50%,-50%)
  color red
  font-size 16px
}
  .detail-content {
    display: flex;
    flex-wrap:wrap;
  }
  .detail-content >div {
    flex:0 0 100%;
    height: 150rpx;
    border-bottom: 1rpx #999 solid;
  }
  .detail-content:last-child {
    height 100px
  }
  .order-method {
    display: flex;
    justify-content:flex-start;
    align-items: center;
  }
  .order-method >button {
    flex: 0 0 180rpx;
    height: 30px;
    line-height: 30px;
    // background-color: #e0e;
    color: lightseagreen;
    font-size: 14px;
    margin: 10px;
  }
  .current {
    background-color: lightBlue;
  }
  .order-detail {
    display: flex;
    justify-content: space-around;
    align-items: center;
    }
  .order-pay
    height 60px
    width 100%
    display flex
    background #141d27
    position fixed
    bottom 0px
    color rgba(255, 255, 255, 0.4)
    text-align center
    padding  0 10px
    .content-left
      flex 1
      display flex
      flex-wrap wrap
      box-sing border-box
      padding 15px 0
      .num
        flex 1
        display inline-block
        vertical-align top
        margin-top 5px
        line-height 24px
        padding-right 12px
        box-sizing border-box
        font-size 14px
        font-weight 700
        color #fff
      .price
        flex 1
        display inline-block
        vertical-align top
        margin-top 5px
        line-height 24px
        padding-right 12px
        box-sizing border-box
        font-size 14px
        font-weight 700
        color #fff
        &.highlight
          color #fff
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        height 60px
        line-height 60px
        text-align center
        font-size 12px
        font-weight 700
        color #fff
        &.enough
          background #00b43c
          color #fff
.order-detail
  display flex
  justify-content space-around
  align-items center
 .detail-left
    flex 2
    display flex
    div
      flex 0 0 114rpx
      height 114rpx
      margin-left 20px
      img
        width 100%
        height 100%
    .detail-name
      flex 0 0 200rpx
      margin 0 20px
      line-height 130rpx
  .detail-count
    flex 1
    font-size 14px
    text-align center
  .detail-right
    flex 1
    color red
    font-size 16px
    text-align right
    padding-right 20px
</style>
