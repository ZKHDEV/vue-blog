<template>
  <div class="home-container" v-title="'主页'">
    <v-row :bottom="40">
      <v-col :md="24">
          <v-accordion :height="300"></v-accordion>
      </v-col>
    </v-row>
    <v-row>
      <v-col :md="16">
          <v-post-list></v-post-list>
      </v-col>
      <v-col :md="8">
          <v-assist></v-assist>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  components: {
    'v-row': resolve => require(['./components/Layout/Row.vue'], resolve),
    'v-col': resolve => require(['./components/Layout/Col.vue'], resolve),
    'v-accordion': resolve => require(['./Module/Accordion.vue'], resolve),
    'v-post-list': resolve => require(['./Module/PostList.vue'], resolve),
    'v-assist': resolve => require(['./Module/Assist.vue'], resolve),
  }
}
</script>
<style lang="scss" scoped>
</style>
