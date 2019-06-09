<template>
  <div>
    <h3>
        <cmtbox :id= "$route.params.id"></cmtbox>
    </h3>
  </div>
</template>

<script>
import cmtbox from '../subcomponents/comment.vue'
export default {
    components:{
      cmtbox
    }
}
</script>

<style lang="scss" scoped>

</style>

