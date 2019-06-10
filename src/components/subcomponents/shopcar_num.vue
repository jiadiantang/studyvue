<template>
  <div style="height:25px;" class="mui-numbox" data-numbox-min="1" :data-numbox-max="10">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input readonly ref="numbox" @change = "countChanged" id="test" class="mui-input-numbox" type="number" :value="initcount">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>


<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        mui(".mui-numbox").numbox();
    },
    methods:{
      countChanged(){
        this.$store.commit("updateGoodsInfo",{
          id:this.goodsid,
          count:this.$refs.numbox.value,
        })
        // this.$emit('getcount', parseInt(this.$refs.numbox.value))
      }
    },
    props:["initcount", "goodsid"],
    // watch:{
    //   'max':function(newVal, oldVal){
    //     mui(".mui-numbox").numbox().setOption('max', newVal);

    //   }
    // }
};
</script>


<style lang="scss" scoped>
</style>

