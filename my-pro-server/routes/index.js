var express = require('express');
var router = express.Router();
var path =require('path')
var http =require('http')
const fs =require('fs')
const {
  shopUserCollection,
  userCollection,
  foodsCollection,
  orderCollection,
  couponCollection,
  restaurantCollection,
  ratingCollection,
} =require('../db')

// const {io} =require ('../server')
const shopInfoDatas=require('../datas/shopInfo.json')
const goodsDatas=require('../datas/goods.json')
const ratingsDatas=require('../datas/ratings.json')
const https=require('https')
let userOpenId;
let nickName;
let avatar= "http://static.galileo.xiaojukeji.com/static/tms/default_header.png";
let type=5;

// let goods=JSON.parse(goodsDatas)
// goodsDatas.forEach(element => {
//   console.log(element.foods)
// });

let originData={
  name:'',
  price:'',
  oldPrice:'',
  sellCount:0,
  description:'',
  rating:'',
  info:'',
  ratings:[{
    username:'',
    rateTime:'',
    rateType:'',
    text:'',
    avatar:'',
  }],
  icon:'',
  image:'',
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 获取商家信息
router.get('/shopinfo', function(req, res, next) {
  restaurantCollection.findOne(function(err,shopInfo){
    console.log(shopInfo)
    res.send({code:0,data:shopInfo});
  })

});

// 获取商品信息
router.get('/goods',function(req,res,next) {
  res.send({code:0,data:goodsDatas})
})
// 获取商家评论信息
router.get('/ratings',function(req,res,next){
  ratingCollection.find({},function(err,ratingList){
  res.send({code:0,data:ratingList})

  })
})
// 添加餐品分类
router.post('/setFoodsCategory',function(req,res,next){
  // console.log(33333)
  setGoods(path.join(__dirname,'../datas/goods.json'),req.body,path.join(__dirname,'../datas/goods.json'),res)
})
// 添加餐品。
router.post('/addFoods',function(req,res,next){
  // console.log(req)
  let newData=originData
  newData.name=req.body.foodName
  newData.price=req.body.foodPrice
  newData.icon=req.body.foodImg
  newData.image=req.body.foodImg
  newData.foodCategory=req.body.foodCategory
  let goods
  fs.readFile(path.join(__dirname,'../datas/goods.json'),(err,data)=>{
    if(err){
      console.log('文件读取失败')
    }else{
      goods=JSON.parse(data)
      goods.forEach(element => {
        if(element.name==newData.foodCategory){
          console.log(newData)
          console.log(req.body)
          element.foods.push(newData)
        }
      });
      goods=JSON.stringify(goods)
      fs.writeFile(path.join(__dirname,'../datas/goods.json'),goods,(err)=>{
        if(err) console.log("文件写入错误")
        else{
          res.send('<html><body><script>history.back()</script></body></html>')
        }
      })
    }
  })
})
//修改餐品信息。
router.post('/updateFoods',function(req,res,next){
  console.log(req.body)
})
// 储存用户信息。
router.post('/setUserOpenId',function(req,res,next){
  // console.log(req)
  if(req.body){
    const openid=req.body.openid
    if(userCollection.findOne({openid},function(err,user){
      if(user){
        console.log('用户已存在！')
      }else{
        let user=new userCollection({openid:req.body.openid,session_key:req.body.session_key,couponId:[],orderId:[],userImage:req.body.avatarUrl,nickName:req.body.nickName})
        user.save()
      }
      // 将用户的唯一标识保存在服务端。
      // avatar=req.body.avatarUrl
      nickName=req.body.nickName
      userOpenId=req.body.openid
      console.log(userOpenId)
    }))
    res.send({code:0,openid:req.body.openid})
  }
})

// 商家登录
router.post('/login',function(req,res,next){
  console.log(req.body)
  let  name=req.body.userName
  shopUserCollection.findOne({name},function(err,user){
    let message;
    if(user){
      console.log(user)
      if(user.pwd==req.body.password){
        message="登录成功！"
      }else{
        message="密码错误，请重新输入！"
      }
    }else {
      message="账号错误，请重新输入！"
    }
    res.send({code:0,token:1,message})
  })

})
// 查询用户订单信息
router.get('/getUserOrder',function(req,res,next){
  // 返回的订单数据
  let foodNameList=[];
  let foodCountList=[];
  let sumPriceList=[];
  let orderStatusList=[];
  let foodIconList=[];
  let orderObj={};
  let orderTimeList=[];
  let foodPriceList=[]

  const openid=userOpenId;
  console.log(openid)
  userCollection.findOne({openid},function(err,user){
    // console.log('user',user)
    if(user.orderId){
      const orderIdList=user.orderId
      orderIdList.forEach((element)=>{
        let orderId=element
        orderCollection.findOne({orderId},function(err,order){
          // console.log(order)
          foodNameList.push(order.foodsName)
          sumPriceList.push(order.sumPrice);
          orderStatusList.push(order.orderStatus);
          orderTimeList.push(order.orderTime)
          // console.log(foodNameList,foodCountList,sumPriceList)
          let list=[]
          let list1=[]
          let list2=[]
          order.foodsName.forEach((ele,index)=>{
            list2.push(order.foodsCount[index])
            foodsCollection.findOne({name:ele},function(err,food){
                // console.log(food)
                // console.log(food.name)
              list.push(food.icon)
              list1.push(food.price)
            })
          })
          foodIconList.push(list)
          foodPriceList.push(list1)
          foodCountList.push(list2);

          })
        })

       setTimeout(() => {
        orderObj={foodNameList,foodCountList,sumPriceList,orderStatusList, foodIconList,orderTimeList,foodPriceList}
        res.send({code:0,msg:'111',data:orderObj})
       }, 1000);
    }else{
      orderObj={foodNameList:[],foodCountList:[],sumPriceList:[],orderStatusList:[],foodIconList:[],orderTimeList:[],foodPriceList:[]}
      res.send({code:0,msg:'222',data:orderObj})
    }
  })


})
// 获取所有订单
router.get('/getOrder',function(req,res,next){
  orderCollection.find({},function(err,order){
    res.send({code:0,data:order})
  })
})

// 修改订单状态
router.post('/updateOrderStatus',function(req,res,next){
  let {orderId,newStatus} = req.body
  if(newStatus=='未完成')
  newStatus=false
  else{
    newStatus=true
  }
  console.log(orderId,newStatus)
  orderCollection.updateOne({orderId},{orderStatus:newStatus},function(err){
    if(err){
      console.log('更新失败')
    }else{
      res.send({code:0})
    }
  })
})

// 评论
router.post('/setRating',function(req,res,next){
  console.log(req.body)
  const {score,text,recommend,rateType}=req.body
  console.log(nickName,score,rateType,text,avatar,recommend)
  // rateType:Number,
  // recommend:Array,
  // text:String,
  // score:Number,
  // username:String,
  // rateTime:Date,
  // // avatar:String
  let rating=new ratingCollection({username:nickName,rateTime:new Date(),score,rateType,text,avatar,recommend})
  console.log(rating)
  rating.save(function(err){
    if(err){
      console.log('薄脆失败！')
    }else{
      console.log('chenggong ')
    }
  })
  res.send({code:0})
})

module.exports = router;

function setGoods(path,newData,newPath,res){
  // console.log(1111)
  fs.readFile(path,(err,data)=>{
    if(err){
      console.log('文件读取失败！')
    }else{
      console.log(data)
      let goods=JSON.parse(data)
      goods.push({name:newData.name,foods:newData.foods})
      goods=JSON.stringify(goods)
      fs.writeFile(newPath,goods,(err)=>{
        if(err) console.log("文件写入错误")
        else{
          res.send('<html><body><script>history.back()</script></body></html>')
        }
      })
    }
  })
}
