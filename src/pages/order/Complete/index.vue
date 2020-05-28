<template>
  <div class="complete-con">
    <Order :order="completeOrder"></Order>
  </div>
</template>

<script>
import Order from '../../../components/Order'
export default {
  name:'Complete',
  props:['completeOrder'],
  components:{
    Order
  }
}
</script>

<style lang="stylus">
  // .complete-con
    // background-color gray
</style>
