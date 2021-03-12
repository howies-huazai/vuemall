var express = require('express');
var router = express.Router();
require('./../util/util')
var User = require('./../models/user');
var cookieParser = require('cookie-parser');
router.use(cookieParser())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登录接口
router.post("/login", function (req,res,next) {
  var param = {
      userName:req.body.userName,
      userPwd:req.body.userPwd,
  }
  User.findOne(param, function (err,doc) {
      if(err){
          res.json({
              status:"1",
              msg:err.message
          });
      }else{
          if(doc){
              res.cookie("userId",doc.userId,{
                  path:'/',
                  maxAge:1000*60*60
              });
              res.cookie("userName",doc.userName,{
                path:'/',
                maxAge:1000*60*60
              });
              // req.session.user = doc;
              res.json({
                  status:'0',
                  msg:'',
                  result:{
                      userName:doc.userName
                  }
              });

          }
      }
  });
});

//登出接口
router.post("/logout", function (req,res,next) {
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })


});

//注册接口
router.post("/register",function (req,res,next) {
  var param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd,
    userId:100000000+parseInt(20*Math.random())
  };
  //设置一个开关，实现异步刷新
  // var isShow = false;
  User.findOne({userName:param.userName}, function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      if(doc){
        res.send('用户名已被注册');

      }else{
        User.create(param,function (err,data) {
          if(err) throw err;
          console.log('注册成功');
        })
        res.json({
          status:"0",
          msg:'',
          result:''
        });
        // isShow=true;
        // console.log('1',isShow)
      }
    }
  });
  // if(isShow==true){
  //   console.log('准备获取userlist')
  //   res.redirect('/userList');
  //   console.log('获取userlist成功')
  //   console.log('2',isShow)
  // }
});

//获取用户名列表
router.get("/userList",function (req,res,next) {
  var userList = User.find({},function (err,doc) {
    if(err) throw err;
    res.send(doc)
  });
});

//校验登录
router.get("/checkLogin", function (req,res,next) {
  if(req.cookies.userId){
      res.json({
        status:'0',
        msg:'',
        result:req.cookies.userName || ''
      });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});

//获取购物车数量
router.get("/getCartCount", function (req,res,next) {
  if(req.cookies && req.cookies.userId){
    console.log("userId:"+req.cookies.userId);
    var userId = req.cookies.userId;
    User.findOne({"userId":userId}, function (err,doc) {
      if(err){
        res.json({
          status:"0",
          msg:err.message
        });
      }else{
        let cartList = doc.cartList;
        let cartCount = 0;
        cartList.map(function(item){
          cartCount += parseFloat(item.productNum);
        });
        res.json({
          status:"0",
          msg:"",
          result:cartCount
        });
      }
    });
  }else{
    res.json({
      status:"0",
      msg:"当前用户不存在"
    });
  }
});

//查询当前用户的购物车数据
router.get("/cartList", function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId}, function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
          if(doc){
            res.json({
              status:'0',
              msg:'',
              result:doc.cartList
            });
          }
      }
  });
});

//购物车删除
router.post("/cartDel", function (req,res,next) {
  var userId = req.cookies.userId,productId = req.body.productId;
  User.update({
    userId:userId
  },{
    $pull:{
      'cartList':{
        'productId':productId
      }
    }
  }, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  });
});

//修改商品数量
router.post("/cartEdit", function (req,res,next) {
  var userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked;
  User.update({"userId":userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked,
  }, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  })
});

//编辑全选
router.post("/editCheckAll", function (req,res,next) {
  var userId = req.cookies.userId,
      checkAll = req.body.checkAll?'1':'0';
  User.findOne({userId:userId}, function (err,user) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      if(user){
        user.cartList.forEach((item)=>{
          item.checked = checkAll;
        })
        user.save(function (err1,doc) {
            if(err1){
              res.json({
                status:'1',
                msg:err1,message,
                result:''
              });
            }else{
              res.json({
                status:'0',
                msg:'',
                result:'suc'
              });
            }
        })
      }
    }
  });
});

//查询用户地址接口
router.get("/addressList", function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId}, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc.addressList
      });
    }
  })
});

<<<<<<< HEAD


=======
>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07
//设置默认地址接口
router.post("/setDefault", function (req,res,next) {
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status:'1003',
      msg:'addressId is null',
      result:''
    });
  }else{
    User.findOne({userId:userId}, function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        var addressList = doc.addressList;
        addressList.forEach((item)=>{
          if(item.addressId ==addressId){
             item.isDefault = true;
          }else{
            item.isDefault = false;
          }
        });

        doc.save(function (err1,doc1) {
          if(err){
            res.json({
              status:'1',
              msg:err.message,
              result:''
            });
          }else{
              res.json({
                status:'0',
                msg:'',
                result:''
              });
          }
        })
      }
    });
  }
});

//增加地址接口
router.post("/addAddress",function (req,res,next) {
  User.update({
    userName:req.cookies.userName
  },{
    $addToSet:{
      'addressList':{
        addressId: 100000 + parseInt(20 * Math.random()),
        userName:req.body.trueName,
        streetName: req.body.trueAddress,
        postCode: 100000 + parseInt(10 * Math.random()),
        tel: req.body.trueTel,
        isDefault: 'False'
      }
    }
  }, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:''
      });
    }
  });
});

//删除地址接口集合内数组数据删除
router.post("/delAddress", function (req,res,next) {
  var userId = req.cookies.userId,addressId = req.body.addressId;
  User.update({
    userId:userId
  },{
    $pull:{
      'addressList':{
        'addressId':addressId
      }
    }
  }, function (err,doc) {
      if(err){
        res.json({
            status:'1',
            msg:err.message,
            result:''
        });
      }else{
        res.json({
          status:'0',
          msg:'',
          result:''
        });
      }
  });
});


router.post("/delCart",function (req,res,next) {
  var userId = req.cookies.userName;
  var productId = req.body.productId;
  User.update({
    userId:userId
  },{
<<<<<<< HEAD
    $pull:{
      'cartList': {
        'productId':productId
      }
    }
=======

>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07

  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:''
      })
    }
  })
});

//支付
router.post("/payMent", function (req,res,next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId,
    orderTotal = req.body.orderTotal;
<<<<<<< HEAD

=======
>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07
  User.findOne({userId:userId}, function (err,doc) {
     if(err){
        res.json({
            status:"1",
            msg:err.message,
            result:''
        });
     }else {
<<<<<<< HEAD
       var address = '', goodsList = [];

=======

       var address = '', goodsList = [];
>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07
       //获取当前用户的地址信息
       doc.addressList.forEach((item) => {
         if (addressId == item.addressId) {
           address = item;
         }
       })
       //获取用户购物车的购买商品
       doc.cartList.filter((item) => {
         if (item.checked == '1') {
           goodsList.push(item);
         }
       });

       var platform = '622';
       var r1 = Math.floor(Math.random() * 10);
       var r2 = Math.floor(Math.random() * 10);

       var sysDate = new Date().Format('yyyyMMddhhmmss');
       var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
       var orderId = platform + r1 + sysDate + r2;
       var order = {
         orderId: orderId,
         orderTotal: orderTotal,
         addressInfo: address,
         goodsList: goodsList,
         orderStatus: '1',
         createDate: createDate
       };
<<<<<<< HEAD
       doc.orderList.push(order);
=======

       doc.orderList.push(order);



>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07
       doc.save(function (err1, doc1) {
         if (err1) {
           res.json({
             status: "1",
<<<<<<< HEAD
             msg: err1.message,
=======
             msg: err.message,
>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07
             result: ''
           });
         } else {
           res.json({
             status: "0",
             msg: '',
             result: {
               orderId: order.orderId,
               orderTotal: order.orderTotal
             }
           });
         }
       });
<<<<<<< HEAD
     }
     })
  });
// ******************************************

=======

     }
     })

  })
// ******************************************


>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07
//根据订单Id查询订单信息
router.get("/orderDetail", function (req,res,next) {
  var userId = req.cookies.userId,orderId = req.param("orderId");
  User.findOne({userId:userId}, function (err,userInfo) {
      if(err){
          res.json({
             status:'1',
             msg:err.message,
             result:''
          });
      }else{
         var orderList = userInfo.orderList;
         if(orderList.length>0){
           var orderTotal = 0;
           orderList.forEach((item)=>{
              if(item.orderId == orderId){
                orderTotal = item.orderTotal;
              }
           });
           if(orderTotal>0){
             res.json({
               status:'0',
               msg:'',
               result:{
                 orderId:orderId,
                 orderTotal:orderTotal
               }
             })
           }else{
             res.json({
               status:'120002',
               msg:'无此订单',
               result:''
             });
           }
         }else{
           res.json({
             status:'120001',
             msg:'当前用户未创建订单',
             result:''
           });
         }
      }
  })
});


module.exports = router;
