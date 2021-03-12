<template>
    <div>
      <nav-header></nav-header>
      <goods-item></goods-item>
      <div class="introduce">
        <span class="split"></span>
        <img src="static/productDetail.jpg" alt="">
      </div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import NavHeader from "./../components/NavHeader"
  import NavFooter from "./../components/NavFooter"
  import GoodsItem from "../components/GoodsItem";
  import "../assets/css/base.css"
  import "../assets/js/jquery-1.12.1.min"
  import "../assets/js/jquery.mousewheel"



    export default {
        name: "GoodsDetail",
        components:{
          NavHeader,
          NavFooter,
          GoodsItem
        },
        mounted(){

        },

        methods:{

        }

    }
</script>

<style scoped>
 *{
   padding: 0;
   margin: 0;
 }
  .introduce{
    width: 1200px;
    margin: 50px auto;
  }
  .introduce img{
    width: 100%;
    height: 100%;
  }
  .introduce .split{
    display: block;
    width: 100%;
    height: 50px;
    background-color: #000;
  }
</style>
