<template>
  <div id="home" class="home">
    <!--搜索-->
    <van-search
      v-model="searchData"
      placeholder="商品搜索 共239万款好物"
      input-align="center"
    />

    <!--轮播-->
    <van-swipe :autoplay="3000" width="100%" height="100%">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swiperimg" v-lazy="image.image_url" />
      </van-swipe-item>
    </van-swipe>

    <!--宫格-->
    <van-grid column-num="5">
      <van-grid-item
        v-for="(item, index) in channel"
        :key="index"
        :icon="require(`../assets/images/${index}.png`)"
        :text="item.name"
        @click="change(item.name)"
      >
      </van-grid-item>
    </van-grid>

    <!--品牌制造商直供-->
    <div class="brandList">
      <van-cell>
        <div class="topt">品牌制造商直供</div>
        <van-grid :column-num="2">
          <van-grid-item v-for="(item1, index1) in brandList" :key="index1">
            <van-image fit="cover" lazy-load :src="item1.new_pic_url" />
            <h4 class="title">{{ item1.name }}</h4>
            <p class="price">￥{{ item1.floor_price }}元起</p>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </div>

    <!--周一周四﹒新品发布-->
    <div class="newList">
      <van-cell>
        <div class="topt">周一周四﹒新品发布</div>
        <van-grid :column-num="2">
          <van-grid-item v-for="(item2, index2) in newGoodsList" :key="index2" :to="'/product/'+item2.id">
            <van-image fit="cover" lazy-load :src="item2.list_pic_url" />
            <h4 class="title van-ellipsis">{{ item2.name }}</h4>
            <p class="price">{{ item2.retail_price }}元</p>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </div>

    <!--人气推荐-->
    <div class="hostList">
      <van-cell>
        <div class="topt">人气推荐</div>
        <van-card
          v-for="(item3, index3) in hotGoodsList"
          :key="index3"
          :price="item3.retail_price"
          :desc="item3.goods_brief"
          :title="item3.name"
          :thumb="item3.list_pic_url"
          :thumb-link="'/product/'+item3.id"
        />
      </van-cell>
    </div>

    <!--专题精选-->
    <div class="topicList">
      <div class="topt">专题推荐</div>
      <van-swipe
        :autoplay="3000"
        width="100%"
        height="100%"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item4, index4) in topicList" :key="index4">
          <img class="swiperimg" v-lazy="item4.item_pic_url" />
          <div class="swipertext">
            <span class="title">{{ item4.title }}</span>
            <span class="price">￥{{ item4.price_info }}元起</span>
          </div>
          <div class="subtitle" style="text-overflow: ellipsis">
            {{ item4.subtitle }}
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--categoryList-->
    <div class="categoryList">
      <van-cell v-for="(item5,index5) in categoryList" :key="index5">
        <div class="topt">{{item5.name}}</div>
        <van-grid :column-num="2" :border="false">
          <van-grid-item v-for="(item6, index6) in item5.goodsList" :key="index6" :to="'/product/'+item6.id">
            <van-image fit="cover" lazy-load :src="item6.list_pic_url" />
            <h4 class="title van-ellipsis">{{ item6.name }}</h4>
            <p class="price">￥{{ item6.retail_price }}元</p>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </div>

    <div style="height: 50px"></div>
    <!--标签栏-->
    <tab-btn></tab-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import api from "../assets/config/api";
import tabBtn from "../components/tabBtn";
export default {
  name: "home",
  data: function () {
    return {
      searchData: "",
      data: {},
      tabAction: 0,
      categoryData:{},
      activeName: "",
      category:{}
    };
  },
  computed: {
    images: function () {
      if (typeof this.data.banner == "object") {
        return this.data.banner;
      } else {
        return [];
      }
    },
    channel: function () {
      if (typeof this.data.channel == "object") {
        return this.data.channel;
      } else {
        return [];
      }
    },
    brandList: function () {
      if (typeof this.data.brandList == "object") {
        return this.data.brandList;
      } else {
        return [];
      }
    },
    newGoodsList: function () {
      if (typeof this.data.newGoodsList == "object") {
        return this.data.newGoodsList;
      } else {
        return [];
      }
    },
    hotGoodsList: function () {
      if (typeof this.data.hotGoodsList == "object") {
        return this.data.hotGoodsList;
      } else {
        return [];
      }
    },
    topicList: function () {
      if (typeof this.data.topicList == "object") {
        return this.data.topicList;
      } else {
        return [];
      }
    },
    categoryList: function () {
      if (typeof this.data.categoryList == "object") {
        return this.data.categoryList;
      } else {
        return [];
      }
    },
  },
  methods:{
     change: function (value) {
      this.activeName = value;
      if (this.categoryData.categoryList.length !== 0) {
        this.categoryData.categoryList.filter((item, index) => {
          if(item.name == this.activeName){
            this.category = item
          }else{
            return []
          }
        });
      }
      console.log(this.category.id)
      this.$router.push('/categorylist/'+this.category.id)
    },
  },
  components: {
    tabBtn,
  },
  async mounted() {
    //console.log(api);
    let res = await axios.get(api.IndexUrl);
    console.log(res.data);
    this.data = res.data.data;
    let categoryRes = await axios.get(api.CatalogList);
    console.log(categoryRes.data);
    this.categoryData = categoryRes.data.data;
    console.log(this.categoryData.categoryList)
  },
};
</script>

<style lang="less">
#home {
  .van-grid-item {
    overflow: hidden;
  }
  .swiperimg {
    width: 100vw;
    height: 35vh;
  }
  .brandList {
    .van-cell {
      padding: 0;
    }
    .topt {
      height: 40px;
      margin: 0 auto;
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      font-weight: 600;
    }
    .van-image {
      border: 1px solid #fff;
    }
    .van-grid-item__content {
      padding: 0;
    }
    .title {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .price {
      position: absolute;
      top: 35px;
      left: 10px;
      font-size: 14px;
      color: #999;
    }
  }
  .newList {
    .van-cell {
      padding: 0;
    }
    .topt {
      height: 40px;
      margin: 0 auto;
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      font-weight: 600;
    }
    .title {
      text-align: center;
      width: 90%;
      margin: 0 auto;
    }
    .price {
      margin: 0 auto;
      font-size: 14px;
    }
  }
  .hostList {
    padding-bottom: 10px;
    .van-cell {
      padding: 0;
    }
    .topt {
      height: 40px;
      margin: 0 auto;
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      font-weight: 600;
    }
    .van-card__content {
      justify-content: center;
      text-align: left;
    }
    .van-card__title {
      font-size: 14px;
      font-weight: 900;
      padding: 5px 0;
    }
    .van-card__price {
      color: red;
    }
  }
  .topicList {
    border-top: 15px solid #f0f0f0;
    border-bottom: 15px solid #f0f0f0;
    .topt {
      height: 40px;
      margin: 0 auto;
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      font-weight: 600;
    }
    .swiperimg {
      width: 95%;
      height: 80;
      padding-bottom: 10px;
    }
    .swipertext {
      display: flex;
      padding-left: 10px;
      font-size: 15px;
      .title {
        font-weight: 600;
      }
      .price {
        color: red;
        padding-left: 10px;
      }
    }
    .subtitle {
      width: 95%;
      padding-left: 10px;
      font-size: 14px;
      text-align: left;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      padding-bottom: 15px;
    }
  }
  .categoryList{
    .van-cell {
      padding: 0;
      border-bottom: 15px solid #f0f0f0;
    }
    .topt {
      height: 40px;
      margin: 0 auto;
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      font-weight: 600;
    }
    .van-image__img{
      background: #F8F8F8;
    }
    .title {
      text-align: center;
      width: 90%;
      margin: 0 auto;
    }
    .price {
      margin: 0 auto;
      font-size: 14px;
    }
  }
}
</style>
