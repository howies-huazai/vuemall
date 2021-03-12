<template>
    <div>
      <nav-header></nav-header>
      <nav-banner></nav-banner>
      <nav-bread>
        <span>商品</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <div class="filter-nav-box" style="float:left;">
              <div class="filter-nav-search">
                <form>
                  <input type="search" v-model="textVal" id="text_search" placeholder="请输入搜索内容...">
                  <button type="submit" @click="goodsSearch"></button>
                </form>
              </div>
            </div>
            <div style="float:right;">
              <span class="sortby">排列方式：</span>
              <a href="javascript:;" class="default cur">Default</a>
              <a href="javascript:;" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods()">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
              <a href="javascript:;" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
            </div>
          </div>


          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>价格：</dt>
                <dd><a href="javascript:;" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">所有商品</a></dd>
                <dd v-for="(item,index) in priceFilter">
                  <a href="javascript:;" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="item in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice | currency('$')}}</div>
                      <div class="btn-area">
<!--                        <a href="javascript:;" class="btn btn&#45;&#45;m" @click="addCart(item.productId)">加入购物车</a>-->
<!--                        <router-link class="btn btn&#45;&#45;m btn&#45;&#45;red" href="javascript:;" @click="tips" :to="{path:'/goodsDetail?productId='+item.productId}">详情</router-link>-->
                        <a class="btn btn--m"  @click="tips(item.productId)">查看</a>

                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="20">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
          <p slot="message">
             请先登录
          </p>
          <div slot="btnGroup">
              <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
      </modal>
<!--      <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">-->
<!--        <p slot="message">-->
<!--          <svg class="icon-status-ok">-->
<!--            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>-->
<!--          </svg>-->
<!--          <span>加入购物车成功!</span>-->
<!--        </p>-->
<!--        <div slot="btnGroup">-->
<!--          <a class="btn btn&#45;&#45;m" href="javascript:;" @click="mdShowCart = false">继续购物</a>-->
<!--          <router-link class="btn btn&#45;&#45;m btn&#45;&#45;red" href="javascript:;" to="/cart">查看购物车</router-link>-->
<!--        </div>-->
<!--      </modal>-->
<!--      <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>-->
      <nav-footer></nav-footer>
    </div>
</template>
<script>
    import NavHeader from './../components/NavHeader'
    import NavBanner from './../components/NavBanner'
    import NavFooter from './../components/NavFooter'
    import NavBread from './../components/NavBread'
    import Modal from './../components/Modal'
    import axios from 'axios'
    import './../assets/js/banner';
    import './../assets/css/product.css'
    export default{
        data(){
            return {
                goodsList:[],
                sortFlag:true,
                page:1,
                pageSize:8,
                busy:true,
                loading:false,
                textVal:"",
                mdShow:false,
                priceFilter:[
                  {
                      startPrice:'0元',
                      endPrice:'100元'
                  },
                  {
                    startPrice:'100元',
                    endPrice:'500元'
                  },
                  {
                    startPrice:'500元',
                    endPrice:'1000元'
                  },
                  {
                    startPrice:'1000元',
                    endPrice:'3000元'
                  }
                ],
                priceChecked:'all',
                filterBy:false,
            }
        },
        mounted(){
            this.getGoodsList();
        },
        components:{
          NavHeader,
          NavBanner,
          NavFooter,
          NavBread,
          Modal
        },
        methods:{
          //搜索商品
            getGoodsList(flag){
              var param = {
                  page:this.page,
                  pageSize:this.pageSize,
                  sort:this.sortFlag?1:-1,
                  priceLevel:this.priceChecked,
                  producName:this.textVal
              };
              this.loading = true;
              axios.get("/goods/list",{
                params:param
              }).then((response)=>{
                var res = response.data;
                this.loading = false;
                if(res.status=="0"){
                  if(flag){
                      this.goodsList = this.goodsList.concat(res.result.list);
                      if(res.result.count==0){
                          this.busy = true;
                      }else{
                          this.busy = false;
                      }
                  }else{
                      this.goodsList = res.result.list;
                      this.busy = false;
                  }
                }else{
                  this.goodsList = [];
                }
              });
            },
            sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },
            setPriceFilter(index){
              this.priceChecked = index;
              this.page = 1;
              this.getGoodsList();
            },
            loadMore(){
                this.busy = true;
                setTimeout(() => {
                  this.page++;
                  this.getGoodsList(true);
                }, 500);
            },
            closeModal(){
              this.mdShow = false;
            },
            showFilterPop(){
              this.filterBy=true;
              this.overLayFlag=true;
            },
            goodsSearch(){
              this.getGoodsList();
            },

            tips(dat){
                axios.get("/users/checkLogin").then((response)=>{
                  var res = response.data;
                  if(res.status == '10001'){
                    this.mdShow = true;
                  }else{
                    this.$router.push({
                      path:'/goodsDetail?productId='+dat
                    })
                    this.mdShow = false;
                  }
                  // if(res.status=="0"){
                  //   this.$store.commit("updateUserInfo",res.result);
                  // }else{
                  //   if(this.$route.path!="/goods"){
                  //     this.$router.push("/goods");
                  //   }
                  // }
                });
              },
            }
    }
</script>
