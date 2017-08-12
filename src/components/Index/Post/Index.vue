<template>
    <div class="home-container" v-title="'文章'">
        <v-row :bottom="40">
            <v-col :md="{span:10,offset:1}">
                <v-post></v-post>
            </v-col>
        </v-row>
        <v-row>
            <v-col :md="{span:10,offset:1}">
                <v-comment></v-comment>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    components: {
        'v-post': resolve => require(['./Post.vue'], resolve),
        'v-comment': resolve => require(['./Comment.vue'], resolve),
        'v-theme-card': resolve => require(['../components/ThemeCard.vue'], resolve),
        'v-row': resolve => require(['../components/Layout/Row.vue'], resolve),
        'v-col': resolve => require(['../components/Layout/Col.vue'], resolve),
    }
}
</script>
<style lang="scss" scoped>
.post-title {
    font-size: 30px;
    font-weight: 400;
}
</style>
