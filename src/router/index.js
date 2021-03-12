import Vue from 'vue'
import Router from 'vue-router'

import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
<<<<<<< HEAD
import GoodsDetail from "../views/GoodsDetail";
=======
>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component:GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component:Cart
    },
    {
      path: '/goods',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/address',
      name: 'Address',
      component:Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component:OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component:OrderSuccess
<<<<<<< HEAD
    },
    {
      path:'/goodsDetail',
      name:'GoodsDetail',
      component:GoodsDetail,
      // children:[{
      //   path:'?productId=:productId',
      //   name:'?productId',
      // }]
=======
>>>>>>> 4a4f2c8ad18a1128eca075ed9b42b4b438c33c07
    }
  ]
})
