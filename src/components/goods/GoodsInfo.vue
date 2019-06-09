<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div ref="ball" class="ball" v-show="ballFlag"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :isfull="false" :lunbotuList="lunbotu"></swiper>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsinfo.market_price}}</del> &nbsp; &nbsp;
            销售价:
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量:
            <numbox :max="goodsinfo.stock_quantity" @getcount="getSelectedCount"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button @click="addToShopCar" type="danger" size="small">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号: {{goodsinfo.goods_no}}</p>
          <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间:{{goodsinfo.add_time|dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_num.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      ballFlag: false,
      selectedCount: 1
    };
  },
  created() {
    this.getThumbs();
    this.getGoodsInfo();
  },
  methods: {
    getThumbs() {
      this.$http.get("index/thumb/" + this.id).then(result => {
        if (result.body.status == 0) {
          result.body.message.forEach(element => {
            element.img = element.src;
          });

          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("index/goodsinfo/" + this.id).then(result => {
        if (result.body.status == 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };

      this.$store.commit("addToCar", goodsinfo)
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.offsetWidth;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4, -0.3,1,.68)";
      done();
    },
    afterEnter() {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      //当子组件把选中的数量传递给父组件的时候，把选中的值保存到父组件上
      this.selectedCount = count;
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    background-color: red;
    top: 390px;
    left: 146px;
  }
}
</style>


