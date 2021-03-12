var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

<<<<<<< HEAD
=======


>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07
//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

//查询商品列表数据
router.get("/list", function (req,res,next) {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let producName = req.param("producName");
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  var priceGt = '',priceLte = '';
  let params = {};
  //价格选项
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=100;break;
      case '1':priceGt = 100;priceLte=500;break;
      case '2':priceGt = 500;priceLte=1000;break;
      case '3':priceGt = 1000;priceLte=5000;break;
    }
    params.salePrice={
          $gt:priceGt,
          $lte:priceLte
      }
  }
  //搜索功能
  if(producName!=''){
      params.productName={
        $regex: producName+".*"
      }
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function (err,doc) {
      if(err){
          res.json({
            status:'1',
            msg:err.message
          });
      }else{
          res.json({
              status:'0',
              msg:'',
              result:{
                  count:doc.length,
                  list:doc
              }
          });
      }
  })
});

<<<<<<< HEAD
//查询对应商品详情图片
router.get("/goodsDetail",function (req,res,next) {
  var productId = req.query.productId;
  Goods.findOne({productId:productId},function (err,doc) {
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
        result: {
          proName:doc.productName,
          proPrice:doc.salePrice,
          proImg:doc.productImage
        }
      })
    }
  })

});

=======
>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07
//加入到购物车
router.post("/addCart", function (req,res,next) {
  var userId= req.cookies.userId;
  var productId = req.body.productId;
  console.log(userId);
  var User = require('../models/user');
  User.findOne({userId:userId}, function (err,userDoc) {
    if(err){
        res.json({
            status:"1",
            msg:err.message
        })
    }else{
        if(userDoc){
          var goodsItem = '';
          userDoc.cartList.forEach(function (item) {
              if(item.productId == productId){
                goodsItem = item;
                item.productNum ++;
              }
          });
          if(goodsItem){
            userDoc.save(function (err2,doc2) {
              if(err2){
                res.json({
                  status:"1",
                  msg:err2.message
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'suc'
                })
              }
            })
          }else{
            Goods.findOne({productId:productId}, function (err1,doc) {
              if(err1){
                res.json({
                  status:"1",
                  msg:err1.message
                })
              }else{
                if(doc){
                  doc.productNum = 1;
                  doc.checked = 1;
                  userDoc.cartList.push(doc);
                  userDoc.save(function (err2,doc2) {
                    if(err2){
                      res.json({
                        status:"1",
                        msg:err2.message
                      })
                    }else{
                      res.json({
                        status:'0',
                        msg:'',
                        result:'suc'
                      })
                    }
                  })
                }
              }
            });
          }
        }
    }
  })
});

<<<<<<< HEAD
=======


>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07
module.exports = router;
