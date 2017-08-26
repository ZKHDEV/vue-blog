<template>
  <div class="about-container" v-title="'关于'">
    <v-row :bottom="12">
      <v-col :md="{span:16,offset:4}">
          <v-avatar></v-avatar>
          <v-split></v-split>
      </v-col>
    </v-row>
    <v-row :bottom="40">
      <v-col :md="{span:14,offset:5}">
          <v-id-card></v-id-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col :md="{span:14,offset:5}">
          <v-contact></v-contact>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  components: {
    'v-row': resolve => require(['./components/Layout/Row.vue'], resolve),
    'v-col': resolve => require(['./components/Layout/Col.vue'], resolve),
    'v-split': resolve => require(['./components/Split.vue'], resolve),
    'v-avatar': resolve => require(['./Module/Avatar.vue'], resolve),
    'v-id-card': resolve => require(['./Module/IdCard.vue'], resolve),
    'v-contact': resolve => require(['./Module/Contact.vue'], resolve),
  }
}
</script>
<style lang="scss" scoped>
</style>
