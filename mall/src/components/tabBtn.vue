<template>
  <van-tabbar v-model="tabAction" active-color="#ee0a24">
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="medal-o" to="/brandList">专题</van-tabbar-item>
    <van-tabbar-item icon="qr" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/buycart"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item icon="friends-o" to="/mymessage">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data: function () {
    return {
      tabAction: 0,
    };
  },
  mounted() {
    console.log(this);
    switch (this.$route.path) {
      case "/brandList":
        this.tabAction = 1;
        break;
      case "/category":
        this.tabAction = 2;
        break;
      case "/buycart":
        this.tabAction = 3;
        break;
        case "/mymessage":
        this.tabAction = 4;
        break;
      case "/":
        this.tabAction = 0;
        break;
      default:
        this.tabAction = 0;
    }
  },
};
</script>