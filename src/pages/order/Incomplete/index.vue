<template>
  <div>
    <Order :order="incompleteOrder"></Order>
  </div>
</template>

<script>
import Order from '../../../components/Order'
export default {
  name:'InComplete',
  props:['incompleteOrder'],
  components:{
    Order
  }
}
</script>

<style lang="stylus">
  // .complete-con
    // background-color gray
</style>

