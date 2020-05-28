import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$bus=new Vue()
Vue.prototype.$bus.shopCartFoods={foodList:[],allCount:0,sumPrice:0}
Vue.prototype.$bus.ratings=[]
Vue.prototype.$bus.goodsDatas=[]
Vue.prototype.$bus.shopBus={}
Vue.prototype.$bus.userOrder=[]
Vue.prototype.$bus.ratingFood={}
// import './utils/index.js'
wx.request({
  url:'http://192.168.1.104:3000/shopinfo',
  success(res){
    console.log(res,"111")
    Vue.prototype.$bus.shopInfo=res.data.data
  }
})
wx.request({
  url:'http://192.168.1.104:3000/goods',
  success(res){
    if(res.data){
      Vue.prototype.$bus.goodsDatas=res.data.data
    }
  }
});
wx.request({
  url:'http://192.168.1.104:3000/ratings',
  success(res){
    Vue.prototype.$bus.ratings=res.data.data
    console.log(res.data.data,'ratings')
  }
});
wx.getUserInfo({
  success: (res) => {
    // 更新userInfo的状态数据
    console.log(res);
    let avatarUrl=res.userInfo.avatarUrl
    let nickName=res.userInfo.nickName
    Vue.prototype.$bus.userInfo = res.userInfo
    wx.login({
      success(res){
        if(res.code){
          const AppID="wx527d10b297075f74"
          const AppSecret="92b3352847773434c2aa3896682746ef"
          const code=res.code
          wx.request({
            url:"https://api.weixin.qq.com/sns/jscode2session?appid="+AppID+"&secret="+AppSecret+"&js_code="+code+"&grant_type=authorization_code",
            data:{
              code:res.code
            },
            success(res){
              console.log(res)
              wx.request({
                url:"http://192.168.1.104:3000/setUserOpenId",
                method:"POST",
                data:{
                  openid:res.data.openid,
                  session_key:res.data.session_key,
                  avatarUrl,
                  nickName,
                  orderId:[],
                  couponId:[],
                },
                success(res){
                  if(res.data.code==0){
                    console.log('唯一标识存储成功！')
                    Vue.prototype.$bus.openid=res.data.openid
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  fail: () => {
    console.log('获取失败');
  }
})

const app = new Vue(App)
app.$mount()
