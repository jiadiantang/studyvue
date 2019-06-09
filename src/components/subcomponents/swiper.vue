
<template>
    <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item :key="item.url" v-for="item in lunbotuList">
        <img  :src="item.img" :class="{full:isfull}" alt>
      </mt-swipe-item>
    </mt-swipe>
    </div>
</template>

<script>
export default {
    data(){
        return {};
    },
    props:['lunbotuList', 'isfull'],
}
</script>


style <style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
      text-align: center;
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: cyan;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .mui-media-body{
      font-size: 13px;
    }
  }
}
.full{
    width:100%;
}
</style>
