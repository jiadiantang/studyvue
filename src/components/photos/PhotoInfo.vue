<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time|dateFormat}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>
    <hr>
    <div class="conent" v-html="photoinfo.content"></div>

    <vue-preview :slides="list" @close="handleClose"></vue-preview>

    <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("index/photo/" + this.id).then(result => {
        if (result.body.status == 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
    getThumbs() {
      this.$http.get("index/thumb/" + this.id).then(result => {
        if (result.body.status == 0) {
            result.body.message.forEach(item => {
                item.w=600
                item.h=400
            });
          this.list = result.body.message;
        }
      });
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>
