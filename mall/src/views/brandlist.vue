<template>
  <div id="brandlist">
      <!--搜索-->
    <van-search
      v-model="searchData"
      placeholder="商品搜索 共239万款好物"
      input-align="center"
    />
    <div v-for="(item, index) in topicList" :key="index">
      <div class="brand">
        <van-image
          class="picture"
          fit="cover"
          lazy-load
          :src="item.scene_pic_url"
        />
        <div>
          <p class="title">{{ item.title }}</p>
          <p class="subtitle">{{ item.subtitle }}</p>
        </div>
      </div>
    </div>
        <div style="height: 50px"></div>
    <!--标签栏-->
    <tab-btn></tab-btn>
  </div>
</template>

<style lang="less">
#brandlist {
  background: #f0f0f0;
  .brand {
    width: 100%;
    height: 100%;
    background: white;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid white;
    border-radius: 20px;
    .picture {
      width: 100%;
      height: 32vh;
      padding-bottom: 10px;
    }
    .title {
      font-size: 18px;
      font-weight: 550;
      padding-bottom: 5px;
    }
    .subtitle {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>

<script>
import axios from "axios";
import tabBtn from "../components/tabBtn";
export default {
  data: function () {
    return {
      data: {},
      searchData:""
    };
  },
  computed: {
    topicList: function () {
      if (typeof this.data.data == "object") {
        return this.data.data;
      } else {
        return [];
      }
    },
  },
  components:{
      tabBtn
  },
  async mounted() {
    let res = await axios.get(this.$root.api.TopicList);
    console.log(res.data);
    this.data = res.data.data;
  },
};
</script>