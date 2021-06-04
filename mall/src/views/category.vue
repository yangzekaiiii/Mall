<template>
  <div id="category">
    <!--搜索-->
    <van-search
      v-model="searchData"
      placeholder="商品搜索 共239万款好物"
      input-align="center"
    />

    <!--侧边栏-->
    <van-tree-select
      height="calc(100vh - 104px)"
      :items="items"
      :main-active-index.sync="activeIndex"
      @click-nav="changeRight"
    >
      <template #content>
        <div id="imgbanner">
          <img style="width: 100%" :src="bannerImg" />
        </div>
        <van-grid :column-num="2">
          <van-grid-item v-for="(item, index) in subCategoryList" :key="index"
          :icon="item.wap_banner_url" :text="item.name"
          :to="'/categoryList/'+item.id" />
        </van-grid>
      </template>
    </van-tree-select>

    <!--标签栏-->
    <tab-btn></tab-btn>
  </div>
</template>

<script>
import axios from "axios";
import api from "../assets/config/api";
import tabBtn from "../components/tabBtn";
export default {
  name: "category",
  data: function () {
    return {
      searchData: "",
      activeIndex: 0,
      subCategoryList: [],
      data: {},
      bannerImg: "",
    };
  },
  async created() {
    let res = await axios.get(api.CatalogList);
    let data = res.data;
    this.data = data.data;
    this.subCategoryList = this.data.currentCategory.subCategoryList;
    this.bannerImg = this.data.currentCategory.img_url;
    console.log(data);
  },
  computed: {
    items: function () {
      //items: [{ text: '分组 1' }, { text: '分组 2' }],
      if (this.data.categoryList == undefined) {
        return [];
      } else {
        let arr = [];
        this.data.categoryList.forEach((item, index) => {
          item.text = item.name;
          arr.push(item);
        });
        return arr;
      }
    },
  },
  methods: {
    changeRight: function (index) {
      this.activeIndex = index;
    },
  },
  watch: {
    activeIndex: async function () {
      if (this.items.length !== 0) {
        let id = this.items[this.activeIndex].id;
        console.log(this.items)
        console.log(id);
        let res = await axios.get(api.CatalogCurrent, { params: { id } });
        console.log(res.data);
        this.subCategoryList = res.data.data.currentCategory.subCategoryList;
        this.bannerImg = this.items[this.activeIndex].img_url;
      } else {
        this.subCategoryList = [];
      }
    },
  },
  components: {
    tabBtn,
  },
};
</script>

<style lang="less">
#category {
  .van-icon__image {
    width: 80%;
    height: 80%;
  }
  .imgbanner {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
  }
}
</style>