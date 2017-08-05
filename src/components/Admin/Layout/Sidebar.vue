<template>
    <div class="sidebar">
        <router-link :to="{name:'admin'}">
            <div class="sidebar-header">
                <i class="fa fa-briefcase"></i> 后台管理系统</div>
        </router-link>
        <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
            <el-menu-item-group title="">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="fa fa-thumb-tack"></i>文章</template>
                    <router-link :to="{name:'admin-post'}">
                        <el-menu-item index="1">所有文章</el-menu-item>
                    </router-link>
                    <router-link :to="{name:'admin-post-new'}">
                        <el-menu-item index="2">写文章</el-menu-item>
                    </router-link>
                    <router-link :to="{name:'admin-category'}">
                        <el-menu-item index="3">分类目录</el-menu-item>
                    </router-link>
                    <router-link :to="{name:'admin-recycle'}">
                        <el-menu-item index="4">回收站</el-menu-item>
                    </router-link>
                </el-submenu>
            </el-menu-item-group>
            <el-menu-item-group title="">
                <router-link to="/comment">
                    <el-menu-item index="5">
                        <i class="fa fa-comment"></i>评论</el-menu-item>
                </router-link>
                <router-link to="/upload">
                    <el-menu-item index="6">
                        <i class="el-icon-message"></i>上传</el-menu-item>
                </router-link>
            </el-menu-item-group>
        </el-menu>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$headerHeight: 70px;
$themeColor: #20A0FF;
$boxShadow: 0 0 10px 1px rgba(#000000, 0.1);
.sidebar .el-menu {
    position: absolute;
    border-radius: 0;
    top: $headerHeight;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
    z-index: -1;
}

.sidebar-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $headerHeight;
    background-color: #FFFFFF;
    line-height: $headerHeight;
    vertical-align: center;
    text-align: center;
    color: $themeColor;
    font-size: 26px;
    box-shadow: $boxShadow;
    i {
        position: relative;
        top: 3px;
        font-size: 32px;
        margin-right: 8px;
    }
}

a {
    &:link,
    &:visited,
    &:hover,
    &:active {
        color: inherit;
        text-decoration: none;
    }
}

.el-menu .fa {
    margin-right: 10px;
}
</style>