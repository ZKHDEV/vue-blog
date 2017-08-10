<template>
  <div class="home-container" v-title="'主页'">
    <v-row :bottom="40">
      <v-col :md="12">
          <v-accordion :height="300"></v-accordion>
      </v-col>
    </v-row>
    <v-row>
      <v-col :md="8">
          <v-post></v-post>
      </v-col>
      <v-col :md="4">
          <v-assist></v-assist>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  components: {
    'v-row': resolve => require(['../components/Layout/Row.vue'], resolve),
    'v-col': resolve => require(['../components/Layout/Col.vue'], resolve),
    'v-accordion': resolve => require(['./Accordion.vue'], resolve),
    'v-post': resolve => require(['./Post.vue'], resolve),
    'v-assist': resolve => require(['./Assist.vue'], resolve),
  }
}
</script>
<style lang="scss" scoped>
</style>
