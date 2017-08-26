<template>
  <div class="gallery-container" v-title="'相册'">
    <v-row>
      <v-col :md="{span:16,offset:4}">
          敬请期待
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  components: {
    'v-row': resolve => require(['./components/Layout/Row.vue'], resolve),
    'v-col': resolve => require(['./components/Layout/Col.vue'], resolve),
  }
}
</script>
<style lang="scss" scoped>
</style>
