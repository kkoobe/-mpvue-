<template>
  <div class="order-page">
      <nav>
        <a :class="{'nav-item':true, 'nav-item-active':navIndex==0}" href="javascript:;" @click="getOrderAll(0)">全部订单</a>
        <a :class="{'nav-item':true, 'nav-item-active':navIndex==1}" href="javascript:;" @click="getOrderIncomplete(1)">未完成</a>
        <a :class="{'nav-item':true, 'nav-item-active':navIndex==2}" href="javascript:;"  @click="getOrderComplete(2)">已完成</a>
      </nav>
      <div class="order-content" v-if="orderList">
        <div v-show="showIncomplete" class="incomplete-content">
          <Incomplete :incompleteOrder="incompleteOrder" />
        </div>
        <div v-if="showComplete" class="complete-content">
          <Complete :completeOrder="completeOrder" />
        </div>
      </div>
      <div class="no-order" v-else>
        <div>
          你还没有订单，快去首页选购吧！
        </div>
      </div>
  </div>
</template>

<script>
import Complete from './Complete'
import Incomplete from './Incomplete'
export default {
  data(){
    return {
      showComplete:true,
      showIncomplete:true,
      navIndex:0,
      orderList:[]
    }
  },
  computed:{
    incompleteOrder(){
      let list=[]
      // console.log(this.orderList)
      if(this.orderList.foodCountList){
        this.orderList.foodCountList.forEach((element,index)=> {
          if(this.orderList.orderStatusList[index]==false){
            list.push({foodCount:this.orderList.foodCountList[index],foodIcon:this.orderList.foodIconList[index],foodName:this.orderList.foodNameList[index],sumPrice:this.orderList.sumPriceList[index],orderStatus:this.orderList.orderStatusList[index],orderTime:this.orderList.orderTimeList[index]})
          }
        });
      }
      return list
    },
    completeOrder(){
      let list=[]
      if(this.orderList.foodCountList){
        this.orderList.foodCountList.forEach((element,index)=> {
          if(this.orderList.orderStatusList[index]==true){
            list.push({foodCount:this.orderList.foodCountList[index],foodIcon:this.orderList.foodIconList[index],foodName:this.orderList.foodNameList[index],sumPrice:this.orderList.sumPriceList[index],orderStatus:this.orderList.orderStatusList[index],orderTime:this.orderList.orderTimeList[index],foodPriceList:this.orderList.foodPriceList[index]})
          }
        });
      }
      return list
    }
  },
  components: {
    Complete,
    Incomplete
  },
  methods:{
    getOrderAll(index){
      this.showComplete=true
      this.showIncomplete=true
      this.navIndex=index
    },
    getOrderComplete(index){
      this.showIncomplete=false
      this.showComplete=true
      this.navIndex=index
    },
     getOrderIncomplete(index){
      this.showIncomplete=true
      this.showComplete=false
      this.navIndex=index
    },
    dateFormat(date){
      let dateTime=new Date(date)
      let month= dateTime.getMonth()<10?"0"+dateTime.getMonth():dateTime.getMonth()
      let day =dateTime.getDay()<10?'0'+dateTime.getDay():dateTime.getDay()
      let hours =dateTime.getHours()<10?'0'+dateTime.getHours():dateTime.getHours()
      let minutes =dateTime.getMinutes()<10?"0"+dateTime.getMinutes():dateTime.getMinutes()
      return month+'/'+day+" "+hours+":"+minutes
    }
  },
  mounted(){
    wx.request({
      url:'http://192.168.1.104:3000/getUserOrder',
      success:(res)=>{
        // console.log(res)
       this.$bus.userOrder=res.data.data
       this.orderList=this.$bus.userOrder
       this.orderList.orderTimeList=this.orderList.orderTimeList.map(element=>{
         return element=this.dateFormat(element)
       })
       console.log(this.$bus.userOrder)
      }
    })
  }
}
</script>

<style lang="stylus" >
  @import '../../common/stylus/mixins.styl'
    nav
      display flex
      justify-content space-around
      .nav-item
        flex 1
        height 30px
        line-height 30px
        font-size 16px
        margin 0 30px
        color gray
        text-align center
        &.nav-item-active
          color $green
          border-bottom solid 1px $green
    .order-content
      margin-top 20rpx
    .no-order
      background-color #eee
      div
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
        width 240px
  </style>
