<template>
  <div id="banner">
    <div class="pic">
      <ul>
        <li style="display:block;"><a href=""><img src="../../static/b1.png" /></a></li>
        <li><a href=""><img src="../../static/b2.png" /></a></li>
        <li><a href=""><img src="../../static/b3.png" /></a></li>
        <li><a href=""><img src="../../static/b4.png" /></a></li>
        <li><a href=""><img src="../../static/b5.png" /></a></li>
<!--        <li><a href=""><img src="../../static/b6.jpg" /></a></li>-->
      </ul>
    </div>

    <div class="tab">
      <ul>
        <li class="on">1</li><li>2</li><li>3</li><li>4</li><li>5</li>
      </ul>
    </div>

    <div class="btn-pic">
      <div id="leftBtn">&lt;</div>
      <div id="rightBtn">&gt;</div>
    </div>
  </div>

</template>

<script>
   import '../assets/js/banner';
    export default {
    name: "NavBanner",
  }
</script>

<style scoped>
  *{ margin:0; padding:0;}
  li{
    list-style:none;
  }
  #banner{
    /*width:100%;*/
    height:510px;
    margin:0 auto;
    position:relative;
    text-align: center;
  }
  #banner .pic{
    width:100%;
    position:relative;
  }
  #banner .pic ul li{
    position:absolute;
    display:none;

  }
  #banner .pic ul li img{
    display: block;
    width: 100%;
    height: 510px;
  }
  #banner .tab{
    width:148px;
    height:20px;
    position:absolute;
    bottom:10px;
    left:50%;
    margin-left:-70px;
  }
  #banner .tab ul li{
    width:18px;
    height:18px;
    background:#666;
    border-radius:100%;
    float:left;
    margin:1px 3px;
    color:#fff;
    text-align:center;
    line-height:18px;
    font-family:'sans-serif';
    font-size:12px;
    cursor:pointer;
  }
  #banner .tab ul li.on{
    background:#f60;
  }
  #banner .btn-pic{
    display:block;
  }
  #banner .btn-pic div{
    width:30px;
    height:60px;
    background:rgba(0,0,0,0.3);
    text-align:center;
    line-height:60px;
    color:#fff;
    font-size:24px;
    position:absolute;
    top:50%;
    margin-top:-30px;
    cursor:pointer;
  }
  #leftBtn{
    left:0;
    /*margin-left: -365px;*/
  }
  #rightBtn{
    right:0;
    /*margin-right: -365px;*/
  }
</style>
