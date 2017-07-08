<template>
  <div class="home-container" v-title="'主页'">
    <div class="shadow-card accordion">
      <v-accordion></v-accordion>
    </div>
    <div class="row">
      <div class="col-md-8">
        <v-post></v-post>
      </div>
      <div class="col-md-4">
        <div class="left-gap">
          <v-assist></v-assist>
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
export default {
  components: {
    'v-accordion': resolve => require(['./Accordion.vue'], resolve),
    'v-post': resolve => require(['./Post.vue'], resolve),
    'v-assist': resolve => require(['./Assist.vue'], resolve),
  }
}
</script>
<style lang="scss" scoped>
.accordion {
  height: 300px;
  margin-bottom: 40px;
}

.left-gap{
  margin-left: 10px;
}
</style>
