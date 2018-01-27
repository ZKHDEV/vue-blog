<template>
    <div class="index-container">
        <v-header :uid="curUID"></v-header> 
        <v-container>
            <keep-alive>
                <router-view :uid="curUID"></router-view>
            </keep-alive>
        </v-container>
        <v-footer></v-footer>
    </div>
</template>
<script>
export default {
    computed: {
        curUID() {
            return this.$route.params.uid;
        }
    },
    components: {
        'v-header': resolve => require(['./Module/Header.vue'], resolve),
        'v-footer': resolve => require(['./Module/Footer.vue'], resolve),
        'v-container': resolve => require(['./components/Layout/Container.vue'], resolve)
    }
}
</script>

<style lang="scss" scoped>
@import '../../static/scss/variables.scss';
.index-container {
    background-color: $theme-background-color;
    padding-top: 100px;
}
</style>