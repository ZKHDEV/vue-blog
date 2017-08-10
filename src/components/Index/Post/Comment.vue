<template>
    <v-theme-card :paddingVer="40" :paddingHor="50">
        111
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
