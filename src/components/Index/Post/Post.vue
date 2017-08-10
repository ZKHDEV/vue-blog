<template>
    <v-theme-card :paddingVer="20" :paddingHor="50">
        <p class="post-title">JavaScript 面向对象编程</p>
    </v-theme-card>
</template>
<script>
export default {
    components: {
        'v-theme-card': resolve => require(['../components/ThemeCard.vue'], resolve),
    }
}
</script>
<style lang="scss" scoped>
.post-title {
    font-size: 30px;
    font-weight: 400;
}
</style>
