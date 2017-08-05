<template>
  <div class="welcome-container" v-title="'主页'">
      <v-card class="welcome-card">
        <h1>欢迎使用后台管理系统</h1>
      </v-card>
  </div>
</template>

<script>
export default {
  components: {
    'v-card': resolve => require(['./components/Card.vue'], resolve)
  }
}
</script>

<style lang="scss" scoped>
$themeColor: #20A0FF;
.welcome-card{
    padding: 50px 0;
    text-align: center;
    color: $themeColor;
}
</style>