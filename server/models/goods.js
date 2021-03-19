var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "checked":String,
  "productNum":Number,
  "productImage":String,
  "productSize":Array,
  "productIntro":String,
  "imgExtra":Array
});

module.exports = mongoose.model('Good',produtSchema);
