<template>
    <div class="cartcontrol-item">
      <transition>
      <div class="remove-pic" @click="downCount" v-if="count"></div>
      </transition>
      <div class="cart-count" v-if="count">{{count}}</div>
      <div class="add-pic" @click="upCount"></div>
    </div>
</template>

<script>
export default {
name:'cartcontrol',
computed:{
  count(){
    const {name}=this.food
    let count=0;
    this.$bus.shopCartFoods.foodList.forEach((element)=>{
      if(element.name==name){
        count=element.count
      }
    })
    return count;
  }
},
props:['food'],
methods:{
  upCount(){
    let hasThisFood=false
    if(!this.$bus.shopCartFoods.foodList.length){
        this.$bus.shopCartFoods.foodList=[]
        this.$bus.shopCartFoods.foodList.push({name:this.food.name,count:1,price:this.food.price,foodImg:this.food.icon})
    }
    else{
      this.$bus.shopCartFoods.foodList.forEach((element)=>{
        if(element.name==this.food.name){
          element.count++
          hasThisFood=true
        }
      })
      if(!hasThisFood){
        this.$bus.shopCartFoods.foodList.push({name:this.food.name,count:1,price:this.food.price,foodImg:this.food.icon})
      }
    }
    this.$bus.shopCartFoods.allCount=this.$bus.shopCartFoods.foodList.reduce((sum,ele)=>{
        return sum+=ele.count
      },0)
      console.log(this.$bus.shopCartFoods.allCount)
      this.$bus.shopCartFoods.sumPrice=this.$bus.shopCartFoods.foodList.reduce((sum,ele)=>{
        return sum+=ele.count*ele.price
      },0)
    console.log(this.food)
    console.log(this.$bus.shopCartFoods)
  },
  downCount(){

    this.$bus.shopCartFoods.foodList.forEach((element,index)=>{
      if(element.name==this.food.name){
        element.count--

        if(this.count==0){
          this.$bus.shopCartFoods.foodList.splice(index,1)
        }
      }
     if(this.$bus.shopCartFoods.foodList.length){
         this.$bus.shopCartFoods.allCount=this.$bus.shopCartFoods.foodList.reduce((sum,ele)=>{
         return sum+=ele.count
       },0)
       console.log(this.$bus.shopCartFoods.allCount)
       this.$bus.shopCartFoods.sumPrice=this.$bus.shopCartFoods.foodList.reduce((sum,ele)=>{
         return sum+=ele.count*ele.price
       },0)
     }else{
       this.$bus.shopCartFoods.allCount=0;
       this.$bus.shopCartFoods.sumPrice=0;
     }
    })
  }
},

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.cartcontrol-item
    font-size: 0
    .remove-pic
        display: inline-block
        width 24px
        height 24px
        background-image url(./images/remove.png)
        background-size 24px 24px
        &.v-enter-active,&.v-leave-active
          transition:all .3s
        &.v-enter,&.v-leave-to
          opacity 0;
          transform translateX(15px) rotate(180deg)
    .cart-count
        display: inline-block
        vertical-align: top
        width: 24px
        line-height: 24px
        text-align: center
        font-size: 14px
        color: rgb(147, 153, 159)
    .add-pic
        display: inline-block
        width 24px
        height 24px
        background-image url('./images/add.png')
        background-size 24px 24px
        position: absolute;
        right: 6px;

</style>
