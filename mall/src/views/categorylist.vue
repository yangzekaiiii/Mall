<template>
  <div id="categoryList">
    <van-nav-bar
      class="vtitle"
      title="产品分类"
      left-text="返回"
      left-arrow
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" color="#000000" />
      </template>
    </van-nav-bar>

    <van-tabs v-model="tabActive">
      <van-tab v-for="(item, index) in clist" :key="index" :title="item.name">
        <div class="top1">
          <h4>{{ item.name }}</h4>
          <p>{{ item.front_name }}</p>
        </div>
        <div v-if="item.plist">
          <van-grid :border="true" :column-num="2">
            <van-grid-item
              v-for="(item1, index1) in item.plist.data"
              :key="index1"
              :to="'/product/' + item1.id"
            >
              <van-image
                width="100"
                height="100"
                fit="cover"
                lazy-load
                :src="item1.list_pic_url"
              />
              <h5 class="van-ellipsis">{{ item1.name }}</h5>
              <p class="price">￥{{ item1.retail_price }}</p>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      tabActive: 0,
      clist: [],
    };
  },
  async created() {
    //console.log(this.id);
    //console.log(this.$root.api);
    //let res = await axios.get()
    let res = await axios.get(this.$root.api.GoodsCategory, {
      params: { id: this.id },
    });
    console.log(res.data);
    this.clist = res.data.data.brotherCategory;
    let id = this.clist[0].id;

    //this.getlist(id, 1);
    this.clist.forEach(async (item, index) => {
      item.plist = await this.getlist(item.id, 1);
      //console.log(item.plist);
      this.$forceUpdate() ;
    });
  },
  methods: {
    onClickLeft: function () {
      this.$router.go(-1);
    },
    onClickRight: function () {},
    async getlist(cid, page) {
      let res = await axios.get(
        `${this.$root.api.GoodsList}?categoryId=${cid}&page=${page}$size=20`
      );
      //console.log(res);
      return res.data.data;
    },
  },
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#categoryList {
  .van-grid-item {
    overflow: hidden;
    box-sizing: border-box;
  }
  .van-image {
    width: 200px;
    height: 200px;
  }
  .van-ellipsis {
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    padding: 0 10px;
  }
  .top1 {
    width: 100%;
    height: 80px;
    background: #f8f8f8;
    padding-top: 25px;
  }
  .top1 h4 {
    display: block;
    margin-bottom: 15px;
  }
  .top1 p {
    font-size: 14px;
    color: #707070;
  }
  .price {
    color: red;
    font-size: 13px;
    padding-top: 10px;
  }
}
</style>