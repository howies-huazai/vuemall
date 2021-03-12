<template>
  <div class="detailBox">
    <div class="magnify">
      <!-- 左边产品图片区域 -->
      <div class="left_contaner">
        <div class="middle_img" @mouseover="boxMouseOver" @mouseleave="boxMouseLeave">
          <!-- 产品图片 -->
          <img :src="middleImg" alt="">
          <!-- 阴影盒子 -->
          <div class="shade" @mouseover="shadeMouseOver" @mousemove="shadeMouseMove" ref="shade" v-show="isShade"></div>
        </div>
        <!-- 缩略图容器 -->
        <div class="carousel">


          <!-- 缩略图展示盒子 -->
          <div class="show_box">
            <ul class="picture_container" ref="middlePicture">
              <li class="picture_item" @mouseover="tabPicture(item)" v-for="(item, index) in pictureList" :key="index">
                <img :src="item.url" class="small_img" alt="">
              </li>
            </ul>
          </div>

        </div>
      </div>
      <!-- 右边放大区域 -->
      <div class="right_contanier" v-show="isBig">
        <img :src="middleImg" ref="bigImg" class="big_img" alt="">
      </div>
    </div>

    <div class="wrap">
      <div class="top" @mouseover="choiceOver">
        <h2>{{name}}</h2>
        <p id='color'>
          <font>颜色</font>
          <span id="black"></span>
          <span id="red"></span>
          <span id="yellow"></span>
        </p>
        <p id='size'>
          <font>尺码</font>
          <span>36.5</span>
          <span>38</span>
          <span>39</span>
          <span>40</span>
          <span>41</span>
          <span>41.5</span>
          <span>43</span>
          <span>44</span>
        </p>
        <p class="text">前沿创新设计邂逅非凡舒适脚感，焕新演绎 Nike 的伟大发明。Nike Air Max Zephyr 男子运动鞋采用未来感十足的外观设计，将可视 Air 气囊融入鞋面，同时令你畅享快速体验。利落的运动风版型，结合耐穿的无缝表层和质感出众的透气网眼布，塑就时尚外观；柔软加垫鞋口，缔造舒适自如的迈步体验。</p>
      </div>
      <div class="bottom">
        <p>价格： <font>￥ <span class='price'>{{price}}</span></font></p>
<!--        <button>立即购买</button>-->
        <div class="btn-area">
          <a href="javascript:;" class="btn btn--m" @click="addCart()">加入购物车</a>
          <a href="javascript:;" class="btn btn--m" @click="">立即购买(还没开发)</a>
        </div>
      </div>
    </div>

    <div class="remain">
      <img src="/static/aomen.png" alt="">
    </div>

    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录,否则无法加入到购物车中!
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import axios from 'axios'
  import Modal from './../components/Modal'
  export default {
    name:"GoodsItem",
    data() {
      return {
        pictureList: [
          {url: '/static/'+this.pic},
          {url: '/static/pic1.png'},
          {url: '/static/pic1.png'},
          {url: '/static/pic1.png'}
        ],
        middleImg: '', // 中图图片地址
        bigImg: '', // 大图图片地址
        isShade: false, // 控制阴影显示与否
        isBig: false, // 控制放大图显示与否
        initX: 0, // 初始clientX值
        initY: 0, // 初始clientY值
        leftX: 0, // 初始定位left
        topY: 0, // 初始定位top
        middleLeft: 0, // 当前放置小图盒子的定位left值,
        itemWidth: 80, // 缩略图每张的宽度
        mdShow:false,
        mdShowCart:false,
        filterBy:false,
        overLayFlag:false,
        price:'',
        name:'',
        pic:''
      }
    },
    created() {
      if (this.imgList && this.imgList.length) {
        this.pictureList = this.imgList
      }
      this.middleImg = this.pictureList[0].url
      // 计算缩略图的宽度,默认是显示4张图片,两边箭头的宽度和为50
      this.itemWidth = (this.middleImgWidth-50) / 4
    },
    mounted() {
      this.$nextTick(() => {
        // 容器的高
        const imgWidth = this.middleImgHeight + this.thumbnailHeight + 20
        // 设置容器宽高
        $('.magnify').css({
          width: this.middleImgWidth,
          height: imgWidth
        })
        // 设置产品图宽高
        $('.middle_img').css({
          width: this.middleImgWidth,
          height: this.middleImgHeight
        })
        // 设置移动阴影图宽高
        $('.middle_img .shade').css({
          width: this.middleImgWidth/this.zoom,
          height: this.middleImgHeight/this.zoom
        })
        // 设置缩略图容器高
        $('.carousel').css({
          height: this.thumbnailHeight
        })
        // 设置每个缩略图宽
        $('.picture_item').css({
          width: this.itemWidth
        })
        // 设置放大后图片容器的宽高,left
        $('.right_contanier').css({
          left: this.middleImgWidth,
          width: imgWidth,
          height: imgWidth
        })
        // 设置放大图片的宽高(图片的放大倍数)
        $('.right_contanier .big_img').css({
          width: imgWidth * this.zoom,
          height: imgWidth * this.zoom
        })
      })

      // 默认选择
      $('#model').children('span:eq(0)').attr('class','on')
      $('#color').children('span:eq(0)').attr('class','on')
      $('#rom').children('span:eq(0)').attr('class','on')
      $('#banben').children('span:eq(0)').attr('class','on')

      this.goodprice();
    },
    props: {
    middleImgWidth: {
    default: 350,
        type: Number
    }, // 产品图片宽
    middleImgHeight: {
    default: 400,
        type: Number
    }, // 产品图片高
    thumbnailHeight: {
    default: 100,
        type: Number
    }, // 缩略图容器高度
    imgList: Array, // 图片数据
      zoom: {
    default: 2, // 缩略比例,放大比例
        type: Number
    }
  },
    components:{
      Modal
    },
    methods: {
      closeModal(){
        this.mdShow = false;
        this.mdShowCart = false;
      },
      closePop(){
        this.overLayFlag=false;
        this.mdShowCart = false;
      },
      addCart(){
        axios.post("/goods/addCart",{
          productId:this.$route.query.productId
        }).then((res)=>{
          var res = res.data;
          if(res.status==0){
            this.mdShowCart = true;
            this.$store.commit("updateCartCount",1);
          }else{
            // window.console.log('status!=0:'+res.status)
            this.mdShow = true;
          }
        });
      },

      goodprice(){
        axios.get("/goods/goodsDetail",{
          params:{
            productId:this.$route.query.productId
          }
        }).then((response)=>{
          var res = response.data;
          if(res.status == '0'){
            this.price = res.result.proPrice;
            this.name = res.result.proName;
            this.middleImg = '/static/'+res.result.proImg
          }else{
            console.log('失败')
          }
        })
      },

      choiceOver() {
        var aSpan = $('span')
        for (var i=0;i<aSpan.length;i++ )
        {
          aSpan[i].onclick = function(){
            var siblings = this.parentNode.children;
            for (var j=0;j<siblings.length;j++ )
            {
              siblings[j].className = '';
            }
            this.className = 'on';
          };
        };
      },
    // 产品图片鼠标移入事件,显示阴影,显示大图
      boxMouseOver(e) {
      e.preventDefault();
      e.stopPropagation();
      this.isShade = true
      this.isBig = true
      // 计算阴影的位置
      let x = e.offsetX - $('.shade').width() / 2
      let y = e.offsetY - $('.shade').height() / 2
      let maxLeft = $('.middle_img').width() - $('.shade').width()
      let maxTop = $('.middle_img').height() - $('.shade').height()
      x = x <= 0 ? 0 : x
      x = x >= maxLeft ? maxLeft : x
      y = y <= 0 ? 0 : y
      y = y >= maxTop ? maxTop : y
      $('.shade').css({
        left: x,
        top: y
      })
    },
    // 鼠标在阴影移动
      shadeMouseMove(e) {
      e.preventDefault();
      e.stopPropagation();
      //用页面x - 父盒子的offsetLeft - 父盒子的左边框宽度 标红的两个方法补在下面
      var x = this.getEventPage(e).pageX - $('.middle_img')[0].offsetParent.offsetLeft - $('.middle_img')[0].offsetParent.clientLeft;
      //用页面y - 父盒子的offsetTop - 父盒子的上边框宽度
      var y = this.getEventPage(e).pageY - $('.middle_img')[0].offsetParent.offsetTop - $('.middle_img')[0].offsetParent.clientTop;

      //让阴影的坐标居中
      x -= $('.shade').width() / 2;
      y -= $('.shade').height() / 2;

      // 移动边界限制
      let maxLeft = $('.middle_img').width() - $('.shade').width()
      let maxTop = $('.middle_img').height() - $('.shade').height()
      x = x <= 0 ? 0 : x
      x = x >= maxLeft ? maxLeft : x
      y = y <= 0 ? 0 : y
      y = y >= maxTop ? maxTop : y
      // 重新赋值当前的定位值
      $('.shade').css({
        left: x,
        top: y
      })
      // 计算出实时的大图的定位,首先计算出比例
      // 比例为x:大图宽度/小图宽度 y: 大图高度/小图高度,将小图的定位乘以比例就是大图的定位
      const xRate = $('.big_img').width() / $('.middle_img').width()
      const yRate = $('.big_img').height() / $('.middle_img').height()
      $('.big_img').css({
        left: -x * xRate,
        top: -y * yRate
      })
      // console.log(e, x, y, xRate, yRate, 66677)
    },
    // 鼠标移入阴影,去除自定义事件
      shadeMouseOver(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    // 图片移出隐藏阴影和大图
      boxMouseLeave(e) {
      this.isShade = false
      this.isBig = false
    },
    // 切换图片
      tabPicture(item) {
      this.middleImg = item.url
    },
    // 获取网页滚出去的距离（包括上面滚出去的部分和左边滚出去的部分）
    // * @returns {{scrollTop: (Number|number), scrollLeft: (Number|number)}}
      getPageScroll() {
      return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
      }
    },
    //
    //  获取事件对象点击的点，相对于文档左上角的坐标
    //  @param e
    //  @returns {{pageX: *, pageY: *}}
    //
    getEventPage(e) {
      return {
        pageX: e.clientX + this.getPageScroll().scrollLeft,
        pageY: e.clientY + this.getPageScroll().scrollTop
      }
    }
  }
  }
</script>

<style scoped>
  /*放大镜*/
  .magnify {
    background-color: #f5f7fc;
    position: relative;
    float: left;
  }
  .left_contaner {
    width: 100%;
    height: 100%;
  }
  .left_contaner .middle_img {
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .left_contaner .shade {
    background-color: rgba(    135,206,235, .5);
    position: absolute;
    top: 0;
    left: 0;
    cursor: move;
  }
  .left_contaner .middle_img img {
    width: 100%;
    height: 100%;
  }
  .left_contaner .carousel {
    width: 100%;
    margin-top: 10px;
    display: flex;
  }
  .left_contaner .carousel .show_box {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  .left_contaner .carousel .picture_container {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 22px;
  }
  .left_contaner .picture_container .picture_item {
    height: 100%;
    float: left;
    padding: 6px;
    box-sizing: border-box;
  }
  .left_contaner .picture_container .picture_item:hover {
    border: 2px solid #f2019f;
  }
  .left_contaner .picture_container .picture_item img {
    width: 100%;
    height: 100%;
  }
  .right_contanier {
    overflow: hidden;
    position: absolute;
    top: 0;
    border: 1px solid #ccc;
  }
  .right_contanier .big_img {
    position: absolute;
    top: 0;
    left: 0;
  }
  /*放大镜结束*/

  /*选择信息*/
  .wrap{
    width:600px;
    height:520px;
    /*background-color: yellow;*/
    float: left;
    padding: 50px 30px 30px 50px;
  }
  .top{
    height:320px;
    border-bottom:1px solid #bbb;
    font-family:'Microsoft yahei';
  }
   #black{
     background-color: #000;
   }
   #red{
     background-color: red;
   }
   #yellow{
     background-color: yellow;
   }
  .top h2{
    font-family: "Microsoft YaHei UI Light";
    font-weight: bold;
    color: black;
    font-size: 24px;
  }
  .top p{
    margin-top:25px;
  }
  .top p font{
    font-size:14px;
    color:#000;
    margin-right:15px;

  }
  .top p span{
    font-size:14px;
    color:#666;
    border:1px solid #ccc;
    border-radius: 4px;
    display:inline-block;
    padding:8px;
    cursor:pointer;
  }
  #color span{
    width: 30px;
    height: 30px;
  }
  #size span{
    width: 50px;
    text-align: center;
  }
  .top .text{
    line-height: 30px;
  }
  .top p span.on{
    border:2px solid #f60;
    padding:7px;
    background:url(/static/on.png) no-repeat right bottom;
  }
  .bottom{
    height:159px;
    padding-top:25px;
    font-family:'Microsoft yahei';
  }
  .bottom p{
    font-size: 20px;
  }
  .bottom p font{
    color:#f60;
    font-size:20px;
    margin-right:20px;
  }
  .bottom p a{
    font-size:14px;
    color:blue;
  }
  .bottom .btn-area{
    width: 100%;
    height: 100%;
    text-align: center;

  }
  .bottom .btn-area a{
    width: 200px;
    height: 50px;
    margin-top: 30px;
    margin-left: 10px;
    border-radius: 4px;
    line-height: 50px;
  }
  .bottom p a i{
    margin:0 5px;
    color:#90c;
  }
  /*.bottom button{*/
  /*  width:200px;*/
  /*  height:50px;*/
  /*  font-family:'Microsoft yahei';*/
  /*  margin-top:20px;*/
  /*  font-size:20px;*/
  /*  background:#f60;*/
  /*  color:#fff;*/
  /*  border:none;*/
  /*}*/
  /*选择信息结束*/

  .detailBox{
    width: 1200px;
    height: 520px;
    /*background-color: pink;*/
    margin: 10px auto;
  }

  .remain {
    float: left;
    /*background-color: darkseagreen;*/
    width: 250px;
    height: 100%;
  }
  .remain img{
    width: 100%;
    height: 600px;
  }
</style>
