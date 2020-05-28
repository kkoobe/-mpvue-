<template>
  <div>
    <div class="food-content">
      <div class="food-img"><img :src="foodIcon" alt=""></div>
      <div class="food-name">{{foodName}}等{{foodCount}}件餐品</div>
    </div>
    <div class="score">
      <div class="food-score">
        <h3>食物打分:</h3>
        <star size="48" :score="score" @setscore="setScore(newScore)"/>
      </div>
      <div class="service-score">
        <h3>服务打分:</h3>
        <star size="48" :score="score" />
      </div>
    </div>
    <div class="food-text">
      <h3>点评：</h3>
      <textarea v-model="ratingText" name="" id="" cols="30" rows="10" placeholder="评论"></textarea>
    </div>
    <div class="score-submit">
      <button @click="submitRating">提交</button>
    </div>
  </div>
</template>

<script>
import star from '../../../components/Star/Star'
export default {
  name:'Rating',
  components:{
    star
  },
  data(){
    return {
      ratingFood:{},
      foodIcon:'',
      foodName:'',
      foodCount:'',
      score:5,
      ratingText:''

    }
  },
  mounted(){
    this.ratingFood=this.$bus.ratingFood
    this.foodName=this.ratingFood.foodName[0]
    this.foodIcon=this.ratingFood.foodIcon[0]
    this.ratingFood.foodCount.forEach(element => {
      this.foodCount+=element
    });
    console.log(this.ratingFood)
  },
  computed:{
    rateType(){
      if(this.score>=4){
        return 0;
      }else {
        return 1;
      }
    }
  },
  methods:{
    setScore(newScore){
      this.score=newScore
    },
    submitRating(){
      let score=this.score;
      let text=this.ratingText;
      let recommend=this.ratingFood.foodName
      let data={score,text,recommend,rateType:this.rateType}
      wx.request({
        url:'http://192.168.1.104:3000/setRating',
        data:data,
        method:'post'
      })
    }
  }
}
</script>

<style>
  .food-content {
    display: flex;
    flex-wrap: nowrap;
    border: solid #aaa 1rpx;
    border-radius: 10px;
    padding: 10px 20px;
    margin: 5px 10px;
  }
  .food-content > .food-img {
    width: 140rpx;
    height: 140rpx;
    margin-left: 20rpx;
  }
  .food-content > .food-img img {
    width: 100%;
    height: 100%;
  }
  .food-content > .food-name {
    flex: 1;
    margin-left: 20rpx;
  }
  .score {
    margin-top: 20px;

  }
  .score > div {
    width: 100%;
    clear: both;

  }

  .score > div > h3 {
    margin-bottom: 20px;
  }
  .food-text {
    margin-top: 100rpx;
    width: 100%;
    height: 100px;
  }
  .food-text textarea {
    width: 90%;
    border: solid gray 1rpx;
    border-radius: 10rpx;
  }
  .score-submit {
    position:absolute;
    bottom: 50px;
    left: 0;
    right: 0;
  }
</style>
