<template>
  <div class="cate-container" v-title="'分类'">
    <v-row>
      <v-col :md="8">
          <v-cate-list :uid="uid" :cateId="cateId"></v-cate-list>
      </v-col>
      <v-col :md="16">
          <v-post-list :uid="uid" :cateId="cateId"></v-post-list>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ['uid'],
  computed: {
      cateId() {
          return this.$route.params.cateId || null;
      }
  },
  components: {
    'v-row': resolve => require(['./components/Layout/Row.vue'], resolve),
    'v-col': resolve => require(['./components/Layout/Col.vue'], resolve),
    'v-post-list': resolve => require(['./Module/PostList.vue'], resolve),
    'v-cate-list': resolve => require(['./Module/CateList.vue'], resolve),
  }
}
</script>
<style lang="scss" scoped>
</style>
