<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            @click="getPhotolist(item.id)"
            v-for="item in cates"
            :key="item.id"
            :class="['mui-control-item', item.id==0 ?'mui-active':'']"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <ul class="photo-list">
      <router-link tag="li" :to="'/home/photoinfo/'+item.id" v-for="item in list" :key="item.id">
        <img v-lazy="item.img_url">
        <div class="info">
            <h1 class="info-title">{{item.title}}</h1>
            <h1 class="info-body">{{item.zhaiyao}}</h1>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [],
      list: []
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotolist(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("index/cate").then(result => {
        if (result.body.status == 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotolist(cateId) {
      this.$http.get("index/images/" + cateId).then(result => {
        if (result.body.status == 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img{
        width:100%;
        vertical-align: bottom;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
        color:white;
        text-align: left;
        position: absolute;
        bottom:0;
        background-color:rgba(0,0,0,0.4);
        max-height: 84px;
        .info-title{
            font-size: 14px;
        }
        .info-body{
            font-size: 13px;
        }
    }
  }
}
</style>

