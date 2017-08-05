<template>
    <div class="index-container">
        <v-header></v-header>
        <div class="container">
            <router-view></router-view>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
import '../../static/css/style.css'
export default {
    components: {
        'v-header': resolve => require(['./Header.vue'], resolve),
        'v-footer': resolve => require(['./Footer.vue'], resolve)
    }
}
</script>

<style lang="scss" scoped>
.index-container {
    background-color: #F0EFEE;
}
.container{
    padding: 100px 0;
}
</style>