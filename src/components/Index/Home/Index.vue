<template>
  <div class="home-container" v-title="'主页'">
    <v-row :bottom="40">
      <v-col :md="12">
        <v-card>
          <v-accordion :height="300"></v-accordion>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col :md="8">
        <v-theme-card :paddingVer="20" :paddingHor="20">
          <v-post></v-post>
        </v-theme-card>
      </v-col>
      <v-col :md="4">
        <v-card>
          <v-assist></v-assist>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  components: {
    'v-accordion': resolve => require(['./Accordion.vue'], resolve),
    'v-post': resolve => require(['./Post.vue'], resolve),
    'v-assist': resolve => require(['./Assist.vue'], resolve),
    'v-card': resolve => require(['../components/Card.vue'], resolve),
    'v-theme-card': resolve => require(['../components/ThemeCard.vue'], resolve),
    'v-row': resolve => require(['../components/Layout/Row.vue'], resolve),
    'v-col': resolve => require(['../components/Layout/Col.vue'], resolve),
  }
}
</script>
<style lang="scss" scoped>
</style>
