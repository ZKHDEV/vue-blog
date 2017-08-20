<template>
    <v-theme-card :paddingVer="20" :paddingHor="50">
        <h1 class="post-title">JavaScript 面向对象编程</h1>
        <div class="post-note">
            <img src=""></img>
            <div class="post-info">
                <p class="post-info-one">
                    <span class="post-author">我的昵称</span>
                </p>
                <p class="post-info-two">
                    <span class="post-time">1小时前</span>
                    <span class="post-word">字数 883</span>
                    <span class="post-read">阅读 122</span>
                    <span class="post-comment">评论 0</span>
                    <span class="post-like">喜欢 7</span>
                </p>
            </div>
            <v-button class="edit-btn" type="inverse" color="one" :height="30" :width="90" :fontSize="14">编辑文章</v-button>
        </div>
        <div class="post-content">
            面向对象编程就是将你的需求抽象成一个对象，针对这个对象分析其特征（属性）和动作（方法），这个对象称为“类”。JavaScript 的核心是支持面向对象的，同时它也提供了强大灵活的 OOP 语言能力，遗憾的是对于JavaScript这种解释性的弱类型语言，没有强类型语言中那种通过class等关键字实现类的方式，但JavaScript可以通过一些特性模仿实现面向对象编程。
        </div>
        <v-split :spacing="40"></v-split>
        <v-button class="post-like-btn" type="switch" :on="isLike" color="two" :height="60" :width="130" :fontSize="18" @click="handleLike">
            <i :class="['fa', isLike ? 'fa-heart' : 'fa-heart-o']"></i> 喜欢 | 6</v-button>
    </v-theme-card>
</template>
<script>
export default {
    data() {
        return {
            isLike: false
        }
    },
    methods: {
        handleLike() {
            //模拟后台处理延时
            setTimeout(() => {
                this.isLike = !this.isLike;
            }, 500);
        }
    },
    components: {
        'v-button': resolve => require(['../components/Button.vue'], resolve),
        'v-theme-card': resolve => require(['../components/ThemeCard.vue'], resolve),
        'v-split': resolve => require(['../components/Split.vue'], resolve),
    }
}
</script>
<style lang="scss" scoped>
.post-title {
    font-size: 30px;
}

.post-note {
    img {
        float: left;
        height: 50px;
        width: 50px;
        border-radius: 25px;
        cursor: pointer;
    }
    &:before,
    &:after {
        display: table;
        content: '';
        clear: both;
    }
    .edit-btn{
        margin: 10px 0;
        float: right;
    }
}

.post-info {
    float: left;
    height: 50px;
    margin-left: 16px;
    >p {
        height: 25px;
        margin: 0;
    }
}

.post-info-one {
    box-sizing: border-box;
    padding-top: 4px;
    font-size: 14px;
    color: #000000;
}

.post-info-two {
    box-sizing: border-box;
    padding-top: 6px;
    font-size: 12px;
    color: #999999;
    span {
        margin-right: 6px;
    }
}

.post-content {
    margin-top: 40px;
    line-height: 1.7;
    color: #000000;
    font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    font-size: 16px;
    font-weight: 400;
}

.post-like-btn {
    display: block;
    margin: 0 auto 20px;
}
</style>
