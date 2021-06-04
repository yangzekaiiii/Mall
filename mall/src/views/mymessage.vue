<template>
  <div id="mymessage">
    <div class="top">
      <p>我的</p>
      <div class="top1">
        <div class="topleft">
          <van-image
            round
            width="5rem"
            height="5rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="dl">
            <span>点击登录</span>
          </div>
        </div>
        <div class="topright">
          <img src="../assets/images/右边.png" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-grid :column-num="3">
        <van-grid-item
          v-for="(item,index) in this.myMessage"
          :key="index"
          icon="photo-o"
          :text="item"
        />
      </van-grid>
    </div>

     <div style="height: 50px"></div>
    <!--标签栏-->
    <tab-btn></tab-btn>
  </div>
</template>

<script>
import tabBtn from "../components/tabBtn";
export default {
  data:function(){
    return{
      myMessage:['我的订单','优惠卷','礼品卡','我的收藏','我的足迹','会员福利','地址管理','账号安全','更多客服','购物中心','意见反馈']
    }
  },
  components: {
    tabBtn,
  },
};
</script>

<style lang="less">
#mymessage {
  .top {
    p {
      color: white;
      font-size: 25px;
      font-weight: 550;
    }
    width: 100%;
    height: 35vh;
    background: #303030;
    .top1 {
      display: flex;
      justify-content: space-between;
      padding-top: 13vh;
      .topleft {
        display: flex;
        justify-content: space-between;
        padding-left: 20px;
        .dl {
          height: 80px;
          line-height: 80px;
          padding-left: 10px;
          span {
            color: white;
            font-weight: 600;
          }
        }
      }
      .topright {
        padding-right: 30px;
        padding-top: 30px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>