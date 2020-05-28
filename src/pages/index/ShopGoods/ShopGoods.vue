<template>
<div>
    <div class="goods">
      <scroll-view  scroll-y="true" style="height:300px;"  class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li @click="handleFoodList(index)" v-for="(goods,index) in goodsDatas" :key="index" :class="{'menu-item':true,'current':currentIndex==index}">
            <span class="text bottom-border-1px">
              <img v-if="goods.icon" class="icon" :src="goods.icon"> {{goods.name}}
            </span>
          </li>
        </ul>
      </scroll-view>
      <scroll-view @scroll="handleFoodScroll" :scroll-into-view="currentView" style="height:358px" scroll-y="true" class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list-hook" v-for="(goods,index) in goodsDatas" :key="index">
            <h1 class="title" :id="'id_'+index">{{goods.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index1) in goods.foods" :key="index1">
                <div  class="icon">
                  <img :src="food.icon">
                </div>
                <div class="content">
                  <div class="content-text" @click="showFood(food)">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc" style="overflow:hidden;text-overflow:ellipsis;height:10px;">{{food.description}}</p>
                    <div class="extra">
                      <div style="margin-bottom:2px;padding:0;" class="count">月售 {{food.sellCount}} 份</div>
                      <div  style="margin:0;padding:0">好评率 {{food.rating}}%</div>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                    </div>
                  </div>
                  <div class="cartcontrol-wrapper">
                     <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </scroll-view>
    </div>
    <food :food="copyFood" v-if="showFoodImg" @func="hiddenFoodImg" />
    <shopCart ></shopCart>
  </div>
</template>


<script>
  import cartcontrol from '../../../components/CartControl/CartControl.vue'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'

  export default {
    name:'ShopGoods',
    data(){
      return {
        goodsDatas:[],
        foodCategoryToplist:[], //存放每一个分类的top值；
        query:{},
        currentIndex:'',
        scrollTop:0,
        currentView:0,
        showFoodImg:false,
        copyFood:{}
      }
    },
    components: {
      cartcontrol,
      Food,
      ShopCart
    },
    mounted(){
      const _this=this
      this.goodsDatas=this.$bus.goodsDatas
      wx.nextTick(()=>{
        _this.query=wx.createSelectorQuery();
        _this.query.selectAll('.title').boundingClientRect();
      })
      setTimeout(()=>{
        _this.query.exec(res=>{
          res[0].forEach(element => {
            if(element.top!=0){
              console.log(element.top)
              this.foodCategoryToplist.push(element.top)
              console.log(this.foodCategoryToplist)
            }
          });
        })
      },1000)
    },
    methods:{
      handleFoodList(index){
        let foodCategoryName=this.goodsDatas[index].name;
        this.currentIndex=index
        console.log(this.currentIndex)
        this.currentView='id_'+index
      },
      handleFoodScroll(e){
        // console.log(1111)
        // console.log(e)
        this.scrollTop=Math.ceil(e.mp.detail.scrollTop)
        // console.log('1111',e.mp.detail.scrollTop)
        this.foodCategoryToplist.forEach((element,index,array)=>{
           if(this.scrollTop>=element-200&&this.scrollTop<array[index+1]-200){
          //  console.log(index)
            this.currentIndex=index
           }
          else if(this.scrollTop>=element-200&&index==array.length-1){
            this.currentIndex=index
          }
        })
        // console.log(this.currentIndex)

      },
      hiddenFoodImg:function(){
        // console.log(222)
        this.showFoodImg=false
      },
      showFood(food){
        this.copyFood=food
        this.showFoodImg=true
        console.log(food)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 400rpx
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px( rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
          img
           width 114rpx
           height 114rpx
        .content
          flex: 1
          display flex
          .content-text
            flex 1
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
              overflow hidden
              text-overflow ellipsis
            .desc, .extra

              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .desc
              line-height: 12px
              margin-bottom: 8px
            .extra
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            flex: 0 0 150rpx;
            position: relative;
            top: 40rpx;

</style>
