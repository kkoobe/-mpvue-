<template>
    <div :class="'star star-'+size" @touchend="setScore" >
        <span :class="'star-item '+star" v-for="(star,index) in starsCount" :key="index"></span>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
        }
    },
    computed:{
        starsCount:  function(){
            let arr=['off','off','off','off','off'];
            let i=Math.floor(this.score/1);
            for(let j=0;j<i;j++){
                arr[j]='on'
            }
            if(i<this.score){
                arr[i]='half';
            }
            return arr;
        }
    },
    props:['size','score'],
    methods:{
      setScore(e){
        let offsetLest=e.target.offsetLeft

       if(offsetLest>0&&offsetLest<40){
         this.score=1
       }
       if(offsetLest>=40&&offsetLest<80){
         this.score=2
       }
       if(offsetLest>=80&&offsetLest<120){
         this.score=3
       }
       if(offsetLest>=120&&offsetLest<160){
         this.score=4
       }
       if(offsetLest>=160){
         this.score=5
       }
        this.$emit('setscore',this.score)
        console.log(e)
         console.log(this.score)
      }
    }
}
</script>

<style lang="stylus" >
@import "../../common/stylus/mixins.styl"
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>
