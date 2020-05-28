// 连接mongodb数据库
 const mongoose=require('mongoose')
 mongoose.connect('mongodb://localhost:27017/jiege_diancan')
 const conn=mongoose.connection
 conn.on('connected',function(){
   console.log('数据库连接成功！')
 })
 const shopUserSchema = mongoose.Schema({
   'name':String,
   'pwd':String,
 })
//  商家的后台登录密码
const shopUserCollection=mongoose.model('shopUser',shopUserSchema)

// 用户对应的模块
const userSchema=mongoose.Schema({
  "openid":String,
  "session_key":String,
  "userImage":String,
  "couponId":Array,
  "orderId":Array,
  "nickName":String,
})
const userCollection=mongoose.model('user',userSchema)
// {openid:req.body.openid,session_key:req.session_key,couponId:[],orderId:[],userImage:req.body.userImage,nickName:req.body.nickName}
// 餐品模块
const foodsSchema=mongoose.Schema({
  "category":String,
  "name":String,
  "price":String,
  "oldPrice":String,
  "description":String,
  "sellCount":Number,
  "info":String,
  "icon":String,
  "image":String,
})
const foodsCollection=mongoose.model('food',foodsSchema)

//订单集合模块
const orderSchema=mongoose.Schema({
  "orderStatus":Boolean,
  "tableId":Number,
  "foodsName":Array,
  "foodsCount":Array,
  "sumPrice":String,
  "remarkInfo":String,
  "orderId":String,
  "orderTime":Date
})
const orderCollection=mongoose.model('order',orderSchema)
 
// 店铺集合模块
const restaurantSchema=mongoose.Schema({
  "id":String,
  "restaurantName":String,
  "restaurantLogo":String,
  "workTime":String,
  "description":String,
  "score":Number,
  "serviceScore":Number,
  "foodScore":Number,
  "bgImg":String,
  "pics":Array,
  "category":String,
  "minPrice":Number,
  "phoneNumber":Number,
  "ratingsCount":Number,
  "address":String,
  "sellCount":Number,
})
const restaurantCollection=mongoose.model('shopinfo',restaurantSchema)

// 评论集合模块
const ratingSchema=mongoose.Schema({
  rateType:Number,
  recommend:Array,
  text:String,
  score:Number,
  username:String,
  rateTime:Date,
  avatar:String
})
const ratingCollection=mongoose.model('rating',ratingSchema)

// coupon优惠券模块
const couponSchema=mongoose.Schema({
  "timeLimit":String,
  "denomination":String, //面额
})
const couponCollection=mongoose.model("coupon",couponSchema)



module.exports={
  shopUserCollection,
  userCollection,
  foodsCollection,
  orderCollection,
  couponCollection,
  restaurantCollection,
  ratingCollection
}
