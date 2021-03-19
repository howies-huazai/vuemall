<!--<template>-->
<!--  <div id="banner">-->
<!--    <div class="side-left"></div>-->
<!--    <div class="pic">-->
<!--      <ul>-->
<!--        <li style="display:block;"><a href=""><img src="../../static/b1.png" /></a></li>-->
<!--        <li><a href=""><img src="../../static/b2.png" /></a></li>-->
<!--        <li><a href=""><img src="../../static/b3.png" /></a></li>-->
<!--        <li><a href=""><img src="../../static/b4.png" /></a></li>-->
<!--        <li><a href=""><img src="../../static/b5.png" /></a></li>-->
<!--      </ul>-->
<!--    </div>-->

<!--    <div class="side-right"></div>-->

<!--    <div class="tab">-->
<!--      <ul>-->
<!--        <li class="on">1</li><li>2</li><li>3</li><li>4</li><li>5</li>-->
<!--      </ul>-->
<!--    </div>-->

<!--    <div class="btn-pic">-->
<!--      <div id="leftBtn">&lt;</div>-->
<!--      <div id="rightBtn">&gt;</div>-->
<!--    </div>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->
<!--   import '../assets/js/banner';-->
<!--    export default {-->
<!--    name: "NavBanner",-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->
<!--  *{ margin:0; padding:0;}-->
<!--  li{-->
<!--    list-style:none;-->
<!--  }-->
<!--  #banner{-->
<!--    height:540px;-->
<!--    margin:60px auto 0;-->
<!--    position:relative;-->
<!--    text-align: center;-->
<!--  }-->
<!--  #banner .pic{-->
<!--    max-width:1260px;-->
<!--    position:relative;-->
<!--    margin: 0 auto;-->
<!--  }-->
<!--  #banner .pic ul li{-->
<!--    position:absolute;-->
<!--    display:none;-->
<!--    width: 100%;-->
<!--    height: 540px;-->
<!--  }-->
<!--  #banner .pic ul li img{-->
<!--    display: block;-->
<!--    width: 100%;-->
<!--    height: 540px;-->
<!--  }-->
<!--  #banner .side-left,#banner .side-right{-->
<!--    width: 320px;-->
<!--    height: 540px;-->
<!--  }-->
<!--  #banner .side-left{-->
<!--    float: left;-->
<!--    background-color: yellow;-->
<!--  }-->
<!--  #banner .side-right{-->
<!--    float: right;-->
<!--    background-color: red;-->
<!--  }-->
<!--  #banner .tab{-->
<!--    width:148px;-->
<!--    height:20px;-->
<!--    position:absolute;-->
<!--    bottom:10px;-->
<!--    left:50%;-->
<!--    margin-left:-70px;-->
<!--  }-->
<!--  #banner .tab ul li{-->
<!--    width:18px;-->
<!--    height:18px;-->
<!--    background:#666;-->
<!--    border-radius:100%;-->
<!--    float:left;-->
<!--    margin:1px 3px;-->
<!--    color:#fff;-->
<!--    text-align:center;-->
<!--    line-height:18px;-->
<!--    font-family:'sans-serif';-->
<!--    font-size:12px;-->
<!--    cursor:pointer;-->
<!--  }-->
<!--  #banner .tab ul li.on{-->
<!--    background:#f60;-->
<!--  }-->
<!--  #banner .btn-pic{-->
<!--    display:block;-->
<!--    position: relative;-->
<!--    width: 1260px;-->
<!--    height: 400px;-->
<!--    margin: 0 auto;-->
<!--  }-->
<!--  #banner .btn-pic div{-->
<!--    width:40px;-->
<!--    height:60px;-->
<!--    background:rgba(0,0,0,0.3);-->
<!--    text-align:center;-->
<!--    line-height:60px;-->
<!--    color:#fff;-->
<!--    font-size:26px;-->
<!--    position:absolute;-->
<!--    top:50%;-->
<!--    cursor:pointer;-->
<!--  }-->
<!--  #leftBtn{-->
<!--    left:0;-->
<!--  }-->
<!--  #rightBtn{-->
<!--    right:0;-->
<!--  }-->
<!--</style>-->


<template>
  <div id="banner">
    <!-- 轮播图 -->
    <div class="b_main">
      <div class="b_m_pic">
        <ul>
          <li style="display:block;"><a href="" ><img src="../assets/banner/1.jpg" alt="" /></a></li>
          <li><a href=""><img src="../assets/banner/2.jpg" alt="" /></a></li>
          <li><a href=""><img src="../assets/banner/3.jpg" alt="" /></a></li>
          <li><a href=""><img src="../assets/banner/4.jpg" alt="" /></a></li>
          <li><a href=""><img src="../assets/banner/5.jpg" alt="" /></a></li>
        </ul>
      </div>
      <div class="b_m_tab">
        <ul>
          <li class="click"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="b_m_btn">
        <div id="b_m_b_left"></div>
        <div id="b_m_b_right"></div>
      </div>
    </div>

    <div class="b_nav">
      <ul>
        <li v-for="(item,index) in navcategory"  >
          <a href=""><span class="b_n_pro" :key="index" v-on:click="childMethod()">{{item}}</span><span class="b_n_arrow  iconfont">></span></a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import '../assets/js/jquery-1.12.1.min'
  import axios from 'axios'
      export default {
      name: "NavBanner",
        data(){
        return{
          navcategory:['Zoom','Air','37'],
          categoryName: ''
        }
      },
        mounted() {
          (function(){
            var $tabLi = $('#banner .b_m_tab li');
            var $picLi = $('#banner .b_m_pic li');
            var $btnDiv = $('#banner .b_m_btn div');
            var $b_main = $('#banner .b_main');
            var index = 0;
            var timer;
            var length = $tabLi.length;
            $tabLi.hover(function(){
              $(this).addClass('hover');
            },function(){
              $(this).removeClass('hover');
            }).click(function(){
              index = $(this).index();
              banner();
            });
            $btnDiv.hover(function(){
              $(this).addClass('hover');
            },function(){
              $(this).removeClass('hover');
            }).click(function(){
              var i = $(this).index();
              if ( i )
              {
                index ++;
                index %= length;
              }
              else
              {
                index --;
                if(index<0)index=length-1;
              }
              banner();
            });
            auto();
            $b_main.hover(function(){
              clearInterval( timer );
            },function(){
              auto();
            });

            function auto(){
              timer = setInterval(function(){
                index ++;
                index %= length;
                banner();
              },3000);
            }

            function banner(){
              $tabLi.eq(index).addClass('click').siblings().removeClass('click');
              $picLi.eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
            }
          })();

          //banner-nav-hide
          (function(){
            var $li = $('#banner .b_nav>ul>li');
            $li.hover(function(){
              $(this).find('.b_n_hide').show();
            },function(){
              $(this).find('.b_n_hide').hide();
            });
          })();
        },
        methods:{
        childMethod(){
          this.$emit('fatherMethod');
        }
          // categorySearch(i){
          //   axios.get('/goods/list', {
          //     categoryName:i
          //     }).then((response)=>{
          //       var res = response.data
          //       if(res.status==0){
          //
          //       }else{
          //
          //       }
          //   })
          // }
        }
      }
</script>
<style scoped>
  *{
    margin:0; padding:0
  }
  li{
    list-style:none;
    vertical-align:top;
  }
  a img{
    border:none;
    display:block;
    width: 1280px;
    height: 100%;
  }
  body{
    font-family:'Microsoft yahei'
  }
  a{
    text-decoration:none;
  }
  #banner{
    width:1260px;
    height:auto;
    margin:60px auto 0;
    overflow:hidden;
    position:relative;
  }
  #banner .b_main{
    width:1260px;
    height:460px;
    overflow:hidden;
    position:relative;
  }
  #banner .b_main .b_m_pic{
    width:1260px;
    height:460px;
    position:relative;
  }
  #banner .b_main .b_m_pic ul li{
    width:1260px;
    height:460px;
    position:absolute;
    display:none;
  }
  #banner .b_main .b_m_tab{
    width:110px;
    height:10px;
    position:absolute;
    bottom:20px;
    right:20px;
  }
  #banner .b_main .b_m_tab ul li{
    width:6px;
    height:6px;
    border:2px solid rgba(185,185,185,0.8);
    background:#999;
    background:rgba(153,153,153,0.8);
    float:left;
    margin:0 5px;
    border-radius:100%;
    cursor:pointer;
  }
  #banner .b_main .b_m_tab ul li.hover,#banner .b_main .b_m_tab ul li.click{
    background:#fff;
    background:rgba(255,255,255,0.8);
    border:2px solid rgba(153,153,153,0.8);
  }
  #banner .b_main .b_m_btn div{
    width:40px;
    height:69px;
    position:absolute;
    top:50%;
    margin-top:-35px;
    background-image:url(../assets/banner/btn.png);
    cursor:pointer;
  }
  #banner .b_main .b_m_btn div#b_m_b_left{
    left:235px;
    border-radius:0 3px 3px 0;
    background-position:82px 0;
  }
  #banner .b_main .b_m_btn div#b_m_b_left.hover{
    background-position: 0;
  }
  #banner .b_main .b_m_btn div#b_m_b_right{
    right:0;
    border-radius:3px 0 0 3px;
    background-position:42px 0;
  }
  #banner .b_main .b_m_btn div#b_m_b_right.hover{
    background-position:-42px 0;
  }
  #banner .b_nav{
    width:235px;
    height:460px;
    position:absolute;
    top:0;
    left:0;
    background:#333;
    background:rgba(0,0,0,.6);
    padding:20px 0;
  }
  #banner .b_nav>ul>li{
    width:235px;
    height:42px;
    vertical-align:top;
  }
  #banner .b_nav>ul>li>a{
    display:block;
    height:42px;
    line-height:42px;
    padding:0 20px 0 30px;
    overflow:hidden;
  }
  #banner .b_nav>ul>li>a:hover{
    background:#f60;
  }
  #banner .b_nav>ul>li>a>span.b_n_pro{
    font-size:14px;
    color:#fff;
    float:left;
  }
  #banner .b_nav>ul>li>a>span.b_n_arrow{
    float:right;
    color:#ddd;
    font-size:12px;
  }
  /*#banner .b_nav ul li .b_n_hide{*/
  /*  width:795px;*/
  /*  height:460px;*/
  /*  border-top:1px solid #bbb;*/
  /*  position:absolute;*/
  /*  top:0px;*/
  /*  left:235px;*/
  /*  background:#fff;*/
  /*  display:none;*/
  /*  padding:19px 0 20px 0;*/
  /*}*/
  #banner .b_nav ul li .b_n_hide ul{
    width:230px;
    height:420px;
    float:left;
    margin-left:30px;
  }
  #banner .b_nav>ul>li .b_n_hide ul li{
    height:70px;
  }
  #banner .b_nav>ul>li .b_n_hide ul li a{
    height:70px;
    display:block;
    line-height:70px;
  }
  /*#banner .b_nav>ul>li .b_n_hide ul li a:hover span.b_n_h_title{*/
  /*  color:#f60;*/
  /*}*/
  #banner .b_nav>ul>li .b_n_hide ul li a img{
    display:block;
    float:left;
    margin-top:15px;
  }
  /*#banner .b_nav>ul>li .b_n_hide ul li a span.b_n_h_title{*/
  /*  font-size:14px;*/
  /*  color:#000;*/
  /*  float:left;*/
  /*  margin-left:10px;*/
  /*  transition:0.2s;*/
  /*  -moz-transition:0.2s;*/
  /*  -webkit-transition:0.2s;*/
  /*  -o-transition:0.2s;*/
  /*}*/
  /*#banner .b_nav>ul>li .b_n_hide ul li a span.b_n_h_buy{*/
  /*  float:right;*/
  /*  width:60px;*/
  /*  height:24px;*/
  /*  line-height:24px;*/
  /*  border:1px solid #f60;*/
  /*  color:#f60;*/
  /*  text-align:center;*/
  /*  font-size:12px;*/
  /*  margin-top:23px;*/
  /*  transition:0.2s;*/
  /*  -moz-transition:0.2s;*/
  /*  -webkit-transition:0.2s;*/
  /*  -o-transition:0.2s;*/
  /*}*/
  /*#banner .b_nav>ul>li .b_n_hide ul li a span.b_n_h_buy:hover{*/
  /*  color:#fff;*/
  /*  background:#f60;*/
  /*}*/

</style>
