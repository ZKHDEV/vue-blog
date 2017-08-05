<template>
  <div class="home-container" v-title="'主页'">
    <div class="row acc-row">
      <v-card>
        <v-accordion></v-accordion>
      </v-card>
    </div>
    <div class="row">
      <div class="col-md-8">
        <v-card>
          <v-post></v-post>
        </v-card>
      </div>
      <div class="col-md-4">
        <div class="left-gap">
          <v-card>
            <v-assist></v-assist>
          </v-card>
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
    'v-card': resolve => require(['../components/Card.vue'], resolve),
  }
}
</script>
<style lang="scss" scoped>
.acc-row {
  height: 300px;
  margin-bottom: 40px;
}

.left-gap {
  margin-left: 10px;
}
</style>
