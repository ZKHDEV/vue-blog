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

<style lang="scss">
.shadow-card {
    border-radius: 6px;
    background-color: #FFFFFF;
    overflow: hidden;
    box-shadow: 0 0 6px 0 rgba(#000000, 0.3);
}
.default-btn {
    display: inline-block;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    color: #FFFFFF;
    font-size: 13px;
    text-align: center;
    text-decoration: none;
    &:link,
    &:visited {
        background-color: #E87261;
    }
    &:hover,
    &:active {
        background-color: #D3675A;
    }
}
</style>

<style lang="scss" scoped>
.index-container {
    background-color: #F0EFEE;
}
.container{
    padding: 100px 0;
}
</style>