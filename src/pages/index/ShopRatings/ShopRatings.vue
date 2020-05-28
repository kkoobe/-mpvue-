<template>
  <scroll-view style="720rpx" scroll-y="true" class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 {{rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star v-bind:score="serviceScore" v-bind:size="36" />
            <span class="score">{{serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star v-bind:score="foodScore" v-bind:size="36" />
            <span class="score">{{foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{deliveryTime}} 分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span @click="showAllRating" :class="{block:true, positive:true, active:ratingType==0}"> 全部<span  class="count">{{ratingCount}}</span> </span>
          <span @click="showGoodRating" :class="{block:true, positive:true, active:ratingType==1}"> 满意<span   class="count">{{goodRatings}}</span> </span>
          <span @click="showBadRating" :class="{block:true, positive:true, active:ratingType==2}"> 不满意<span   class="count">{{badRatings}}</span> </span>
        </div>
        <div class="switch on">
          <span class="iconfont icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in ratingsList" :key="index">
            <div class="avatar">
              <img  :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star v-bind:score="rating.score" v-bind:size="24" />
                <!-- <span class="delivery">{{rating.deliveryTime?rating.deliveryTime:'30'}}分钟</span> -->
              </div>
              <p class="text">{{rating.text?rating.text:'该用户没评论！'}}</p>
              <div class="recommend">
                <span class="iconfont icon-thumb_up"></span>
                <span v-for="(food,index1) in rating.recommend" :key="index1" class="item">{{food}}</span>
              </div>
              <div class="time">{{rateTimeList[index]}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </scroll-view>
</template>
<script>
  import Star from '../../../components/Star/Star.vue'
  import '../../../common/util'
  export default {
    name:"ShopRatings",
    data(){
      return {
        scroll:{},
        ratings:[],
        ratingType:'',
        rateTimeList:[]
      }
    },
    methods:{
      showAllRating(){
        this.ratingType=0
        console.log(this.ratingType)
      },
      showGoodRating(){
        this.ratingType=1
        console.log(this.ratingType)
      },
      showBadRating(){
        this.ratingType=2
        console.log(this.ratingType)
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
    computed:{
      score(){
        return this.$bus.shopInfo.score
      },
      foodScore(){
        return this.$bus.shopInfo.foodScore
      },
      serviceScore(){
        return this.$bus.shopInfo.serviceScore
      },
      ratingCount(){
        return this.$bus.ratings.length
      },
      goodRatings(){
        let count=0
        this.ratings.forEach(element => {
          if(element.rateType==0){
            count++;
          }
        });
        return count
      },
      badRatings(){
        return this.ratingCount-this.goodRatings
      },
      ratingsList(){
        let {ratingType,ratings}=this
        console.log(ratingType,ratings)
        if(ratingType==0){
          return ratings
        }else if(ratingType==1){
          let arr=[]
          ratings.forEach(element=>{
            if(element.rateType==0){
              arr.push(element)
            }
          })
          return arr;
        }else if(ratingType==2){
          let arr=[]
          ratings.forEach(element=>{
            if(element.rateType==1){
              arr.push(element)
            }
          })
          return arr;
        }
      },
    },
    props:{
      index:{
        type:Number,
        default:0
      }
    },
    components:{
      Star
    },
    mounted(){
      console.log(this.$bus.shopInfo,'111')
      this.ratings=this.$bus.ratings
      this.ratings.forEach(element=>{
        this.rateTimeList.push(this.dateFormat(element.rateTime))
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.ratings
  position: absolute
  top: 195px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  background: #fff
  .overview
    display: flex
    padding: 18px 0
    .overview-left
      flex: 0 0 137px
      padding: 6px 0
      width: 137px
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      text-align: center
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      .score
        margin-bottom: 6px
        line-height: 28px
        font-size: 24px
        color: rgb(255, 153, 0)
      .title
        margin-bottom: 8px
        line-height: 12px
        font-size: 12px
        color: rgb(7, 17, 27)
      .rank
        line-height: 10px
        font-size: 10px
        color: rgb(147, 153, 159)
    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left: 6px
      .score-wrapper
        margin-bottom: 8px
        font-size:0
        .title
          display: inline-block
          line-height: 18px
          vertical-align: top
          font-size: 12px
          color: rgb(7, 17, 27)
        .star
          display: inline-block
          margin: 0 12px
          vertical-align: top
        .score
          display: inline-block
          line-height: 18px
          vertical-align: top
          font-size: 12px
          color: rgb(255, 153, 0)
      .delivery-wrapper
        font-size: 0
        .title
          line-height: 18px
          font-size: 12px
          color: rgb(7, 17, 27)
        .delivery
          margin-left: 12px
          font-size: 12px
          color: rgb(147, 153, 159)
  .split
    width: 100%
    height: 16px
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    background: #f3f5f7
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      top-border-1px(rgba(7, 17, 27, 0.1));
      bottom-border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: $green
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: $green
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
  .rating-wrapper
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
          width 28px
          height 28px
      .content
        position: relative
        flex: 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rgb(7, 17, 27)
        .star-wrapper
          margin-bottom: 6px
          font-size: 0
          .star
            display: inline-block
            margin-right: 6px
            vertical-align: top
          .delivery
            display: inline-block
            vertical-align: top
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
        .text
          margin-bottom: 8px
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px
        .recommend
          line-height: 16px
          font-size: 0
          .icon-thumb_up, .icon-thumb_down, .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px
          .icon-thumb_up
            color: $yellow
          .icon-thumb_down
            color: rgb(147, 153, 159)
          .item
            padding: 0 6px
            border: 1px
            solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
</style>
