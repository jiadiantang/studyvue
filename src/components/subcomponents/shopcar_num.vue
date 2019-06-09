<template>
  <div style="height:25px;" class="mui-numbox" data-numbox-min="1" :data-numbox-max="10">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input ref="numbox" @change = "countChanged" id="test" class="mui-input-numbox" type="number" :value="initcount">
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
        // this.$emit('getcount', parseInt(this.$refs.numbox.value))
      }
    },
    props:["initcount"],
    // watch:{
    //   'max':function(newVal, oldVal){
    //     mui(".mui-numbox").numbox().setOption('max', newVal);

    //   }
    // }
};
</script>


<style lang="scss" scoped>
</style>

