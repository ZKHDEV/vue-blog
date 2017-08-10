<template>
    <v-theme-card class="v-post-card" :paddingVer="20" :paddingHor="20">
        <template v-for="item in 6">
            <div class="post-item">
                <img class="post-img" src=""></img>
                <div class="post-note">
                    <img src=""></img>
                    <span class="post-note-name">我的昵称</span>
                    <span class="post-note-time">1小时前</span>
                </div>
                <div class="post-title">
                    <b>JavaScript 面向对象编程</b>
                </div>
                <div class="post-summary">面向对象编程就是将你的需求抽象成一个对象，针对这个对象分析其特征（属性）和动作（方法），这个对象称为“类”。JavaScript 的核心是支持面向对象的，同时它也提供了...</div>
                <div class="post-info">
                    <i class="fa fa-eye"></i>116
                    <i class="fa fa-comment"></i>10
                    <i class="fa fa-heart"></i>56
                </div>
            </div>
        </template>
        <v-button class="post-load" color="two" :height="40" :width="100" :fontSize="13">加载更多</v-button>
    </v-theme-card>
</template>
<script>
export default {
    components: {
        'v-button': resolve => require(['../components/Button.vue'], resolve),
        'v-theme-card': resolve => require(['../components/ThemeCard.vue'], resolve),
    }
}
</script>
<style lang="scss" scoped>
.v-post-card {
    font-size: 14px;
    color: #000000;
}

.post-item {
    padding: 10px 0;
    border-bottom: 1px solid #CCCCCC;
}

.post-img {
    float: right;
    position: relative;
    top: 10px;
    margin: 0 0 10px 10px;
    height: 120px;
    width: 150px;
    border-radius: 3px;
}

.post-note {
    height: 30px;
    line-height: 30px;
    img {
        float: left;
        height: 30px;
        width: 30px;
        border-radius: 15px;
    }
    .post-note-name {
        float: left;
        margin-left: 10px;
    }
    .post-note-time {
        float: left;
        margin-left: 10px;
        color: #999999;
    }
}

.post-title {
    margin: 10px 0;
    font-size: 20px;
}

.post-summary {
    font-size: 14px;
}

.post-info {
    margin-top: 15px;
    color: #999999;
    i {
        margin-left: 8px;
        margin-right: 3px;
        &:first-child {
            margin-left: 0;
        }
    }
}

.post-load {
    display: block;
    margin: 10px auto 0;
}
</style>
