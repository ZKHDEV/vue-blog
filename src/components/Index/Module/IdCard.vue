<template>
    <v-theme-card :paddingVer="20" :paddingHor="50">
        <h2>关于我</h2>
        <v-split></v-split>
        <table>
            <tr><td>昵称：</td><td>Admin</td></tr>
            <tr><td>年龄：</td><td>20</td></tr>
            <tr><td>性别：</td><td>男</td></tr>
            <tr><td>地址：</td><td>广东 汕头</td></tr>
            <tr><td>邮箱：</td><td>admin@admin.com</td></tr>
            <tr><td>QQ：</td><td>123456789</td></tr>
            <tr><td>自我介绍：</td><td>Admin Admin AdminAdmin AdminAdmin Admin Admin Admin Admin Admin AdminAdminAdminAdmin</td></tr>
        </table>
    </v-theme-card>
</template>

<script>
export default {
    components: {
        'v-theme-card': resolve => require(['../components/ThemeCard.vue'], resolve),
        'v-split': resolve => require(['../components/Split.vue'], resolve),
    }
}
</script>

<style lang="scss" scoped>
.v-avatar {
    text-align: center;
    color: #000000;
}

.avatar {
    margin: 0 auto;
    height: 150px;
    width: 150px;
    border-radius: 75px;
}

table{
    margin-bottom: 50px;
    font-size: 15px;
    tr{
        td{
            word-wrap: break-word;
            word-break: keep-all;
            &:first-child{
                box-sizing: border-box;
                display: inline-block;
                width: 120px;
                text-align: right;
                padding: 5px 20px 5px 0;
            }
        }
    }
}
</style>

