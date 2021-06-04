<template>
  <div id="buycart">
    <div class="btitle">
      <div class="tleft">
        <span class="title1">购物车</span>
        <span class="title2">({{ cartList.length }})</span>
      </div>
      <div class="tright">
        <span>管理</span>
      </div>
    </div>
    <div class="info">
      <span>30天无忧退货</span>
      <span>48小时快速退款</span>
      <span>满88元免邮费</span>
    </div>

    <div class="list">
      <div class="cartItem" v-for="(item, index) in cartList" :key="index">
        <van-checkbox
          @change="checkEvent($event, item)"
          v-model="item.checked"
          checked-color="#ee0a24"
        ></van-checkbox>
        <van-image
          fit="cover"
          width="100"
          height="100"
          lazy-load
          :src="item.list_pic_url"
        />
        <div class="proBrief">
          <div class="title">
            <span class="name">{{ item.goods_name }}</span>
            <span class="num">x{{ item.number }}</span>
          </div>
          <p class="brief">{{ item.goods_specifition_name_value }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </div>
      </div>
    </div>

    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
      :safe-area-inset-bottom="false"
    >
      <van-checkbox
        @click="checkedAll"
        v-model="allChecked"
        checked-color="#ee0a24"
        >全选</van-checkbox
      >
    </van-submit-bar>

    <!--标签栏-->
    <tab-btn></tab-btn>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import tabBtn from "../components/tabBtn";
let mapStateObj = mapState(["cartList", "cartTotal"]);
export default {
  data() {
    return {
      checked: "",
    };
  },
  computed: {
    allChecked: {
      set(val) {
        console.log(val, "设置全选");
      },
      get() {
        if (this.cartTotal.checkedGoodsCount == this.cartTotal.goodsCount) {
          return true;
        } else {
          return false;
        }
      },
    },
    ...mapStateObj,
  },
  created() {
    this.$store.dispatch("AjaxCart");
  },
  mounted() {
    //console.log(this.cartList);
  },
  methods: {
    onSubmit: function () {},
    checkEvent: async function (event, item) {
      //console.log(event);
      //console.log(item);
      let res = await axios.post(this.$root.api.CartChecked, {
        productIds: item.product_id,
        isChecked: Number(event),
      });
      let data = res.data.data;
      //console.log(data);
      this.$store.commit("setCarList", data.cartList);
      this.$store.commit("setCartTotal", data.cartTotal);
    },
    checkedAll: function () {
      let checkall = this.allChecked.val;
      if ((checkall = "false")) {
        this.cartList.forEach((item, index) => {
          item.checked = "0";
        });
      }
    },
  },
  components: {
    tabBtn,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#buycart {
  height: 100vh;
  background: #f8f8f8;
  .btitle {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    .tleft {
      text-align: left;
      .title1 {
        padding-left: 10px;
        font-weight: 600;
        font-size: 20px;
      }
    }
    .tright {
      padding-right: 20px;
      font-size: 13px;
      font-weight: 500;
      color: #606060;
    }
  }
  .info {
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    color: #999;
    height: 24px;
    line-height: 24px;
    background: #efefef;
    span {
      position: relative;
    }
    span::before {
      content: "";
      display: block;
      position: absolute;
      left: -10px;
      top: 8px;
      width: 4px;
      height: 4px;
      border-radius: 4px;
      border: 1px solid red;
    }
  }
  .cartItem {
    height: 90px;
    display: flex;
    align-items: center;
    padding: 10px 5px;
    background: #ffffff;
    margin-bottom: 10px;
    border-radius: 15px;
    .van-checkbox {
      padding: 0 5px;
    }
    .proBrief {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 70px;
      padding: 0 10px;
      .title {
        width: 100%;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        font-weight: 600;
      }
      .brief {
        color: #888888;
        font-size: 13px;
        font-weight: 500;
        background: #f0f0f0;
        border: 2px solid #f0f0f0;
      }
      .price {
        color: red;
      }
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>