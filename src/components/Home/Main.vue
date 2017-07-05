<template>
  <div class="main-container" v-title="'主页'">
    <div class="accordion">
        <v-accordion></v-accordion>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    'v-accordion': resolve => require(['./components/Accordion.vue'], resolve)
  }
}
</script>
<style lang="scss" scoped>
.accordion{
    width: 100%;
    height: 300px;
    border-radius: 6px;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3);
}
</style>
